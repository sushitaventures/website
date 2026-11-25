import http from 'node:http';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js';
import { AdminUser } from '../models/AdminUser.js';
import { AdminSession } from '../models/AdminSession.js';
import { Offer } from '../models/Offer.js';
import { HomepageVideoConfiguration } from '../models/HomepageVideoConfiguration.js';
import { parseYouTubeUrl } from '../utils/youtube.js';

let mongod;
let server;
let baseUrl;

const makeRequest = async (path, options = {}) => {
  const url = `${baseUrl}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const body = isJson ? await response.json() : await response.text();

  return {
    status: response.status,
    headers: response.headers,
    body
  };
};

const runTests = async () => {
  console.log('====================================================');
  console.log(' SECTION 04 — AUTOMATED INTEGRATION & SECURITY TESTS');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, description) => {
    if (condition) {
      console.log(`✓ PASS: ${description}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${description}`);
      failed++;
    }
  };

  try {
    // 1. Setup in-memory MongoDB
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);

    // 2. Setup test HTTP server
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;

    console.log(`Test server running on ${baseUrl}`);
    console.log(`Connected to in-memory MongoDB: ${uri}\n`);

    // ----------------------------------------------------
    // TEST GROUP 1: YouTube URL Validation Utility
    // ----------------------------------------------------
    console.log('--- TEST GROUP 1: YouTube URL Validation Utility ---');
    const validWatch = parseYouTubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    assert(validWatch.isValid && validWatch.videoId === 'dQw4w9WgXcQ', 'Parses standard youtube.com/watch?v= URL');
    assert(validWatch.embedUrl.includes('youtube-nocookie.com/embed/dQw4w9WgXcQ'), 'Generates privacy-enhanced embed URL');

    const validShort = parseYouTubeUrl('https://youtu.be/dQw4w9WgXcQ?t=43');
    assert(validShort.isValid && validShort.videoId === 'dQw4w9WgXcQ', 'Parses shortened youtu.be/ URL with query params');

    const validEmbed = parseYouTubeUrl('https://www.youtube.com/embed/dQw4w9WgXcQ');
    assert(validEmbed.isValid && validEmbed.videoId === 'dQw4w9WgXcQ', 'Parses youtube.com/embed/ URL');

    const invalidHost = parseYouTubeUrl('https://vimeo.com/123456789');
    assert(!invalidHost.isValid && invalidHost.error.includes('Unsupported domain'), 'Rejects non-YouTube domain (vimeo.com)');

    const arbitraryUrl = parseYouTubeUrl('https://malicious-site.com/exploit.html');
    assert(!arbitraryUrl.isValid, 'Rejects arbitrary external domain');

    const malformedUrl = parseYouTubeUrl('not-a-valid-url');
    assert(!malformedUrl.isValid, 'Rejects malformed URL strings');

    const invalidId = parseYouTubeUrl('https://www.youtube.com/watch?v=short');
    assert(!invalidId.isValid && invalidId.error.includes('11-character'), 'Rejects YouTube URL with invalid ID length');

    // ----------------------------------------------------
    // TEST GROUP 2: Admin Provisioning & Model Security
    // ----------------------------------------------------
    console.log('\n--- TEST GROUP 2: Admin Provisioning & Model Security ---');
    const passwordHash = await AdminUser.hashPassword('SuperSecret123!');
    assert(passwordHash !== 'SuperSecret123!' && passwordHash.startsWith('$2'), 'Hashes password with bcrypt salt factor 12');

    const admin = await AdminUser.create({
      email: 'founder@luxuryrealestate.com',
      passwordHash,
      role: 'admin'
    });
    assert(admin._id && admin.email === 'founder@luxuryrealestate.com', 'Creates AdminUser document');

    // Query admin without explicit select
    const fetchedAdmin = await AdminUser.findById(admin._id);
    assert(fetchedAdmin.passwordHash === undefined, 'Does not return passwordHash in standard queries (select: false)');

    const isMatch = await admin.comparePassword('SuperSecret123!');
    const isWrongMatch = await admin.comparePassword('WrongPassword!');
    assert(isMatch === true, 'comparePassword validates correct password');
    assert(isWrongMatch === false, 'comparePassword rejects incorrect password');

    // ----------------------------------------------------
    // TEST GROUP 3: Authentication & Session Endpoints
    // ----------------------------------------------------
    console.log('\n--- TEST GROUP 3: Authentication & Session Endpoints ---');
    
    // Missing credentials
    const missingCredsRes = await makeRequest('/api/v1/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({})
    });
    assert(missingCredsRes.status === 400 && missingCredsRes.body.error.code === 'VALIDATION_ERROR', 'Rejects login with missing credentials (400)');

    // Invalid credentials
    const invalidCredsRes = await makeRequest('/api/v1/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'founder@luxuryrealestate.com', password: 'WrongPassword' })
    });
    assert(invalidCredsRes.status === 401 && invalidCredsRes.body.error.code === 'INVALID_CREDENTIALS', 'Rejects incorrect password with generic message (401)');
    assert(invalidCredsRes.body.error.message === 'Invalid email or password', 'Uses generic credential error message');

    // Non-existent email
    const nonExistentRes = await makeRequest('/api/v1/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'nobody@luxuryrealestate.com', password: 'SomePassword' })
    });
    assert(nonExistentRes.status === 401 && nonExistentRes.body.error.message === 'Invalid email or password', 'Rejects non-existent email with generic message (zero user enumeration)');

    // Successful login
    const loginRes = await makeRequest('/api/v1/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'founder@luxuryrealestate.com', password: 'SuperSecret123!' })
    });
    assert(loginRes.status === 200 && loginRes.body.success === true, 'Authenticates valid credentials (200)');
    assert(loginRes.body.data.user.email === 'founder@luxuryrealestate.com', 'Returns user profile');
    assert(loginRes.body.data.user.passwordHash === undefined, 'Never exposes passwordHash in login response');

    // Session ID lives only in the HttpOnly cookie — never in the JSON body
    assert(loginRes.body.data.sessionId === undefined, 'Does not expose session ID in the login response body');
    const setCookie = loginRes.headers.get('set-cookie');
    assert(setCookie && setCookie.includes('admin_session=') && setCookie.includes('HttpOnly'), 'Sets HttpOnly admin_session cookie');
    const sessionId = (setCookie.match(/admin_session=([a-f0-9]+)/) || [])[1];
    assert(sessionId && sessionId.length === 64, 'Issues cryptographically random 64-char session ID');

    // Verified session in database
    const sessionDoc = await AdminSession.findOne({ sessionId });
    assert(sessionDoc && sessionDoc.email === 'founder@luxuryrealestate.com', 'Persists session document in MongoDB');

    // Test GET /api/v1/admin/auth/me with session
    const meRes = await makeRequest('/api/v1/admin/auth/me', {
      headers: { Authorization: `Bearer ${sessionId}` }
    });
    assert(meRes.status === 200 && meRes.body.data.user.email === 'founder@luxuryrealestate.com', 'Retrieves current admin profile via authenticated session');

    // Test unauthorized request to /me
    const unauthMe = await makeRequest('/api/v1/admin/auth/me');
    assert(unauthMe.status === 401 && unauthMe.body.error.code === 'UNAUTHORIZED', 'Rejects unauthenticated request to /me (401)');

    // NoSQL operator injection via cookie-parser JSON cookies ("j:" prefix) must not match a session
    for (const evil of ['j:{"$ne":null}', 'j:{"$gt":""}', 'j:{"$regex":".*"}']) {
      const bypass = await makeRequest('/api/v1/admin/auth/me', {
        headers: { Cookie: `admin_session=${encodeURIComponent(evil)}` }
      });
      assert(bypass.status === 401, `Rejects operator-injection cookie ${evil} (401)`);
    }
    const bypassLeads = await makeRequest('/api/v1/admin/enquiries', {
      headers: { Cookie: `admin_session=${encodeURIComponent('j:{"$ne":null}')}` }
    });
    assert(bypassLeads.status === 401, 'Rejects operator-injection cookie on /admin/enquiries (401)');

    // Logout with an injected cookie must not delete anyone's session
    await makeRequest('/api/v1/admin/auth/logout', {
      method: 'POST',
      headers: { Cookie: `admin_session=${encodeURIComponent('j:{"$ne":null}')}` }
    });
    assert(await AdminSession.findOne({ sessionId }), 'Injected-cookie logout does not delete real sessions');

    // ----------------------------------------------------
    // TEST GROUP 4: Authorization Protection on Admin Endpoints
    // ----------------------------------------------------
    console.log('\n--- TEST GROUP 4: Authorization Protection on Admin Endpoints ---');
    const unauthOffersGet = await makeRequest('/api/v1/admin/offers');
    assert(unauthOffersGet.status === 401, 'Rejects unauthenticated GET /admin/offers (401)');

    const unauthOffersPost = await makeRequest('/api/v1/admin/offers', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test Offer', shortDescription: 'Test' })
    });
    assert(unauthOffersPost.status === 401, 'Rejects unauthenticated POST /admin/offers (401)');

    const unauthVideoGet = await makeRequest('/api/v1/admin/homepage/video');
    assert(unauthVideoGet.status === 401, 'Rejects unauthenticated GET /admin/homepage/video (401)');

    const unauthVideoPut = await makeRequest('/api/v1/admin/homepage/video', {
      method: 'PUT',
      body: JSON.stringify({ youtubeUrl: 'https://youtu.be/dQw4w9WgXcQ' })
    });
    assert(unauthVideoPut.status === 401, 'Rejects unauthenticated PUT /admin/homepage/video (401)');

    // ----------------------------------------------------
    // TEST GROUP 5: Offer Management CRUD & Public Filtering
    // ----------------------------------------------------
    console.log('\n--- TEST GROUP 5: Offer Management CRUD & Public Filtering ---');
    const authHeaders = { Authorization: `Bearer ${sessionId}` };

    // 1. Create a draft offer
    const draftOfferRes = await makeRequest('/api/v1/admin/offers', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Draft Villa Promotion',
        shortDescription: 'Upcoming confidential launch in the royal enclave.',
        status: 'draft',
        active: false
      })
    });
    assert(draftOfferRes.status === 201 && draftOfferRes.body.data.offer.status === 'draft', 'Admin creates draft offer (201)');
    const draftOfferId = draftOfferRes.body.data.offer._id;

    // 2. Create a published and active offer
    const activeOfferRes = await makeRequest('/api/v1/admin/offers', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Penthouse Collection Launch',
        shortDescription: 'Rare private residences overlooking the waterfront.',
        fullDescription: 'Full architectural floor plans available upon private inquiry.',
        imageUrl: 'https://images.example.com/penthouse.jpg',
        ctaLabel: 'Inquire Privately',
        ctaUrl: '/contact',
        status: 'published',
        active: true
      })
    });
    assert(activeOfferRes.status === 201 && activeOfferRes.body.data.offer.active === true, 'Admin creates published active offer (201)');
    const activeOfferId = activeOfferRes.body.data.offer._id;

    // 3. Create a published but inactive offer
    const inactiveOfferRes = await makeRequest('/api/v1/admin/offers', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Inactive Archived Showcase',
        shortDescription: 'This offer is marked inactive.',
        status: 'published',
        active: false
      })
    });
    assert(inactiveOfferRes.status === 201, 'Admin creates inactive published offer (201)');

    // 4. Admin lists all offers
    const adminOffersList = await makeRequest('/api/v1/admin/offers', { headers: authHeaders });
    assert(adminOffersList.status === 200 && adminOffersList.body.data.count === 3, 'Admin retrieves all offers including drafts (count = 3)');

    // 5. Public endpoint query (Unauthenticated)
    const publicOffersRes = await makeRequest('/api/v1/public/homepage/offers');
    assert(publicOffersRes.status === 200, 'Public endpoint returns 200 OK without authentication');
    assert(publicOffersRes.body.data.count === 1, 'Public endpoint returns ONLY 1 active published offer (drafts & inactive excluded)');
    assert(publicOffersRes.body.data.offers[0].title === 'Penthouse Collection Launch', 'Public endpoint returns correct published offer');
    assert(publicOffersRes.body.data.offers[0].createdBy === undefined, 'Public endpoint strips internal administrative metadata');

    // 6. Update draft to published & active
    const publishDraftRes = await makeRequest(`/api/v1/admin/offers/${draftOfferId}`, {
      method: 'PATCH',
      headers: authHeaders,
      body: JSON.stringify({ status: 'published', active: true })
    });
    assert(publishDraftRes.status === 200 && publishDraftRes.body.data.offer.status === 'published', 'Admin publishes previously drafted offer');

    // Check public endpoint again
    const publicOffersAfterPublish = await makeRequest('/api/v1/public/homepage/offers');
    assert(publicOffersAfterPublish.body.data.count === 2, 'Public endpoint now reflects newly published offer (count = 2)');

    // 7. Delete offer
    const deleteRes = await makeRequest(`/api/v1/admin/offers/${draftOfferId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    assert(deleteRes.status === 200 && deleteRes.body.data.id === draftOfferId, 'Admin deletes offer successfully');

    // ----------------------------------------------------
    // TEST GROUP 6: YouTube Video Management & Public Endpoint
    // ----------------------------------------------------
    console.log('\n--- TEST GROUP 6: YouTube Video Management & Public Endpoint ---');
    
    // Check initial public video state
    const publicVideoInitial = await makeRequest('/api/v1/public/homepage/video');
    assert(publicVideoInitial.status === 200 && publicVideoInitial.body.data.video === null, 'Initial public video endpoint returns null when unconfigured');

    // Admin updates YouTube configuration with valid link
    const updateVideoRes = await makeRequest('/api/v1/admin/homepage/video', {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Sapphire Estate Tour',
        active: true,
        autoplay: true,
        muted: true,
        loop: true
      })
    });
    assert(updateVideoRes.status === 200 && updateVideoRes.body.data.config.videoId === 'dQw4w9WgXcQ', 'Admin updates YouTube configuration with valid watch URL (200)');
    assert(updateVideoRes.body.data.config.embedUrl.includes('youtube-nocookie.com/embed/dQw4w9WgXcQ'), 'Stores normalized privacy-enhanced embed URL');

    // Admin attempts update with invalid link
    const badVideoRes = await makeRequest('/api/v1/admin/homepage/video', {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        youtubeUrl: 'https://unauthorized-domain.com/video.mp4'
      })
    });
    assert(badVideoRes.status === 400 && badVideoRes.body.error.code === 'INVALID_YOUTUBE_URL', 'Admin rejected when submitting non-YouTube URL (400)');

    // Public endpoint query after active video configured
    const publicVideoConfigured = await makeRequest('/api/v1/public/homepage/video');
    assert(publicVideoConfigured.status === 200 && publicVideoConfigured.body.data.video !== null, 'Public endpoint returns active video configuration');
    assert(publicVideoConfigured.body.data.video.videoId === 'dQw4w9WgXcQ', 'Public video has correct videoId');
    assert(publicVideoConfigured.body.data.video.embedUrl.includes('youtube-nocookie.com'), 'Public video uses privacy-enhanced embed URL');
    assert(publicVideoConfigured.body.data.video.updatedBy === undefined, 'Public video endpoint strips administrator audit metadata');

    // Admin disables video visibility
    await makeRequest('/api/v1/admin/homepage/video', {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        active: false
      })
    });

    // Public endpoint query when video is disabled
    const publicVideoDisabled = await makeRequest('/api/v1/public/homepage/video');
    assert(publicVideoDisabled.status === 200 && publicVideoDisabled.body.data.video === null, 'Public video endpoint returns null when admin marks video inactive');

    // ----------------------------------------------------
    // TEST GROUP 7: Session Logout & Invalidation
    // ----------------------------------------------------
    console.log('\n--- TEST GROUP 7: Session Logout & Invalidation ---');
    const logoutRes = await makeRequest('/api/v1/admin/auth/logout', {
      method: 'POST',
      headers: authHeaders
    });
    assert(logoutRes.status === 200 && logoutRes.body.success === true, 'Admin logs out successfully (200)');

    // Verify session removed from MongoDB
    const sessionAfterLogout = await AdminSession.findOne({ sessionId });
    assert(sessionAfterLogout === null, 'Session document deleted from database on logout');

    // Verify previously used session token is now rejected
    const requestAfterLogout = await makeRequest('/api/v1/admin/auth/me', { headers: authHeaders });
    assert(requestAfterLogout.status === 401 && requestAfterLogout.body.error.code === 'SESSION_INVALID', 'Old session token rejected after logout (401)');

    console.log('\n====================================================');
    console.log(` RESULTS: ${passed} PASSED | ${failed} FAILED`);
    console.log('====================================================\n');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (mongod) {
      await mongod.stop();
    }
  }
};

runTests();
