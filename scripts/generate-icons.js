/**
 * PWA Icons Generator Script
 * Generates all required icons for PWA from a source image
 *
 * Usage:
 * 1. Place your master icon (1024x1024px) at frontend/public/source-icon.png
 * 2. Run: node scripts/generate-icons.js
 *
 * Requirements:
 * npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Paths
const SOURCE_ICON = path.join(__dirname, '../frontend/public/source-icon.png');
const ICONS_DIR = path.join(__dirname, '../frontend/public/icons');
const SCREENSHOTS_DIR = path.join(__dirname, '../frontend/public/screenshots');

// Icon configurations
const STANDARD_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const MASKABLE_SIZES = [192, 512];
const SHORTCUTS = [
  { name: 'mbti', label: 'MBTI Test' },
  { name: 'dashboard', label: 'Dashboard' },
  { name: 'library', label: 'Content Library' },
];

// Colors
const BACKGROUND_COLOR = '#6366f1'; // Pathfinder brand color
const SAFE_ZONE_PERCENTAGE = 0.8; // 80% safe zone for maskable icons

async function ensureDirectories() {
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
    console.log('✓ Created icons directory');
  }

  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    console.log('✓ Created screenshots directory');
  }
}

async function checkSourceIcon() {
  if (!fs.existsSync(SOURCE_ICON)) {
    console.error('❌ Source icon not found at:', SOURCE_ICON);
    console.log('\nPlease create a 1024x1024px PNG image at:');
    console.log('  frontend/public/source-icon.png');
    console.log('\nDesign guidelines:');
    console.log('  - Size: 1024x1024px');
    console.log('  - Format: PNG with transparency');
    console.log('  - Keep important content within 80% safe zone (820x820px)');
    console.log('  - Use brand colors');
    process.exit(1);
  }

  // Check image dimensions
  const metadata = await sharp(SOURCE_ICON).metadata();
  console.log(`✓ Source icon found: ${metadata.width}x${metadata.height}px`);

  if (metadata.width < 512 || metadata.height < 512) {
    console.warn('⚠️  Warning: Source icon is smaller than recommended (1024x1024px)');
    console.warn('   Upscaling may result in blurry icons');
  }
}

async function generateStandardIcons() {
  console.log('\n📱 Generating standard icons...');

  for (const size of STANDARD_SIZES) {
    const outputPath = path.join(ICONS_DIR, `icon-${size}x${size}.png`);

    await sharp(SOURCE_ICON)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`  ✓ icon-${size}x${size}.png (${sizeKB} KB)`);
  }
}

async function generateMaskableIcons() {
  console.log('\n🎭 Generating maskable icons...');

  for (const size of MASKABLE_SIZES) {
    const outputPath = path.join(ICONS_DIR, `icon-maskable-${size}x${size}.png`);

    // Create a background square
    const background = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: BACKGROUND_COLOR,
      },
    })
      .png()
      .toBuffer();

    // Calculate safe zone size (80% of total)
    const iconSize = Math.floor(size * SAFE_ZONE_PERCENTAGE);
    const offset = Math.floor((size - iconSize) / 2);

    // Resize the icon to fit within safe zone
    const icon = await sharp(SOURCE_ICON)
      .resize(iconSize, iconSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    // Composite the icon on the background
    await sharp(background)
      .composite([
        {
          input: icon,
          top: offset,
          left: offset,
        },
      ])
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`  ✓ icon-maskable-${size}x${size}.png (${sizeKB} KB)`);
  }
}

async function generateShortcutIcons() {
  console.log('\n⚡ Generating shortcut icons...');

  for (const shortcut of SHORTCUTS) {
    const outputPath = path.join(ICONS_DIR, `shortcut-${shortcut.name}-96x96.png`);

    // For now, use the same icon for all shortcuts
    // In the future, you can create custom icons for each shortcut
    await sharp(SOURCE_ICON)
      .resize(96, 96, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`  ✓ shortcut-${shortcut.name}-96x96.png (${sizeKB} KB) - ${shortcut.label}`);
  }
}

async function generateFavicons() {
  console.log('\n🌐 Generating favicons...');

  const faviconSizes = [16, 32, 48];

  for (const size of faviconSizes) {
    const outputPath = path.join(__dirname, '../frontend/public', `favicon-${size}x${size}.png`);

    await sharp(SOURCE_ICON)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`  ✓ favicon-${size}x${size}.png (${sizeKB} KB)`);
  }
}

async function createPlaceholderScreenshots() {
  console.log('\n📸 Creating placeholder screenshots...');

  // Desktop screenshot (1280x720)
  const desktopPath = path.join(SCREENSHOTS_DIR, 'desktop-home.png');
  await sharp({
    create: {
      width: 1280,
      height: 720,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }, // Pathfinder dark bg
    },
  })
    .png()
    .toFile(desktopPath);
  console.log('  ✓ desktop-home.png (placeholder)');

  // Mobile screenshot (750x1334)
  const mobilePath = path.join(SCREENSHOTS_DIR, 'mobile-dashboard.png');
  await sharp({
    create: {
      width: 750,
      height: 1334,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 },
    },
  })
    .png()
    .toFile(mobilePath);
  console.log('  ✓ mobile-dashboard.png (placeholder)');

  console.log('\n  ℹ️  Replace these placeholders with actual screenshots');
}

async function displaySummary() {
  console.log('\n' + '='.repeat(60));
  console.log('✅ PWA ICONS GENERATION COMPLETE');
  console.log('='.repeat(60));

  const iconFiles = fs.readdirSync(ICONS_DIR);
  const totalSize = iconFiles.reduce((sum, file) => {
    const stats = fs.statSync(path.join(ICONS_DIR, file));
    return sum + stats.size;
  }, 0);

  console.log(`\n📊 Summary:`);
  console.log(`  Total icons: ${iconFiles.length}`);
  console.log(`  Total size: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(`  Average size: ${(totalSize / 1024 / iconFiles.length).toFixed(2)} KB per icon`);

  console.log(`\n📁 Icons location: ${ICONS_DIR}`);

  console.log(`\n✅ Next steps:`);
  console.log(`  1. Review generated icons in: frontend/public/icons/`);
  console.log(`  2. Replace placeholder screenshots with actual app screenshots`);
  console.log(`  3. Test PWA installation on different devices`);
  console.log(`  4. Optimize icon file sizes if needed (use TinyPNG, Squoosh, etc.)`);

  console.log(`\n🧪 Testing:`);
  console.log(`  - Use https://maskable.app/editor to test maskable icons`);
  console.log(`  - Test installation on Android Chrome, Desktop Chrome, iOS Safari`);
  console.log(`  - Check manifest.json is properly configured`);
}

async function main() {
  console.log('🚀 Pathfinder PWA Icons Generator');
  console.log('='.repeat(60));

  try {
    await ensureDirectories();
    await checkSourceIcon();
    await generateStandardIcons();
    await generateMaskableIcons();
    await generateShortcutIcons();
    await generateFavicons();
    await createPlaceholderScreenshots();
    await displaySummary();
  } catch (error) {
    console.error('\n❌ Error generating icons:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the script
main();
