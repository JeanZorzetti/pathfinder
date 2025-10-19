# PWA Icons Generation Guide

## Overview
This guide explains how to generate all required icons for the Pathfinder PWA across different platforms (Android, iOS, Desktop).

## Required Icon Sizes

### Standard Icons (Any Purpose)
- 72x72px - Android Chrome
- 96x96px - Android Chrome
- 128x128px - Android Chrome
- 144x144px - Android Chrome, Microsoft
- 152x152px - iOS Safari
- 192x192px - Android Chrome (minimum)
- 384x384px - Android Chrome
- 512x512px - Android Chrome, Desktop (minimum)

### Maskable Icons (Adaptive Icons)
- 192x192px - Android adaptive icon
- 512x512px - Android adaptive icon

### Shortcut Icons
- 96x96px - For manifest shortcuts

### Apple Touch Icons
- 152x152px - iPad
- 180x180px - iPhone
- 192x192px - General use

### Favicon
- 16x16px
- 32x32px
- 48x48px
- favicon.ico (multi-size)

## Source Requirements

### Master Icon
- **Size**: Minimum 1024x1024px (recommended)
- **Format**: PNG with transparency
- **Safe Zone**: Keep important content within 80% of the canvas
- **Content**: Should work both with and without rounded corners

### Design Guidelines

#### Standard Icons
- Can use full canvas area
- Can have transparent backgrounds
- Can have any shape
- Will be displayed as-is on most platforms

#### Maskable Icons
- **CRITICAL**: Keep all important content within 80% safe zone
- Use solid background color (avoid transparency for maskable)
- Assume the icon will be cropped to various shapes (circle, square, rounded square)
- Background color should match your theme

## Icon Generation Methods

### Method 1: Online Tools (Easiest)

#### PWA Builder Image Generator
1. Go to https://www.pwabuilder.com/imageGenerator
2. Upload your master icon (1024x1024px PNG)
3. Select "Generate icons for PWA"
4. Download the zip file
5. Extract to `frontend/public/icons/`

#### RealFaviconGenerator
1. Go to https://realfavicongenerator.net/
2. Upload your master icon
3. Configure settings for different platforms
4. Download the generated package
5. Extract to `frontend/public/icons/`

### Method 2: CLI Tools

#### Using sharp-cli (Node.js)

Install sharp-cli:
```bash
npm install -g sharp-cli
```

Generate icons:
```bash
# Navigate to your project
cd frontend/public

# Create icons directory
mkdir -p icons

# Generate standard icons
sharp -i source-icon.png -o icons/icon-72x72.png resize 72 72
sharp -i source-icon.png -o icons/icon-96x96.png resize 96 96
sharp -i source-icon.png -o icons/icon-128x128.png resize 128 128
sharp -i source-icon.png -o icons/icon-144x144.png resize 144 144
sharp -i source-icon.png -o icons/icon-152x152.png resize 152 152
sharp -i source-icon.png -o icons/icon-192x192.png resize 192 192
sharp -i source-icon.png -o icons/icon-384x384.png resize 384 384
sharp -i source-icon.png -o icons/icon-512x512.png resize 512 512

# Generate maskable icons (use version with background)
sharp -i source-icon-maskable.png -o icons/icon-maskable-192x192.png resize 192 192
sharp -i source-icon-maskable.png -o icons/icon-maskable-512x512.png resize 512 512
```

#### Using ImageMagick

Install ImageMagick, then run:
```bash
# Standard icons
convert source-icon.png -resize 72x72 icons/icon-72x72.png
convert source-icon.png -resize 96x96 icons/icon-96x96.png
convert source-icon.png -resize 128x128 icons/icon-128x128.png
convert source-icon.png -resize 144x144 icons/icon-144x144.png
convert source-icon.png -resize 152x152 icons/icon-152x152.png
convert source-icon.png -resize 192x192 icons/icon-192x192.png
convert source-icon.png -resize 384x384 icons/icon-384x384.png
convert source-icon.png -resize 512x512 icons/icon-512x512.png

# Maskable icons
convert source-icon-maskable.png -resize 192x192 icons/icon-maskable-192x192.png
convert source-icon-maskable.png -resize 512x512 icons/icon-maskable-512x512.png
```

### Method 3: Automated Script

