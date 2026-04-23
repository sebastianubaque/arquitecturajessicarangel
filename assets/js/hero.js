// Hero: intro video + split reveal scroll (adaptado de ANIMACIONES/EJEMPLO.txt)
(function () {
  const introScreen = document.getElementById('intro-screen');
  const introVideo  = document.getElementById('intro-video');
  const heroText    = document.getElementById('heroText');

  const startPage = () => {
    introScreen.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    heroText.classList.add('animar');
  };

  document.body.classList.add('no-scroll');
  if (introVideo) {
    introVideo.addEventListener('ended', startPage, { once: true });
    introVideo.addEventListener('error', startPage, { once: true });
  }
  // Safety fallback
  setTimeout(() => {
    if (!introScreen.classList.contains('hidden')) startPage();
  }, 5000);

  // ---- Replay intro al volver desde otra página (bfcache) ----
  // No recarga el sitio: solo muestra la animación del logo y vuelve a ocultarla.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted || !introScreen || !introVideo) return;

    const hideIntroOnly = () => {
      introScreen.classList.add('hidden');
      document.body.classList.remove('no-scroll');
    };

    introScreen.classList.remove('hidden');
    document.body.classList.add('no-scroll');
    try {
      introVideo.currentTime = 0;
      const p = introVideo.play();
      if (p && typeof p.catch === 'function') p.catch(hideIntroOnly);
    } catch (_) {
      hideIntroOnly();
    }

    introVideo.addEventListener('ended', hideIntroOnly, { once: true });
    introVideo.addEventListener('error', hideIntroOnly, { once: true });
    setTimeout(() => {
      if (!introScreen.classList.contains('hidden')) hideIntroOnly();
    }, 5000);
  });

  // ---- Scroll-driven hero animation ----
  const heroLeft    = document.getElementById('heroLeft');
  const heroRight   = document.getElementById('heroRight');
  const heroFinalD  = document.getElementById('heroFinalD');
  const heroTopM    = document.getElementById('heroTopM');
  const heroBottomM = document.getElementById('heroBottomM');
  const heroFinalM  = document.getElementById('heroFinalM');

  let ticking = false;
  const update = () => {
    const scroll = window.scrollY;
    const max = window.innerHeight * 1.8;
    const progress = Math.min(scroll / max, 1);
    const move = progress * 100;

    if (heroLeft)  heroLeft.style.transform  = `translateX(${-100 + move}%)`;
    if (heroRight) heroRight.style.transform = `translateX(${100 - move}%)`;
    if (heroTopM)    heroTopM.style.transform    = `translateY(${-100 + move}%) scale(1.15)`;
    if (heroBottomM) heroBottomM.style.transform = `translateY(${100 - move}%) scale(1.15)`;

    const textProg = Math.min(progress * 1.3, 1);
    const ty = textProg * 260;
    heroText.style.transform = `translate(-50%, calc(-50% - ${ty}px))`;
    heroText.style.opacity = Math.max(1 - textProg, 0);
    heroText.style.visibility = textProg >= 0.95 ? 'hidden' : 'visible';

    const imgProg = Math.max((progress - 0.5) * 2, 0);
    const eased = imgProg < 0.5 ? 2*imgProg*imgProg : 1 - Math.pow(-2*imgProg+2, 2)/2;
    const op = Math.min(eased, 1);
    const scale = 1.15 - 0.15 * op;
    const blur = (1 - op) * 14;
    if (heroFinalD) {
      heroFinalD.style.opacity = op;
      heroFinalD.style.transform = `scale(${scale})`;
      heroFinalD.style.filter = `blur(${blur}px)`;
      if (op > 0.98) heroFinalD.classList.add('revealed');
    }
    if (heroFinalM) {
      heroFinalM.style.opacity = op;
      heroFinalM.style.transform = `scale(${scale})`;
      heroFinalM.style.filter = `blur(${blur}px)`;
      if (op > 0.98) heroFinalM.classList.add('revealed');
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();
