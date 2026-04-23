// Página de detalle de proyecto
(function () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const project = (typeof PROJECTS !== 'undefined') ? PROJECTS.find(p => p.id === id) : null;

  if (!project) {
    document.getElementById('projectMain').innerHTML = `
      <section class="project-hero">
        <a class="project-hero__back" href="index.html#proyectos">← Volver</a>
        <h1>Proyecto no encontrado</h1>
        <p class="project-hero__desc">Elige uno desde la galería de proyectos.</p>
      </section>`;
    return;
  }

  document.title = `${project.title} — Jessica Viviana Rangel E.`;
  document.getElementById('pTitle').textContent = project.title;
  document.getElementById('pCategoria').textContent = project.info.categoria;
  document.getElementById('pUbicacion').textContent = project.info.ubicacion;
  document.getElementById('pDimensiones').textContent = project.info.dimensiones;
  document.getElementById('pDesc').textContent = project.info.descripcion;

  // Elegir imágenes según viewport (matchMedia persistente)
  const mql = window.matchMedia('(max-width: 768px)');
  const chooseSet = () => (mql.matches ? project.vertical : project.horizontal);
  let images = chooseSet();

  const gallery = document.getElementById('projectGallery');

  // ── Línea de tiempo (proyecto trabajos-empresa) ─────────────
  function renderTimeline() {
    // Ocultar el meta de dimensiones si está vacío
    if (!project.info.dimensiones) {
      const dimItem = document.getElementById('pDimensiones')?.closest('.project-hero__meta-item');
      if (dimItem) dimItem.style.display = 'none';
    }

    const wrap = document.createElement('div');
    wrap.className = 'tl-wrap';

    // Línea de fondo + línea de progreso
    wrap.innerHTML = `
      <div class="tl-line" aria-hidden="true">
        <div class="tl-line__fill" id="tlFill"></div>
      </div>`;

    project.timeline.forEach((group, gi) => {
      const isRight = gi % 2 === 0; // alterna: par→imágenes a la derecha, impar→izquierda
      const entry = document.createElement('div');
      entry.className = `tl-entry tl-entry--${isRight ? 'right' : 'left'}`;
      entry.style.setProperty('--tl-i', gi);

      const imgsHtml = group.imgs.map(img =>
        `<img src="${projectAssetUrl(project, img)}" alt="" loading="lazy" class="tl-img">`
      ).join('');

      entry.innerHTML = `
        <div class="tl-entry__date-col">
          <span class="tl-entry__fecha">${group.fecha}</span>
        </div>
        <div class="tl-entry__node">
          <div class="tl-entry__dot"></div>
        </div>
        <div class="tl-entry__imgs-col">
          <div class="tl-entry__grid">${imgsHtml}</div>
        </div>`;
      wrap.appendChild(entry);
    });

    gallery.appendChild(wrap);

    // Reveal con IntersectionObserver
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('tl-entry--in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    wrap.querySelectorAll('.tl-entry').forEach(el => io.observe(el));

    // Progreso de la línea con scroll
    const fill = document.getElementById('tlFill');
    function updateFill() {
      const rect = wrap.getBoundingClientRect();
      const wrapTop = wrap.offsetTop;
      const wrapH = wrap.offsetHeight;
      const scrolled = window.scrollY - wrapTop + window.innerHeight * 0.6;
      const pct = Math.max(0, Math.min(100, (scrolled / wrapH) * 100));
      fill.style.height = pct + '%';
    }
    window.addEventListener('scroll', updateFill, { passive: true });
    updateFill();
  }

  function renderSlides() {
    gallery.innerHTML = '';
    images.forEach((rel, i) => {
      const slide = document.createElement('div');
      slide.className = 'project-slide';
      slide.innerHTML = `
        <div class="project-slide__index">${String(i + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}</div>
        <img class="project-slide__media" src="${projectAssetUrl(project, rel)}" alt="${project.title} — imagen ${i + 1}" loading="${i < 2 ? 'eager' : 'lazy'}">
      `;
      gallery.appendChild(slide);

      // Caso especial: en Cabañas, insertar bloque 3D con CV3 después de la 1ra imagen
      if (project.id === 'cabanas' && i === 0) {
        const v3d = document.createElement('section');
        v3d.className = 'project-3d';
        v3d.id = 'project3d';
        v3d.innerHTML = `
          <div class="project-3d__sticky">
            <canvas class="scroll3d__canvas" id="project3dCanvas"></canvas>
            <div class="scroll3d__text" id="project3dText">
              <div class="scroll3d__glass-panel">
                <span class="eyebrow">Cabañas en movimiento</span>
                <h2>Luz, madera,<br>paisaje.</h2>
              </div>
            </div>
          </div>`;
        gallery.appendChild(v3d);
      }
    });

    // Observer para fade-in de cada slide
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.35 });
    gallery.querySelectorAll('.project-slide').forEach(s => io.observe(s));

    // Si insertamos el bloque 3D de Cabañas, inicializar con frames de cv3
    const p3dCanvas = document.getElementById('project3dCanvas');
    const p3dSection = document.getElementById('project3d');
    if (p3dCanvas && p3dSection && typeof window.initScroll3D === 'function') {
      window.initScroll3D(p3dCanvas, null, null, p3dSection, {
        framesDesktop: 'assets/frames/cv3',
        framesMobile:  'assets/frames/cv3',
        textId: 'project3dText'
      });
    }
  }

  if (project.timeline) {
    renderTimeline();
  } else {
    // Re-render en cambio de viewport (desktop↔móvil)
    let lastMatches = mql.matches;
    mql.addEventListener?.('change', () => {
      if (mql.matches !== lastMatches) {
        lastMatches = mql.matches;
        images = chooseSet();
        renderSlides();
      }
    });
    renderSlides();
  }

  // PDF
  const pdfBtn = document.getElementById('pdfBtn');
  const modalPdf = document.getElementById('modalPdf');
  const pdfContent = document.getElementById('pdfContent');
  const modalTitle = document.getElementById('modalPdfTitle');

  const pdfs = project.pdfs ? project.pdfs : (project.pdf ? [project.pdf] : []);
  if (pdfs.length > 0 && pdfBtn) {
    pdfBtn.style.display = 'inline-flex';
    pdfBtn.addEventListener('click', () => {
      modalTitle.textContent = `Planimetría — ${project.title}`;
      if (pdfs.length === 1) {
        pdfContent.innerHTML = `<iframe src="${projectAssetUrl(project, pdfs[0])}" title="${project.title}"></iframe>`;
      } else {
        pdfContent.innerHTML = `
          <div class="diploma-list">
            ${pdfs.map((p, i) => `
              <div class="diploma-item">
                <div class="diploma-item__title">Lámina ${i + 1} — ${p.split('/').pop().replace('.pdf','')}</div>
                <button class="diploma-item__link" data-pdf="${projectAssetUrl(project, p)}">Ver</button>
              </div>`).join('')}
          </div>
          <div id="pdfViewer" style="margin-top:24px;display:none;">
            <iframe id="pdfFrame" style="width:100%;height:70vh;border:0;border-radius:4px;" title="Planimetría"></iframe>
          </div>`;
        pdfContent.addEventListener('click', (e) => {
          const b = e.target.closest('[data-pdf]');
          if (!b) return;
          const viewer = document.getElementById('pdfViewer');
          const frame = document.getElementById('pdfFrame');
          frame.src = b.dataset.pdf;
          viewer.style.display = 'block';
          viewer.scrollIntoView({ behavior: 'smooth' });
        });
      }
      modalPdf.classList.add('open');
      document.body.classList.add('no-scroll');
    });
  }

  document.querySelectorAll('[data-modal-close]').forEach(b => {
    b.addEventListener('click', () => {
      const m = b.closest('.modal');
      m?.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
  modalPdf?.addEventListener('click', (e) => {
    if (e.target === modalPdf) { modalPdf.classList.remove('open'); document.body.classList.remove('no-scroll'); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
      document.body.classList.remove('no-scroll');
    }
  });

  // Nav entre proyectos
  const idx = PROJECTS.findIndex(p => p.id === project.id);
  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;
  const navEl = document.getElementById('projectNav');
  navEl.innerHTML = `
    ${prev ? `
      <a href="proyecto.html?id=${prev.id}">
        <span class="eyebrow">← Anterior</span>
        <h4>${prev.title}</h4>
      </a>` : `<div class="project-nav__empty"></div>`}
    ${next ? `
      <a class="project-nav__next" href="proyecto.html?id=${next.id}">
        <span class="eyebrow">Siguiente →</span>
        <h4>${next.title}</h4>
      </a>` : `<div class="project-nav__empty"></div>`}
  `;

  // ---- Navbar + Lenis (versión light para esta página) ----
  const navbar = document.getElementById('navbar');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastY && y > 120) navbar.classList.add('hidden'); else navbar.classList.remove('hidden');
    lastY = y;
  }, { passive: true });

  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');
  burger?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
  });

  if (typeof Lenis !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
})();