Create a script `scripts/generate-icons.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_ICON = path.join(__dirname, '../frontend/public/source-icon.png');
const ICONS_DIR = path.join(__dirname, '../frontend/public/icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const maskableSizes = [192, 512];

async function generateIcons() {
  console.log('Generating PWA icons...');

  // Generate standard icons
  for (const size of sizes) {
    await sharp(SOURCE_ICON)
      .resize(size, size)
      .png()
      .toFile(path.join(ICONS_DIR, `icon-${size}x${size}.png`));

    console.log(`✓ Generated icon-${size}x${size}.png`);
  }

  // Generate maskable icons
  for (const size of maskableSizes) {
    await sharp(SOURCE_ICON)
      .resize(size, size)
      .png()
      .toFile(path.join(ICONS_DIR, `icon-maskable-${size}x${size}.png`));

    console.log(`✓ Generated icon-maskable-${size}x${size}.png`);
  }

  // Generate shortcut icons
  const shortcuts = ['mbti', 'dashboard', 'library'];

  for (const shortcut of shortcuts) {
    // You would replace this with actual shortcut-specific icons
    await sharp(SOURCE_ICON)
      .resize(96, 96)
      .png()
      .toFile(path.join(ICONS_DIR, `shortcut-${shortcut}-96x96.png`));

    console.log(`✓ Generated shortcut-${shortcut}-96x96.png`);
  }

  console.log('✓ All icons generated successfully!');
}

generateIcons().catch(console.error);
```

Install dependencies and run:
```bash
npm install sharp
node scripts/generate-icons.js
```

## Maskable Icon Creation

### What are Maskable Icons?

Maskable icons are adaptive icons that can be cropped to various shapes by the platform. They're primarily used on Android devices.

### Creating a Maskable Icon

1. Start with your standard icon
2. Add a solid background color that matches your theme
3. Scale down the main icon content to fit within 80% safe zone
4. The outer 10% on all sides should be considered "unsafe" and may be cropped

### Testing Maskable Icons

Use Maskable.app:
1. Go to https://maskable.app/editor
2. Upload your maskable icon
3. Test with different shapes and sizes
4. Adjust if content is being cut off

## Directory Structure

After generation, your icons directory should look like:

```
frontend/public/icons/
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
├── icon-512x512.png
├── icon-maskable-192x192.png
├── icon-maskable-512x512.png
├── shortcut-mbti-96x96.png
├── shortcut-dashboard-96x96.png
└── shortcut-library-96x96.png
```

## Quick Start (Recommended for Pathfinder)

### Step 1: Create Master Icon

Design a 1024x1024px icon with:
- Pathfinder logo/symbol in center
- Keep logo within 80% safe zone (820x820px)
- Use brand color (#6366f1 - indigo)
- Transparent or solid background

### Step 2: Generate All Icons

Use PWA Builder (easiest):
1. Go to https://www.pwabuilder.com/imageGenerator
2. Upload your 1024x1024px icon
3. Download and extract to `frontend/public/icons/`

Or use the automated script above.

### Step 3: Verify in Manifest

Ensure `frontend/public/manifest.json` correctly references all icons.

### Step 4: Test

1. Build and deploy the app
2. Test installation on:
   - Android Chrome
   - Desktop Chrome
   - iOS Safari (Add to Home Screen)

## Platform-Specific Notes

### Android
- Supports both standard and maskable icons
- Maskable icons give better native look
- Will automatically adapt to device theme (circle, square, rounded)

### iOS
- Requires icons added to Home Screen
- Uses Apple Touch Icons
- Doesn't support maskable icons
- Icon corners are automatically rounded

### Desktop
- Uses standard icons
- Shown in browser installation dialog
- Appears in app launcher/dock

## Optimization

### File Size
- Optimize PNGs using tools like:
  - TinyPNG (https://tinypng.com/)
  - ImageOptim (Mac)
  - Squoosh (https://squoosh.app/)

### Best Practices
- Keep file sizes under 100KB per icon
- Use PNG format for transparency
- Maintain consistent visual style across all sizes
- Test on real devices

## Troubleshooting

### Icons not showing
- Check file paths in manifest.json
- Verify icons are actually generated and in correct directory
- Clear browser cache
- Check browser console for 404 errors

### Icons look blurry
- Ensure icons are generated at exact pixel sizes (not scaled)
- Don't use JPEG (use PNG)
- Check source icon quality

### Maskable icons getting cut off
- Keep content within 80% safe zone
- Add more padding around main content
- Test with Maskable.app editor

## Resources

- [PWA Builder Image Generator](https://www.pwabuilder.com/imageGenerator)
- [Maskable.app Editor](https://maskable.app/editor)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Icon Handbook](https://www.w3.org/TR/appmanifest/#icon-masks)
- [Android Adaptive Icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive)
