import sharp from 'sharp';
import { readFileSync } from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const W = 1200, H = 630;

const heroBuf = await sharp(path.join(root, 'public/images/hero.webp'))
  .resize(W, H, { fit: 'cover', position: 'top' })
  .toBuffer();

const logoBuf = readFileSync(path.join(root, 'public/images/LJC-logo.png'));
const logoB64 = logoBuf.toString('base64');

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leftFade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(10,10,10,0.92)"/>
      <stop offset="55%" stop-color="rgba(10,10,10,0.55)"/>
      <stop offset="100%" stop-color="rgba(10,10,10,0.05)"/>
    </linearGradient>
    <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(0,0,0,0.35)"/>
      <stop offset="40%" stop-color="rgba(0,0,0,0)"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#leftFade)"/>
  <rect width="${W}" height="${H}" fill="url(#topFade)"/>

  <!-- Now booking badge -->
  <rect x="60" y="64" width="280" height="40" rx="20" fill="rgba(26,26,26,0.85)" stroke="rgba(181,219,54,0.4)" stroke-width="1"/>
  <circle cx="84" cy="84" r="5" fill="#B5DB36"/>
  <text x="100" y="90" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1.5" fill="#B5DB36">NOW BOOKING NEW PROJECTS</text>

  <!-- Headline -->
  <text x="58" y="220" font-family="Arial, sans-serif" font-size="72" font-weight="800" fill="#FFFFFF">Built Right.</text>
  <text x="58" y="300" font-family="Arial, sans-serif" font-size="72" font-weight="800" fill="#B5DB36">Built Local.</text>
  <path d="M58,318 C140,310 240,330 360,316" stroke="#B5DB36" stroke-width="4" fill="none" stroke-linecap="round"/>

  <!-- Tagline -->
  <text x="60" y="380" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#FFFFFF">Full-service construction for Jefferson County.</text>

  <!-- Sub -->
  <text x="60" y="420" font-family="Arial, sans-serif" font-size="20" font-weight="500" fill="#E0E0E0">Roofing, siding, decks, drywall, painting, flooring,</text>
  <text x="60" y="448" font-family="Arial, sans-serif" font-size="20" font-weight="500" fill="#E0E0E0">and everything in between.</text>

  <!-- Trust badges -->
  <text x="60" y="540" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#B5DB36">&#10003; Fully Insured &#160;&#160;&#160;&#160; &#10003; Free Estimates &#160;&#160;&#160;&#160; &#10003; Jefferson County Local</text>

  <!-- Logo -->
  <image x="${W - 280}" y="36" width="240" height="153" href="data:image/png;base64,${logoB64}"/>
</svg>
`;

await sharp(heroBuf)
  .composite([{ input: Buffer.from(svg) }])
  .jpeg({ quality: 85 })
  .toFile(path.join(root, 'public/images/og-image.jpg'));

console.log('done');
