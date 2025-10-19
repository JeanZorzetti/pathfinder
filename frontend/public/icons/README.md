# PWA Icons Directory

This directory contains all the icons required for the Pathfinder Progressive Web App (PWA).

## Quick Setup

### Method 1: Use Online Generator (Recommended)

1. Create a master icon (1024x1024px PNG)
2. Go to https://www.pwabuilder.com/imageGenerator
3. Upload your icon
4. Download and extract all icons to this directory

### Method 2: Use Automated Script

1. Place your master icon at `frontend/public/source-icon.png`
2. Install sharp: `npm install sharp`
3. Run: `node scripts/generate-icons.js`
4. Icons will be generated in this directory

## Required Files

### Standard Icons (Required)
- `icon-72x72.png` - Android Chrome
- `icon-96x96.png` - Android Chrome
- `icon-128x128.png` - Android Chrome
- `icon-144x144.png` - Android Chrome, Microsoft
- `icon-152x152.png` - iOS Safari
- `icon-192x192.png` - Android Chrome minimum (required for PWA)
- `icon-384x384.png` - Android Chrome
- `icon-512x512.png` - Android Chrome, Desktop minimum (required for PWA)

### Maskable Icons (Recommended for Android)
- `icon-maskable-192x192.png` - Android adaptive icon
- `icon-maskable-512x512.png` - Android adaptive icon

### Shortcut Icons (Optional)
- `shortcut-mbti-96x96.png` - MBTI Test shortcut
- `shortcut-dashboard-96x96.png` - Dashboard shortcut
- `shortcut-library-96x96.png` - Content Library shortcut

## Design Guidelines

### Standard Icons
- Can use full canvas area
- Can have transparent backgrounds
- Will be displayed as-is

### Maskable Icons
- **CRITICAL**: Keep important content within 80% safe zone
- Use solid background matching your theme color
- Assume icon will be cropped to various shapes

## Testing

- Test maskable icons: https://maskable.app/editor
- Test on real devices (Android, iOS, Desktop)
- Check browser DevTools Application tab

## File Size Optimization

After generating, optimize icons using:
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- ImageOptim (Mac)

Target: Keep each icon under 100KB

## Resources

- [PWA Icon Requirements](https://web.dev/add-manifest/)
- [Maskable Icons Guide](https://web.dev/maskable-icon/)
- [Icon Generation Guide](../../docs/PWA_ICONS_GUIDE.md)
