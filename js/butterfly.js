export function initButterfly() {
  const canvas = document.getElementById('bfly-canvas');
  const wrap = document.getElementById('bfly-wrap');
  if (!canvas || !wrap) return;

  const N = 6000;
  const TRAIL = 420;
  const HALF_SIZE = 28;

  let vw = 0;
  let vh = 0;
  let pts = [];
  let maxIdx = 0;

  function resize() {
    vw = window.innerWidth;
    vh = window.innerHeight;
    canvas.width = vw;
    canvas.height = vh;
  }

  function buildPath() {
    pts = [];

    const sx = 0.09;
    const sy = 0.07;

    const vorts = [
      { ct: 0.22, hw: 0.055, r: 0.14, turns: 2.2 },
      { ct: 0.51, hw: 0.060, r: 0.12, turns: 2.8 },
      { ct: 0.79, hw: 0.065, r: 0.15, turns: 2.5 }
    ];

    for (let i = 0; i <= N; i++) {
      const t = i / N;

      let x =
        0.5 +
        0.34 * Math.sin(t * 26.7 + 0.6) +
        0.07 * Math.sin(t * 73.2 + 1.95) +
        0.02 * Math.sin(t * 154.1 + 0.8);

      let y =
        0.5 +
        0.31 * Math.cos(t * 19.3 + 1.15) +
        0.08 * Math.cos(t * 54.8 + 0.45) +
        0.03 * Math.cos(t * 118.6 + 2.1);

      for (const v of vorts) {
        const dt = (t - v.ct) / v.hw;
        if (dt > -1 && dt < 1) {
          const bell = 1 - dt * dt;
          const angle = dt * Math.PI * v.turns * 2;
          x += v.r * bell * Math.cos(angle);
          y += v.r * bell * Math.sin(angle);
        }
      }

      const blend = Math.min(1, t * 15);
      x = sx * (1 - blend) + x * blend;
      y = sy * (1 - blend) + y * blend;

      pts.push({
        x: Math.max(0.04, Math.min(0.95, x)),
        y: Math.max(0.06, Math.min(0.93, y))
      });
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      const maxScroll = document.documentElement.scrollHeight - vh;
      if (maxScroll <= 0) return;
      const p = Math.min(1, window.scrollY / maxScroll);
      const idx = Math.round(p * N);
      if (idx > maxIdx) maxIdx = idx;
    },
    { passive: true }
  );

  function frame() {
    requestAnimationFrame(frame);
    if (!pts.length) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, vw, vh);

    const ci = Math.min(maxIdx, N);
    const cur = pts[ci];
    const bx = cur.x * vw;
    const by = cur.y * vh;

    wrap.style.left = bx - HALF_SIZE + 'px';
    wrap.style.top = by - HALF_SIZE + 'px';

    const back = pts[Math.max(0, ci - 8)];
    const angle = (Math.atan2((cur.y - back.y) * vh, (cur.x - back.x) * vw) * 180) / Math.PI;
    wrap.style.transform = `rotate(${angle}deg)`;

    const ts = Math.max(0, ci - TRAIL);
    if (ci <= ts) return;

    const span = ci - ts;
    const b1 = ts + (span * 0.25 | 0);
    const b2 = ts + (span * 0.52 | 0);
    const b3 = ts + (span * 0.76 | 0);

    const bands = [
      { from: ts, to: b1, alpha: 0.08, lw: 1.2 },
      { from: b1, to: b2, alpha: 0.22, lw: 1.6 },
      { from: b2, to: b3, alpha: 0.42, lw: 2.0 },
      { from: b3, to: ci, alpha: 0.65, lw: 2.4 }
    ];

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const band of bands) {
      if (band.to <= band.from) continue;

      ctx.beginPath();
      ctx.setLineDash([10, 9]);
      ctx.strokeStyle = `rgba(112,42,225,${band.alpha})`;
      ctx.lineWidth = band.lw;

      ctx.moveTo(pts[band.from].x * vw, pts[band.from].y * vh);
      for (let i = band.from + 1; i <= band.to; i++) {
        ctx.lineTo(pts[i].x * vw, pts[i].y * vh);
      }
      ctx.stroke();
    }
  }

  window.addEventListener('load', () => {
    resize();
    buildPath();
    frame();
  });

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      resize();
    }, 300);
  });
}
