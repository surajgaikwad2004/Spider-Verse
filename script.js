/* ════════════════════════════════════════════════
   SPIDER-MAN | Enter the Spider-Verse
   script.js — All JavaScript & Three.js logic
   ════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════
   1. CUSTOM CURSOR + WEB TRAIL
   ════════════════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const trailCanvas = document.getElementById('cursor-trail-canvas');
const tCtx = trailCanvas.getContext('2d');

let mx = -100, my = -100;
const trail = [];

function resizeTrail() {
  trailCanvas.width  = window.innerWidth;
  trailCanvas.height = window.innerHeight;
}
resizeTrail();
window.addEventListener('resize', resizeTrail);

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  trail.push({ x: mx, y: my });
  if (trail.length > 30) trail.shift();
});

function animateTrail() {
  tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
  for (let i = 1; i < trail.length; i++) {
    const a = trail[i - 1];
    const b = trail[i];
    const alpha = (i / trail.length) * 0.5;
    tCtx.beginPath();
    tCtx.moveTo(a.x, a.y);
    tCtx.lineTo(b.x, b.y);
    tCtx.strokeStyle = `rgba(0,240,255,${alpha})`;
    tCtx.lineWidth = 1.5;
    tCtx.stroke();
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();

/* ════════════════════════════════════════════════
   2. NAVBAR — SCROLL BEHAVIOUR
   ════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

/* ════════════════════════════════════════════════
   3. THREE.JS HERO SCENE
   ════════════════════════════════════════════════ */
