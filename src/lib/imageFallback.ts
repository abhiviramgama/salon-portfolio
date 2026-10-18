/**
 * Generates on-brand placeholder artwork (an SVG data URI) for any <img> that
 * fails to load. Deterministic: the same alt text / URL always gives the same art,
 * so the site stays stable and never shows a broken-image icon.
 */
const palettes: [string, string][] = [
  ['#3b2d20', '#17120e'], // bronze
  ['#3d2832', '#181015'], // plum
  ['#2d3528', '#12150f'], // sage
  ['#272d36', '#11131a'], // slate
  ['#42302b', '#1a1210'], // rosewood
];

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const GOLD = '#C5A572';

function motif(kind: number): string {
  switch (kind) {
    case 0: // concentric arches (salon mirror)
      return [0, 1, 2, 3, 4]
        .map(i => {
          const w = 520 - i * 90;
          const x = 400 - w / 2;
          return `<path d="M${x} 1000 V ${460 + i * 60} a ${w / 2} ${w / 2} 0 0 1 ${w} 0 V 1000" fill="none" stroke="${GOLD}" stroke-opacity="${0.34 - i * 0.05}" stroke-width="2"/>`;
        })
        .join('');
    case 1: // overlapping rings
      return [
        [300, 420, 210],
        [500, 520, 210],
        [400, 640, 210],
      ]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${GOLD}" stroke-opacity="0.28" stroke-width="2"/>`)
        .join('');
    case 2: // fan of fine lines (hair strands)
      return Array.from({ length: 26 }, (_, i) => {
        const x2 = -200 + i * 46;
        return `<line x1="400" y1="1100" x2="${x2}" y2="-60" stroke="${GOLD}" stroke-opacity="${0.1 + (i % 5) * 0.035}" stroke-width="1.5"/>`;
      }).join('');
    default: // sun over horizon
      return (
        `<circle cx="400" cy="520" r="190" fill="${GOLD}" fill-opacity="0.10"/>` +
        [0, 1, 2, 3].map(i => `<line x1="80" y1="${640 + i * 46}" x2="720" y2="${640 + i * 46}" stroke="${GOLD}" stroke-opacity="${0.3 - i * 0.06}" stroke-width="2"/>`).join('')
      );
  }
}

export function fallbackImage(seed: string): string {
  const h = hash(seed || 'elora');
  const [c1, c2] = palettes[h % palettes.length];
  const kind = (h >> 3) % 4;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice">` +
    `<defs>` +
    `<linearGradient id="g" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>` +
    `<radialGradient id="v" cx="0.5" cy="0.35" r="0.8"><stop offset="0" stop-color="${GOLD}" stop-opacity="0.16"/><stop offset="1" stop-color="${GOLD}" stop-opacity="0"/></radialGradient>` +
    `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"/></filter>` +
    `</defs>` +
    `<rect width="800" height="1000" fill="url(#g)"/>` +
    `<rect width="800" height="1000" fill="url(#v)"/>` +
    motif(kind) +
    `<rect width="800" height="1000" filter="url(#n)"/>` +
    `<text x="400" y="560" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="150" font-weight="700" fill="${GOLD}" fill-opacity="0.55">É</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Swap any <img> that fails to load for generated artwork. Safe to call once at startup. */
export function installImageFallback(): void {
  const swap = (img: HTMLImageElement) => {
    if (img.dataset.fallback) return; // never loop
    img.dataset.fallback = '1';
    img.removeAttribute('srcset');
    img.src = fallbackImage(img.alt || img.currentSrc || img.src);
  };

  // `error` doesn't bubble, so listen in the capture phase on the document.
  document.addEventListener(
    'error',
    e => {
      if (e.target instanceof HTMLImageElement) swap(e.target);
    },
    true
  );

  // Catch images that already failed before React mounted.
  window.addEventListener('load', () => {
    document.querySelectorAll('img').forEach(img => {
      if (img.complete && img.naturalWidth === 0 && img.src) swap(img);
    });
  });
}
