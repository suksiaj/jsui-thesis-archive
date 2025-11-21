function getLuminance(hex) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = ((rgb >> 16) & 0xff) / 255;
  const g = ((rgb >> 8) & 0xff) / 255;
  const b = (rgb & 0xff) / 255;
  
  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

function getContrastRatio(color1, color2) {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

const colors = [
  { bg: '#1a237e', fg: '#ffffff', name: 'Primary main' },
  { bg: '#534bae', fg: '#ffffff', name: 'Primary light' },
  { bg: '#000051', fg: '#ffffff', name: 'Primary dark' },
  { bg: '#d84315', fg: '#ffffff', name: 'Secondary main (CURRENT)' },
  { bg: '#bf360c', fg: '#ffffff', name: 'Secondary main (BEST)' },
  { bg: '#e64a19', fg: '#ffffff', name: 'Secondary light (CURRENT)' },
  { bg: '#d84315', fg: '#ffffff', name: 'Secondary light (TEST)' },
  { bg: '#c43e00', fg: '#ffffff', name: 'Secondary dark' },
  { bg: '#d32f2f', fg: '#ffffff', name: 'Error' },
  { bg: '#e65100', fg: '#ffffff', name: 'Warning' },
  { bg: '#0277bd', fg: '#ffffff', name: 'Info' },
  { bg: '#2e7d32', fg: '#ffffff', name: 'Success' }
];

console.log('WCAG AA Contrast Requirements: 4.5:1 (normal text), 3:1 (large text/UI)\n');

colors.forEach(c => {
  const ratio = getContrastRatio(c.bg, c.fg);
  const status = ratio >= 4.5 ? 'PASS' : ratio >= 3.0 ? 'LARGE TEXT OK' : 'FAIL';
  console.log(`${c.name.padEnd(20)} (${c.bg}): ${ratio}:1 [${status}]`);
});
