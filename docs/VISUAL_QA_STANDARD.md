# Visual QA Standard & MotionSites Workflow

## 1. Overview & Quality Objectives

This standard governs visual review, responsiveness verification, and aesthetic QA across all presentational templates before public release.
The goal is to ensure:
- Every page meets or exceeds the **MotionSites 10-Point Visual Bar**.
- All interactive and editorial elements render flawlessly across standard mobile, tablet, and desktop viewports.
- No layout shifts, overlapping text, unoptimized media, or broken touch targets reach production.

---

## 2. Standard Viewport Test Matrix

All visual reviews and automated screenshot workflows must capture and inspect the following standard viewports:

| Device Class | Viewport Width x Height | Description / Purpose |
| :--- | :--- | :--- |
| **Desktop Ultra / Standard** | `1440 x 900` | Baseline luxury desktop layout, full typography clamp test |
| **Laptop Compact** | `1280 x 800` | Common compact laptop resolution, grid wrap check |
| **Tablet Landscape** | `1024 x 768` | Transition point between desktop navigation and mobile drawer |
| **Tablet Portrait** | `768 x 1024` | Vertical reading flow, card grid collapse verification |
| **Mobile Standard** | `390 x 844` | Modern smartphone standard (iPhone 14/15/16 baseline) |
| **Mobile Small** | `360 x 740` | Narrow Android baseline, touch target and header spacing check |

---

## 3. MotionSites 10-Point Scoring Rubric

Every candidate page design is evaluated using the 10-point rubric adapted from the MotionSites Review Standard (`.agents/skills/motionsites-web-builder/references/review.md`):

1. **First Glance (Impact & Atmosphere)**: Does the hero convey immediate luxury, restraint, and gravity within the first 350ms without visual chaos?
2. **Signature Element**: Does the page contain at least one memorable, bespoke brand moment (e.g., custom architectural mask, subtle parallax timeline, bespoke quote container)?
3. **Typography**: Are typography sizes fluidly clamped? Is there strict hierarchy, elegant tracking, and comfortable line length (45–75 characters per line)?
4. **Composition & Whitespace**: Is negative space generous and purposeful? Are elements aligned to an intentional grid rather than floating haphazardly?
5. **Color & Lighting**: Is the palette restrained? Are dark tones deep and atmospheric rather than flat `#000000`? Are contrast ratios compliant with WCAG AA?
6. **Media Integration**: Are images and videos editorial-grade, properly cropped, crisp on high-DPI displays, and free of low-res artifacts or distortion?
7. **Motion Choreography**: Are animations subtle (150–400ms), purposeful, and smooth? Do they respect `prefers-reduced-motion`?
8. **Mobile Polish**: Does the mobile view feel designed natively rather than squeezed? Are touch targets ≥ 44px? Is horizontal overflow strictly zero?
9. **Editorial Copy Presentation**: Are headlines, quotes, and badges styled with distinct typographic identities without looking like generic placeholder cards?
10. **Finishing Polish**: Are borders refined (subtle rgba scrims), shadows diffuse, hover transitions buttery, and scrollbars styled unobtrusively?

### Quality Threshold
- **Passing Threshold**: Average score **≥ 8.0 / 10.0**, with **no individual criterion below 7.0 / 10.0**.
- **Fix Loop Policy**: If a candidate view scores below 8.0, identify specific deficiencies, execute targeted refinements, and re-screen. Maximum 3 iterative fix cycles per view.

---

## 4. Execution Workflow: `scripts/shoot.py` and Browser Probes

### 4.1 Automated Screenshot Capture (`shoot.py`)
The workspace includes `.agents/skills/motionsites-web-builder/scripts/shoot.py` to capture standardized multi-viewport artifacts.

Standard execution:
```bash
python .agents/skills/motionsites-web-builder/scripts/shoot.py http://localhost:5173 /output/dir
```
Outputs generated:
- `desktop.png` (1440x900 full-viewport capture)
- `mobile.png` (390x844 mobile-viewport capture)
- `desktop-early.png` (1440x900 capture at +350ms to assess initial hero render stability and avoid layout pop)

### 4.2 Browser Inspection Workflow
- Use Playwright MCP tools (`browser_navigate`, `browser_resize`, `browser_take_screenshot`) to test interactive states (navigation menus, form validation displays, modal overlays).
- Verify zero horizontal scroll: `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- Ensure all interactive touch targets meet minimum 44px bounding box dimensions.
