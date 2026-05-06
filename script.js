/* ==========================================
   Anubhav Singh Portfolio — script.js v2
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Custom Cursor ---- */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  })();

  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; follower.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; follower.style.opacity = '.55'; });

  /* ---- Navbar scroll ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ---- Hamburger ---- */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  function toggleMenu(state) {
    menuOpen = state;
    mobileMenu.classList.toggle('open', menuOpen);
    const [s1, s2, s3] = hamburger.querySelectorAll('span');
    if (menuOpen) {
      s1.style.transform = 'rotate(45deg) translate(5px,5px)';
      s2.style.opacity   = '0';
      s3.style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      [s1,s2,s3].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  }

  hamburger.addEventListener('click', () => toggleMenu(!menuOpen));
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => toggleMenu(false)));

  /* ---- Active nav link highlight ---- */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-links a');

  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === '#' + entry.target.id;
          link.style.color = active ? 'var(--accent)' : '';
        });
      }
    });
  }, { threshold: 0.35 }).observe && sections.forEach(s =>
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === '#' + entry.target.id ? 'var(--accent)' : '';
          });
        }
      });
    }, { threshold: 0.35 }).observe(s)
  );

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.07 + 's';
    revealObs.observe(el);
  });

  /* ---- Smooth scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 78, behavior: 'smooth' });
      }
    });
  });

  /* ---- Tilt on featured cards ---- */
  document.querySelectorAll('.project-featured-card, .flagship-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - .5) * -5;
      const ry = ((e.clientX - r.left) / r.width  - .5) *  5;
      card.style.transform = `translateY(-4px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      card.style.transition = 'transform .08s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform .4s ease, border-color .3s ease';
    });
  });

  console.log('%c👨‍💻 Anubhav Singh | Full-Stack Mobile Developer', 'color:#f5a623;font-size:16px;font-weight:bold;');
  console.log('%cKotlin · Spring Boot · AI/ML  |  github.com/ASRcodes', 'color:#7878a0;font-size:13px;');
});