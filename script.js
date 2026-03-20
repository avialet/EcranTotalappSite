/* ============================================
   ECRANTOTAL — Animations & Interactions
   GSAP + ScrollTrigger
   ============================================ */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ─── Nav scroll effect ───
const nav = document.getElementById('nav');
ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: 'bottom top',
  onLeave: () => nav.classList.add('scrolled'),
  onEnterBack: () => nav.classList.remove('scrolled'),
});

// ─── Hero entrance animation ───
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTl
  .from('#hero-blob', {
    scale: 0,
    opacity: 0,
    duration: 1.4,
    ease: 'elastic.out(1, 0.5)',
  })
  .from('#hero-title', {
    y: 60,
    opacity: 0,
    duration: 1,
  }, '-=0.7')
  .from('#hero-tagline', {
    y: 40,
    opacity: 0,
    duration: 0.9,
  }, '-=0.6')
  .from('#hero-cta', {
    y: 30,
    opacity: 0,
    duration: 0.8,
  }, '-=0.5')
  .from('#scroll-indicator', {
    opacity: 0,
    y: -20,
    duration: 0.6,
  }, '-=0.3');

// ─── Before / After section ───
const baTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#before-after',
    start: 'top 80%',
    once: true,
  },
});

baTl
  .from('#ba-label', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
  })
  .from('#ba-title', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.4')
  .from('.ba-before', {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  }, '-=0.3')
  .from('#ba-arrow', {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    ease: 'elastic.out(1, 0.5)',
  }, '-=0.5')
  .from('.ba-after', {
    x: 80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  }, '-=0.6');

// ─── Features section ───

// Vertical gradient line draw
gsap.to('#features-line', {
  scrollTrigger: {
    trigger: '#features',
    start: 'top 90%',
    end: 'bottom 20%',
    scrub: 0.8,
  },
  scaleY: 1,
  ease: 'none',
});

// Header reveal
const featuresHeaderTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#features',
    start: 'top 80%',
    once: true,
  },
});

featuresHeaderTl
  .from('#features-label', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  })
  .from('#features-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  }, '-=0.5');

// Feature cards — stagger from center with scale + rotation
gsap.from('.feature-card', {
  scrollTrigger: {
    trigger: '#features-grid',
    start: 'top 90%',
    once: true,
  },
  y: 80,
  opacity: 0,
  scale: 0.9,
  rotateX: 8,
  duration: 1,
  stagger: {
    amount: 0.8,
    from: 'center',
    grid: [2, 3],
  },
  ease: 'power4.out',
  transformPerspective: 800,
});

// Feature tags slide in after cards
gsap.from('.feature-tag', {
  scrollTrigger: {
    trigger: '#features-grid',
    start: 'top 75%',
    once: true,
  },
  x: -20,
  opacity: 0,
  duration: 0.6,
  stagger: {
    amount: 0.5,
    from: 'start',
  },
  delay: 0.6,
  ease: 'power2.out',
});

// Feature card numbers count up
document.querySelectorAll('.feature-number').forEach(num => {
  ScrollTrigger.create({
    trigger: num.closest('.feature-card'),
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from(num, {
        textContent: '00',
        duration: 0.8,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate() {
          const val = Math.round(parseFloat(num.textContent));
          num.textContent = String(val).padStart(2, '0');
        },
      });
    },
  });
});

// Feature card hover — 3D tilt + glow follow cursor
document.querySelectorAll('.feature-card').forEach(card => {
  const glow = card.querySelector('.feature-card-glow');

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    });

    if (glow) {
      gsap.to(glow, {
        x: e.clientX - rect.left - 80,
        y: e.clientY - rect.top - 80,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
    });
  });
});

// ─── Demo section ───
gsap.from('#demo-label', {
  scrollTrigger: {
    trigger: '#demo',
    start: 'top 80%',
    once: true,
  },
  y: 30,
  opacity: 0,
  duration: 0.7,
  ease: 'power2.out',
});

gsap.from('#demo-title', {
  scrollTrigger: {
    trigger: '#demo',
    start: 'top 80%',
    once: true,
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  delay: 0.15,
  ease: 'power2.out',
});

// Demo steps
const demoSteps = gsap.utils.toArray('.demo-step');
const demoConnectors = gsap.utils.toArray('.demo-connector');

demoSteps.forEach((step, i) => {
  gsap.from(step, {
    scrollTrigger: {
      trigger: '#demo-flow',
      start: 'top 80%',
      once: true,
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.25,
    ease: 'power3.out',
  });
});

demoConnectors.forEach((conn, i) => {
  gsap.from(conn, {
    scrollTrigger: {
      trigger: '#demo-flow',
      start: 'top 80%',
      once: true,
    },
    scaleX: 0,
    opacity: 0,
    duration: 0.6,
    delay: 0.15 + i * 0.25,
    ease: 'power2.out',
  });
});

// ─── Modes section ───
const modesHeaderTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#modes',
    start: 'top 80%',
    once: true,
  },
});

