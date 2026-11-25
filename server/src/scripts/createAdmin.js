import readline from 'node:readline';
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { AdminUser } from '../models/AdminUser.js';

// Parse CLI arguments if supplied non-interactively
const getArgs = () => {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i].startsWith('--')) {
      const key = process.argv[i].slice(2);
      const val = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
      args[key] = val;
    }
  }
  return args;
};

// Prompt without echoing what's typed (for passwords)
const askHidden = (query) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  return new Promise((resolve) => {
    rl.stdoutMuted = false;
    rl._writeToOutput = (str) => {
      if (rl.stdoutMuted && !/^\r?\n$/.test(str)) rl.output.write('*');
      else rl.output.write(str);
    };
    rl.question(query, (ans) => {
      rl.close();
      process.stdout.write('\n');
      resolve(ans);
    });
    rl.stdoutMuted = true;
  });
};

const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    });
  });
};

const run = async () => {
  console.log('=== Luxury Real Estate Platform — Secure Admin Provisioning ===\n');

  try {
    const args = getArgs();
    let email = args.email;

    // Passwords on the command line end up in shell history and process listings.
    if (args.password) {
      console.error('Error: --password is not supported. Run without it and enter the password at the hidden prompt.');
      process.exit(1);
    }

    if (!email) {
      email = await askQuestion('Enter Administrator Email: ');
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      console.error('Error: A valid email address is required.');
      process.exit(1);
    }

    const password = await askHidden('Enter Administrator Password (min 8 characters): ');

    if (!password || password.length < 8) {
      console.error('Error: Password must be at least 8 characters long.');
      process.exit(1);
    }

    // Connect to database
    await connectDatabase();

    if (mongoose.connection.readyState !== 1) {
      console.error('Error: Cannot connect to MongoDB. Please ensure MONGODB_URI is configured.');
      process.exit(1);
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await AdminUser.findOne({ email: normalizedEmail });

    if (existing) {
      console.error(`Error: An administrator account with email "${normalizedEmail}" already exists.`);
      await disconnectDatabase();
      process.exit(1);
    }

    const passwordHash = await AdminUser.hashPassword(password);

    await AdminUser.create({
      email: normalizedEmail,
      passwordHash,
      role: 'admin'
    });

    console.log(`\n✓ Administrator account created successfully for: ${normalizedEmail}`);
    console.log('Credentials hashed using bcrypt with salt factor 12.');
    console.log('No passwords or sensitive tokens were persisted in logs.');

    await disconnectDatabase();
    process.exit(0);
  } catch (err) {
    console.error('\nFatal provisioning error:', err.message);
    try {
      await disconnectDatabase();
    } catch {}
    process.exit(1);
  }
};

run();