(function initHero() {
  const canvas   = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x050810, 1);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  /* Fog */
  scene.fog = new THREE.FogExp2(0x050810, 0.035);

  /* Lighting */
  scene.add(new THREE.AmbientLight(0x111122, 1));

  const redLight = new THREE.PointLight(0xe63946, 3, 20);
  redLight.position.set(-3, 2, 3);
  scene.add(redLight);

  const blueLight = new THREE.PointLight(0x00f0ff, 3, 20);
  blueLight.position.set(3, -2, 3);
  scene.add(blueLight);

  /* ── Spider Mask ── */
  const maskGroup = new THREE.Group();

  // Head sphere
  const headGeo = new THREE.SphereGeometry(1, 32, 32);
  const headMat = new THREE.MeshPhongMaterial({ color: 0xcc0000, shininess: 120, specular: 0xff4444 });
  maskGroup.add(new THREE.Mesh(headGeo, headMat));

  // Wireframe web overlay
  const webGeo = new THREE.SphereGeometry(1.01, 16, 16);
  const webMat = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, opacity: 0.4, transparent: true });
  maskGroup.add(new THREE.Mesh(webGeo, webMat));

  // Eyes
  const eyeGeo    = new THREE.EllipseCurve(0, 0, 0.25, 0.15, 0, Math.PI * 2, false, 0);
  const eyeShape  = new THREE.Shape(eyeGeo.getPoints(32));
  const eyeExtGeo = new THREE.ExtrudeGeometry(eyeShape, { depth: 0.05, bevelEnabled: false });
  const eyeMat    = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const leftEye = new THREE.Mesh(eyeExtGeo, eyeMat);
  leftEye.position.set(-0.32, 0.2, 0.93);
  leftEye.rotation.set(0.1, 0.35, 0.1);
  maskGroup.add(leftEye);

  const rightEye = new THREE.Mesh(eyeExtGeo, eyeMat);
  rightEye.position.set(0.32, 0.2, 0.93);
  rightEye.rotation.set(0.1, -0.35, -0.1);
  maskGroup.add(rightEye);

  scene.add(maskGroup);

  /* ── Floating Spider Logo ── */
  const spiderGroup = new THREE.Group();
  spiderGroup.position.set(2.5, -1.5, 0);

  const bodyMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  spiderGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), bodyMat));

  for (let i = 0; i < 8; i++) {
    const angle  = (i / 8) * Math.PI * 2;
    const legGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 8);
    const leg    = new THREE.Mesh(legGeo, bodyMat);
    leg.rotation.z = angle + Math.PI / 2;
    leg.position.set(Math.cos(angle) * 0.25, Math.sin(angle) * 0.25, 0);
    spiderGroup.add(leg);
  }
  scene.add(spiderGroup);

  /* ── Particle System ── */
  const particleCount = 800;
  const positions     = new Float32Array(particleCount * 3);
  const particleSpeeds = [];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    particleSpeeds.push({
      vx: (Math.random() - 0.5) * 0.005,
      vy: (Math.random() - 0.5) * 0.005
    });
  }

  const partGeo = new THREE.BufferGeometry();
  partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const partMat  = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.04, transparent: true, opacity: 0.6 });
  const particles = new THREE.Points(partGeo, partMat);
  scene.add(particles);

  /* ── City Skyline Backdrop ── */
  const buildingMat = new THREE.MeshBasicMaterial({ color: 0x0a0f20, transparent: true, opacity: 0.8 });
  for (let i = 0; i < 20; i++) {
    const w   = 0.4 + Math.random() * 0.8;
    const h   = 1   + Math.random() * 4;
    const geo = new THREE.BoxGeometry(w, h, 0.1);
    const b   = new THREE.Mesh(geo, buildingMat);
    b.position.set(-10 + i * 1.1, -3 + h / 2, -8 - Math.random() * 4);
    scene.add(b);
  }

  /* ── Animation Loop ── */
  let t = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', e => {
    targetX = (e.clientX / window.innerWidth  - 0.5) *  0.8;
    targetY = (e.clientY / window.innerHeight - 0.5) * -0.5;
  });

  function animate() {
    requestAnimationFrame(animate);
    t += 0.01;

    // Rotate mask
    maskGroup.rotation.y += 0.004;
    maskGroup.rotation.x  = Math.sin(t * 0.3) * 0.1;

    // Float spider logo
    spiderGroup.rotation.z  += 0.01;
    spiderGroup.position.y   = -1.5 + Math.sin(t * 0.8) * 0.2;

    // Move particles
    const pos = partGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3]     += particleSpeeds[i].vx;
      pos[i * 3 + 1] += particleSpeeds[i].vy;
      if (Math.abs(pos[i * 3])     > 15) particleSpeeds[i].vx *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 10) particleSpeeds[i].vy *= -1;
    }
    partGeo.attributes.position.needsUpdate = true;
    particles.rotation.y += 0.0005;

    // Camera parallax follow
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.position.z  = 5 + Math.sin(t * 0.1) * 0.3;
    camera.lookAt(scene.position);

    // Pulsing lights
    redLight.intensity  = 2.5 + Math.sin(t * 2) * 0.5;
    blueLight.intensity = 2.5 + Math.cos(t * 2) * 0.5;

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

/* ════════════════════════════════════════════════
   4. WEB SHOOTING ANIMATION (Canvas 2D)
   ════════════════════════════════════════════════ */
