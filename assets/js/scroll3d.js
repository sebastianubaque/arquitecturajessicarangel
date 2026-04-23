// Scroll-driven frame sequence on canvas 2D (WEB3D.md pattern)
// Fondo blanco, scrub del frame según scrollProgress de la sección.
// CV1 = 720x1280 vertical (móvil), CV2 = 1280x716 horizontal (desktop). 121 frames c/u.

(function () {
  const FRAME_COUNT = 121;
  const pad = (n) => String(n).padStart(3, '0');

  window.initScroll3D = function (canvas, _videoDesktop, _videoMobile, section, opts) {
    if (!canvas || !section) return;
    const options = opts || {};
    const framesDir = {
      desktop: options.framesDesktop || 'assets/frames/cv2',
      mobile:  options.framesMobile  || 'assets/frames/cv1'
    };

    const ctx = canvas.getContext('2d', { alpha: false });
    const mqlMobile = window.matchMedia('(max-width: 768px)');

    // Loader
    const loader = document.createElement('div');
    loader.className = 'scroll3d-loader';
    loader.innerHTML = `
      <div class="scroll3d-loader__ring"></div>
      <div class="scroll3d-loader__text">Cargando experiencia</div>
    `;
    section.appendChild(loader);

    let currentSet = null; // 'desktop' | 'mobile'
    let frames = [];       // Image[]
    let loaded = 0;
    let currentFrame = -1;

    function loadFrames(which) {
      currentSet = which;
      frames = new Array(FRAME_COUNT);
      loaded = 0;
      const dir = which === 'mobile' ? framesDir.mobile : framesDir.desktop;
      let loaderHidden = false;

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.src = `${dir}/f_${pad(i + 1)}.webp`;
        img.onload = () => {
          loaded++;
          if (i === 0) {
            resize();
            drawFrame(0);
          }
          if (!loaderHidden && loaded >= Math.min(10, FRAME_COUNT)) {
            loaderHidden = true;
            if (loader) {
              loader.classList.add('done');
              setTimeout(() => loader.remove(), 600);
            }
          }
        };
        frames[i] = img;
      }
    }

    function drawFrame(idx) {
      const img = frames[idx];
      if (!img || !img.complete || !img.naturalWidth) return;
      const cw = canvas.width, ch = canvas.height;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cw, ch);
      const iw = img.naturalWidth, ih = img.naturalHeight;
      // Contain — encaja el frame completo sobre fondo blanco
      const scale = Math.min(cw / iw, ch / ih);
      const dw = iw * scale, dh = ih * scale;
      const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
      currentFrame = idx;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width  = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (currentFrame >= 0) drawFrame(currentFrame);
    }
    window.addEventListener('resize', resize);

    const textId = (options && options.textId) ? options.textId : 'scroll3dText';
    const textOverlay = document.getElementById(textId);

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const total = Math.max(1, section.offsetHeight - vh);
      const progress = Math.min(1, scrolled / total);
      const accel = Math.min(1, progress * 1.1);
      const idx = Math.min(FRAME_COUNT - 1, Math.floor(accel * FRAME_COUNT));
      if (idx !== currentFrame) {
        requestAnimationFrame(() => drawFrame(idx));
      }
      // Texto cristal aparece cuando el video termina (≥90% del scroll)
      if (textOverlay) {
        if (progress >= 0.9) textOverlay.classList.add('visible');
        else textOverlay.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    loadFrames(mqlMobile.matches ? 'mobile' : 'desktop');
    resize();
    onScroll();

    const onMq = () => {
      const target = mqlMobile.matches ? 'mobile' : 'desktop';
      if (target !== currentSet) {
        loadFrames(target);
        resize();
        onScroll();
      }
    };
    if (mqlMobile.addEventListener) mqlMobile.addEventListener('change', onMq);
    else if (mqlMobile.addListener) mqlMobile.addListener(onMq);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('scroll3dCanvas');
    const section = document.getElementById('scroll3d');
    if (canvas && section) {
      window.initScroll3D(canvas, null, null, section, {
        framesDesktop: 'assets/frames/cv2',
        framesMobile:  'assets/frames/cv1'
      });
    }
  });
})();