modesHeaderTl
  .from('#modes-label', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
  })
  .from('#modes-title', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.4');

gsap.from('.mode-card', {
  scrollTrigger: {
    trigger: '#modes-grid',
    start: 'top 85%',
    once: true,
  },
  y: 60,
  opacity: 0,
  scale: 0.95,
  duration: 0.9,
  stagger: 0.2,
  ease: 'power3.out',
});

// ─── Download section ───
gsap.from('#download-card', {
  scrollTrigger: {
    trigger: '#download',
    start: 'top 80%',
    once: true,
  },
  y: 60,
  opacity: 0,
  scale: 0.96,
  duration: 1,
  ease: 'power3.out',
});

// ─── Support section ───
gsap.from('#support-card', {
  scrollTrigger: {
    trigger: '#support',
    start: 'top 85%',
    once: true,
  },
  y: 40,
  opacity: 0,
  scale: 0.96,
  duration: 0.9,
  ease: 'power3.out',
});

// ─── Hero eye particle explosion on scroll ───
(() => {
  const blobContainer = document.getElementById('hero-blob');
  if (!blobContainer) return;

  const eyeHero = blobContainer.querySelector('.eye-hero');
  const PARTICLE_COUNT = 35;
  const particles = [];

  // Create particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'blob-particle';
    const size = gsap.utils.random(6, 22);
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    blobContainer.appendChild(p);

    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + gsap.utils.random(-0.4, 0.4);
    const distance = gsap.utils.random(100, 350);
    particles.push({
      el: p,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance - gsap.utils.random(50, 180),
      rot: gsap.utils.random(-360, 360),
      scale: gsap.utils.random(0.3, 1),
    });
  }

  // Scrub timeline: eye shrinks + particles scatter
  const explodeTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '70% top',
      scrub: 0.8,
    },
  });

  if (eyeHero) {
    explodeTl.to(eyeHero, {
      scale: 0.3,
      opacity: 0,
      duration: 1,
      ease: 'none',
    }, 0);
  }

  explodeTl.to('.blob-pulse-ring', {
    opacity: 0,
    scale: 0.5,
    duration: 0.5,
    ease: 'none',
  }, 0);

  particles.forEach((p, i) => {
    const delay = (i / PARTICLE_COUNT) * 0.3;
    gsap.set(p.el, { opacity: 0, scale: 0 });

    explodeTl.fromTo(p.el,
      { x: 0, y: 0, opacity: 0, scale: 0, rotation: 0 },
      {
        x: p.tx,
        y: p.ty,
        opacity: 1,
        scale: p.scale,
        rotation: p.rot,
        duration: 1,
        ease: 'none',
      },
      delay
    );

    explodeTl.to(p.el, {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      ease: 'none',
    }, 0.7 + delay * 0.5);
  });
})();

// ─── Hero content fade on scroll ───
gsap.to('.hero-content', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'center center',
    end: 'bottom top',
    scrub: 1,
  },
  y: -80,
  opacity: 0,
  ease: 'none',
});

// ─── Smooth scroll for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 40 },
        duration: 1,
        ease: 'power3.inOut',
      });
    }
  });
});

// ─── Magnetic button effect ───
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    });
  });
});

// ─── Glow follow cursor on hero ───
const heroGlow = document.querySelector('.hero-glow');
if (heroGlow) {
  document.querySelector('.hero').addEventListener('mousemove', e => {
    gsap.to(heroGlow, {
      x: (e.clientX - window.innerWidth / 2) * 0.08,
      y: (e.clientY - window.innerHeight / 2) * 0.08,
      duration: 1.5,
      ease: 'power2.out',
    });
  });
}

// ─── Download blob morph ───
const dlBlobPath = document.getElementById('downloadBlobPath');
if (dlBlobPath) {
  const shapes = [
    'M150,30 C230,30 270,90 270,150 C270,210 230,270 150,270 C70,270 30,210 30,150 C30,90 70,30 150,30',
    'M150,40 C240,60 260,100 250,160 C240,220 200,260 140,260 C80,260 40,220 50,160 C60,100 60,40 150,40',
    'M160,30 C220,50 270,110 260,170 C250,230 210,270 150,270 C90,270 40,230 40,170 C40,110 100,10 160,30',
  ];

  let current = 0;
  dlBlobPath.setAttribute('d', shapes[0]);

  setInterval(() => {
    current = (current + 1) % shapes.length;
    gsap.to(dlBlobPath, {
      attr: { d: shapes[current] },
      duration: 3,
      ease: 'power1.inOut',
    });
  }, 4000);
}