(function initWebAnimation() {
  const canvas = document.getElementById('web-canvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const webs = [];
  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;

  /* Shoot a web thread toward a target point */
  function shootWeb(tx, ty) {
    const corners = [
      { x: 0,                   y: 0 },
      { x: window.innerWidth,   y: 0 }
    ];
    const corner = corners[Math.floor(Math.random() * corners.length)];
    webs.push({
      sx: corner.x, sy: corner.y,
      tx, ty,
      progress: 0,
      opacity:  0.5,
      color: Math.random() > 0.5 ? '0,240,255' : '230,57,70',
      branches: []
    });
  }

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (Math.random() < 0.03) shootWeb(mouseX, mouseY);
  });

  // Initial web on load
  setTimeout(() => shootWeb(mouseX, mouseY), 500);

  // Periodic auto-shoot
  setInterval(() => {
    if (Math.random() < 0.5) {
      shootWeb(
        mouseX + (Math.random() - 0.5) * 200,
        mouseY + (Math.random() - 0.5) * 200
      );
    }
  }, 1200);

  function animateWebs() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = webs.length - 1; i >= 0; i--) {
      const w = webs[i];
      w.progress = Math.min(w.progress + 0.04, 1);
      w.opacity -= 0.004;
      if (w.opacity <= 0) { webs.splice(i, 1); continue; }

      const cx = w.sx + (w.tx - w.sx) * w.progress;
      const cy = w.sy + (w.ty - w.sy) * w.progress;

      // Main thread with slight curve
      const cpx = (w.sx + cx) / 2 + (Math.random() - 0.5) * 40;
      const cpy = (w.sy + cy) / 2 + (Math.random() - 0.5) * 40;
      ctx.beginPath();
      ctx.moveTo(w.sx, w.sy);
      ctx.quadraticCurveTo(cpx, cpy, cx, cy);
      ctx.strokeStyle = `rgba(${w.color},${w.opacity})`;
      ctx.lineWidth   = 0.8;
      ctx.stroke();

      // Branch threads
      if (w.progress > 0.3 && w.branches.length < 2 && Math.random() < 0.02) {
        w.branches.push({
          x: cx, y: cy,
          tx: cx + (Math.random() - 0.5) * 100,
          ty: cy + (Math.random() - 0.5) * 100,
          p: 0, op: w.opacity
        });
      }

      for (const b of w.branches) {
        b.p = Math.min(b.p + 0.05, 1);
        const bx = b.x + (b.tx - b.x) * b.p;
        const by = b.y + (b.ty - b.y) * b.p;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(${w.color},${b.op * 0.5})`;
        ctx.lineWidth   = 0.4;
        ctx.stroke();
      }
    }
    requestAnimationFrame(animateWebs);
  }
  animateWebs();

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();

/* ════════════════════════════════════════════════
   5. POWER CARDS — 3D TILT EFFECT
   ════════════════════════════════════════════════ */
document.querySelectorAll('.power-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const rx   =  ((e.clientY - cy) / rect.height) * 16;
    const ry   = -((e.clientX - cx) / rect.width)  * 16;
    card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width  * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - rect.top)  / rect.height * 100) + '%');
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

/* ════════════════════════════════════════════════
   6. FOOTER WEB BACKGROUND
   ════════════════════════════════════════════════ */
(function initFooterWeb() {
  const canvas = document.getElementById('footer-web-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();

  function drawWeb() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx   = canvas.width / 2;
    const maxR = Math.max(canvas.width, canvas.height);

    // Concentric rings
    for (let r = 30; r < maxR; r += 45) {
      ctx.beginPath();
      ctx.arc(cx, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,240,255,${0.15 - (r / maxR) * 0.15})`;
      ctx.lineWidth   = 0.5;
      ctx.stroke();
    }

    // Radial spokes
    for (let a = 0; a < 360; a += 20) {
      const rad = (a * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx + Math.cos(rad) * maxR, Math.sin(rad) * maxR);
      ctx.strokeStyle = 'rgba(0,240,255,0.06)';
      ctx.lineWidth   = 0.5;
      ctx.stroke();
    }
  }
  drawWeb();

  window.addEventListener('resize', () => { resize(); drawWeb(); });
})();

/* ════════════════════════════════════════════════
   7. SCROLL REVEAL (Intersection Observer)
   ════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger power bar fill animations inside the card
      entry.target.querySelectorAll('.power-fill').forEach(el => {
        el.style.transform = 'scaleX(1)';
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Separate observer for power cards (tighter threshold for bar animation)
const powerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      powerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.power-card').forEach(el => powerObserver.observe(el));

/* ════════════════════════════════════════════════
   8. PARALLAX ON SCROLL
   ════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Hero content drifts upward on scroll
  const heroContent = document.getElementById('hero-content');
  if (heroContent) {
    heroContent.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
  }

  // City skyline drifts slower
  const city = document.querySelector('.city-skyline');
  if (city) {
    city.style.transform = `translateY(${scrollY * 0.05}px)`;
  }
});
