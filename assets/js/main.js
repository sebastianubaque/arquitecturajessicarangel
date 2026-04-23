// Bootstrap: Lenis, navbar, FAB tooltip, form → WhatsApp, mini-modal servicio, reveal
(function () {
  // ---- Año footer ----
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---- Lenis smooth scroll ----
  if (typeof Lenis !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    window.lenis = lenis;

    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1 && document.querySelector(id)) {
          e.preventDefault();
          lenis.scrollTo(id, { offset: -60 });
        }
      });
    });
  }

  // ---- Navbar: auto-hide ----
  const navbar = document.getElementById('navbar');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastY && y > 120) navbar.classList.add('hidden');
    else navbar.classList.remove('hidden');
    lastY = y;
  }, { passive: true });

  // Burger móvil
  const burger = document.getElementById('burger');
  const links  = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Reveal on scroll ----
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

  // ---- FAB tooltip al llegar a Servicios ----
  const tooltip   = document.getElementById('fabTooltip');
  const closeTt   = document.getElementById('closeTooltip');
  const services  = document.getElementById('servicios');
  const dismissed = sessionStorage.getItem('waTooltipDismissed') === '1';

  if (tooltip && services && !dismissed) {
    const ttIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          tooltip.classList.add('show');
          setTimeout(() => tooltip.classList.remove('show'), 9000);
          ttIO.disconnect();
        }
      });
    }, { threshold: 0.2 });
    ttIO.observe(services);
  }
  if (closeTt) {
    closeTt.addEventListener('click', () => {
      tooltip.classList.remove('show');
      sessionStorage.setItem('waTooltipDismissed', '1');
    });
  }

  // ---- Formulario de contacto → WhatsApp ----
  const form = document.getElementById('contactForm');
  if (form) {
    const waNumber = '573112104849';
    const setErr = (id, msg) => {
      const el = document.getElementById(id);
      const field = el?.closest('.field');
      const errEl = field?.querySelector('.field__error');
      if (!msg) { field?.classList.remove('field--error'); if (errEl) errEl.textContent = ''; }
      else       { field?.classList.add('field--error');    if (errEl) errEl.textContent = msg; }
    };

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name    = form.fName.value.trim();
      const phone   = form.fPhone.value.trim();
      const email   = form.fEmail.value.trim();
      const service = form.fService.value;
      const msg     = form.fMsg.value.trim();

      let ok = true;
      if (!name)                  { setErr('fName',    'Ingresa tu nombre');       ok = false; } else setErr('fName');
      if (!phone || phone.length < 7) { setErr('fPhone', 'Teléfono inválido');    ok = false; } else setErr('fPhone');
      if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setErr('fEmail', 'Email inválido'); ok = false; } else setErr('fEmail');
      if (!service)               { setErr('fService', 'Selecciona un servicio'); ok = false; } else setErr('fService');
      if (!msg || msg.length < 5) { setErr('fMsg',     'Cuéntame un poco más');   ok = false; } else setErr('fMsg');

      if (!ok) { form.querySelector('.field--error input, .field--error select, .field--error textarea')?.focus(); return; }

      const body = [
        `Hola Jessica, soy *${name}*.`,
        `📱 Teléfono: ${phone}`,
        email ? `✉️ Email: ${email}` : null,
        `🏛️ Servicio de interés: *${service}*`,
        ``,
        `💬 ${msg}`
      ].filter(Boolean).join('\n');

      window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
    });
  }

  // ---- Mini-modal de Servicios → WhatsApp ────────────────
  const svcModal    = document.getElementById('svcMiniModal');
  const svcLabel    = document.getElementById('svcMiniLabel');
  const svcClose    = document.getElementById('svcMiniClose');
  const svcBackdrop = document.getElementById('svcMiniBackdrop');
  const svcForm     = document.getElementById('svcMiniForm');

  window.openSvcModal = function (serviceName) {
    if (!svcModal) return;
    if (svcLabel) svcLabel.textContent = serviceName;
    svcModal.classList.add('open');
    document.body.classList.add('no-scroll');
    setTimeout(() => svcModal.querySelector('input')?.focus(), 120);
  };

  function closeSvcModal() {
    svcModal?.classList.remove('open');
    document.body.classList.remove('no-scroll');
    if (svcForm) svcForm.reset();
  }

  svcClose?.addEventListener('click', closeSvcModal);
  svcBackdrop?.addEventListener('click', closeSvcModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSvcModal(); });

  if (svcForm) {
    svcForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = svcForm.querySelector('[name="svcName"]').value.trim();
      const project = svcForm.querySelector('[name="svcProject"]').value.trim();
      const service = svcLabel?.textContent || '';
      if (!name || !project) return;
      const body = `Hola Jessica! 👋\n\nMe interesa el servicio de *${service}*.\n\nSoy *${name}*.\n\n💬 ${project}`;
      window.open(`https://wa.me/573112104849?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
      closeSvcModal();
    });
  }

  // ── Cerrar modales genéricos con Escape ─────────────────
  document.querySelectorAll('[data-modal-close]').forEach(b => {
    b.addEventListener('click', () => {
      const m = b.closest('.modal');
      if (m) { m.classList.remove('open'); document.body.classList.remove('no-scroll'); }
    });
  });
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) { m.classList.remove('open'); document.body.classList.remove('no-scroll'); }
    });
  });
})();

// ---- Popup Venta ----
// ---- Popup Venta ----
(function () {
  const popup    = document.getElementById('ventaPopup');
  const slider   = document.getElementById('ventaSlider');
  const dots     = Array.from(document.querySelectorAll('.venta-dot'));
  const prevBtn  = document.getElementById('ventaPrev');
  const nextBtn  = document.getElementById('ventaNext');
  const closeBtn = document.getElementById('ventaClose');
  const backdrop = document.getElementById('ventaBackdrop');
  const next1Btn = document.getElementById('ventaNextSlide1');
  const sentinel = document.getElementById('ventaSentinel');
  if (!popup || !slider) return;

  const slides = Array.from(slider.querySelectorAll('.venta-slide'));
  const LAST = slides.length - 1;
  let current = 0;

  function goTo(idx) {
    current = Math.max(0, Math.min(LAST, idx));
    slides.forEach((s, i) => s.classList.toggle('venta-slide--active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    popup.setAttribute('data-slide', current);
    if (prevBtn) { prevBtn.style.opacity = current === 0 ? '0' : '1'; prevBtn.style.pointerEvents = current === 0 ? 'none' : ''; }
    if (nextBtn) { nextBtn.style.opacity = current === LAST ? '0' : '1'; nextBtn.style.pointerEvents = current === LAST ? 'none' : ''; }
  }

  function openPopup() {
    popup.classList.add('open');
    document.body.classList.add('no-scroll');
    goTo(0);
  }

  function closePopup() {
    if (current !== LAST) return;
    popup.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  next1Btn?.addEventListener('click', () => goTo(1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  closeBtn?.addEventListener('click', closePopup);
  backdrop?.addEventListener('click', closePopup);
  document.addEventListener('keydown', e => {
    if (!popup.classList.contains('open')) return;
    if (e.key === 'Escape') closePopup();
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1);
  });

  // Swipe táctil
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 48) dx < 0 ? goTo(current + 1) : goTo(current - 1);
  });

  // Trigger: al llegar al sentinel.
  // Mostrar solo 1 vez: al refrescar (F5) vuelve a aparecer; al regresar desde un
  // proyecto (back_forward) NO vuelve a aparecer.
  const navEntry = performance.getEntriesByType('navigation')[0];
  const isReload = navEntry && navEntry.type === 'reload';
  if (isReload) sessionStorage.removeItem('ventaPopupShown');

  const alreadyShown = sessionStorage.getItem('ventaPopupShown') === '1';

  if (sentinel && !alreadyShown) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(openPopup, 500);
          sessionStorage.setItem('ventaPopupShown', '1');
          io.disconnect();
        }
      });
    }, { threshold: 0.8 });
    io.observe(sentinel);
  }

  goTo(0);
})();
