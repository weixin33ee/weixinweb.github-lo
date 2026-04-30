/* ===== UTOPIA BUILDER BUREAU — Shared Main JS ===== */

/* --- Particle Canvas --- */
const canvas = document.getElementById('pcv');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function Particle() { this.x = Math.random() * W; this.y = Math.random() * H; this.r = Math.random() * 1.2 + 0.3; this.dx = (Math.random() - 0.5) * 0.3; this.dy = (Math.random() - 0.5) * 0.3; this.o = Math.random() * 0.4 + 0.1; }
  Particle.prototype.draw = function () { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(110,231,249,${this.o})`; ctx.fill(); };
  Particle.prototype.update = function () { this.x += this.dx; this.y += this.dy; if (this.x < 0 || this.x > W) this.dx *= -1; if (this.y < 0 || this.y > H) this.dy *= -1; };
  function init() { resize(); pts = []; for (let i = 0; i < 70; i++) pts.push(new Particle()); }
  function drawLines() { for (let i = 0; i < pts.length; i++) { for (let j = i + 1; j < pts.length; j++) { const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y); if (d < 140) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(110,231,249,${0.06 * (1 - d / 140)})`; ctx.stroke(); } } } }
  function loop() { ctx.clearRect(0, 0, W, H); pts.forEach(p => { p.update(); p.draw(); }); drawLines(); requestAnimationFrame(loop); }
  window.addEventListener('resize', resize);
  init(); loop();
}

/* --- Intro Animation --- */
function initIntro() {
  const intro = document.getElementById('intro');
  const ascii = document.getElementById('intro-ascii');
  const msg = document.getElementById('intro-msg');
  if (!intro) return;
  const asciiArt = `
  ┌──────────────────────────────────────┐
  │  UTOPIA  BUILDER  BUREAU           │
  │  █ ██▓▒░  SYSTEM  INIT  ░▒▓██ █   │
  │  INTERNAL  UTOPIA  PROTOCOL        │
  │  ACCESSING...                       │
  └──────────────────────────────────────┘`;
  if (ascii) ascii.textContent = asciiArt;
  setTimeout(() => { if (ascii) ascii.style.opacity = '1'; }, 200);
  setTimeout(() => { if (msg) msg.style.opacity = '1'; }, 1400);
  setTimeout(() => { intro.style.opacity = '0'; setTimeout(() => { intro.style.display = 'none'; }, 1200); }, 4200);
}
initIntro();

/* --- Scroll Fade-In + Ability Bars --- */
const fiEls = document.querySelectorAll('.fi');
const abFills = document.querySelectorAll('.ab-bar .fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
      // trigger ability bars
      const fills = entry.target.querySelectorAll ? entry.target.querySelectorAll('.ab-bar .fill') : [];
      fills.forEach(f => { if (f.dataset.w) f.style.width = f.dataset.w; });
    }
  });
}, { threshold: 0.15 });
fiEls.forEach(el => observer.observe(el));

/* --- Nav Active State --- */
const path = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(a => {
  const href = a.getAttribute('href');
  if (!href) return;
  const page = href.split('/').pop().split('.')[0];
  const cur = path.split('/').pop().split('.')[0];
  if (cur === page || (cur === '' && page === 'index')) a.classList.add('active');
});

/* --- Anomaly Unlock --- */
document.querySelectorAll('.ae-lock').forEach(btn => {
  btn.addEventListener('click', () => {
    const entry = btn.closest('.anomaly-entry');
    const body = entry ? entry.querySelector('.ae-body') : null;
    if (!body) return;
    if (body.classList.contains('locked')) {
      body.classList.remove('locked');
      btn.textContent = '[ UNLOCKED ]';
      btn.classList.add('unlocked');
    } else {
      body.classList.add('locked');
      btn.textContent = '[ ACCESS RESTRICTED ]';
      btn.classList.remove('unlocked');
    }
  });
});

/* --- Story Pager --- */
(function () {
  const pages = document.querySelectorAll('.story-page');
  if (!pages.length) return;
  let cur = 0;
  const prevBtn = document.getElementById('pg-prev');
  const nextBtn = document.getElementById('pg-next');
  const counter = document.getElementById('pg-counter');
  const dotsWrap = document.getElementById('pg-dots');
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    pages.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'pg-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
  }
  function goTo(i) {
    if (i < 0 || i >= pages.length) return;
    pages[cur].classList.remove('active');
    cur = i;
    pages[cur].classList.add('active');
    if (prevBtn) prevBtn.disabled = cur === 0;
    if (nextBtn) nextBtn.disabled = cur === pages.length - 1;
    if (counter) counter.textContent = `${cur + 1} / ${pages.length}`;
    if (dotsWrap) dotsWrap.querySelectorAll('.pg-dot').forEach((d, j) => { d.classList.toggle('active', j === cur); });
  }
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(cur - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(cur + 1));
  goTo(0);
})();

/* --- BGM Player (placeholder) --- */
(function () {
  const playBtn = document.getElementById('bgm-play');
  const stopBtn = document.getElementById('bgm-stop');
  const prevBtn = document.getElementById('bgm-prev');
  const nextBtn = document.getElementById('bgm-next');
  const fill = document.querySelector('.bgm-fill');
  const bars = document.querySelectorAll('.bgm-bar-v');
  let playing = false;
  function toggleBars(on) { bars.forEach(b => b.classList.toggle('playing', on)); }
  if (playBtn) playBtn.addEventListener('click', () => { playing = !playing; playBtn.textContent = playing ? '⏸ PAUSE' : '▶ PLAY'; toggleBars(playing); if (fill) { fill.style.transition = 'none'; fill.style.width = playing ? '100%' : fill.style.width; if (playing) { fill.style.transition = 'width 180s linear'; fill.style.width = '0%'; } } });
  if (stopBtn) stopBtn.addEventListener('click', () => { playing = false; if (playBtn) playBtn.textContent = '▶ PLAY'; toggleBars(false); if (fill) { fill.style.transition = 'none'; fill.style.width = '0%'; } });
})();
