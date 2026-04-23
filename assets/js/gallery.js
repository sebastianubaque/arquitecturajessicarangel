// ============================================================
// GALERÍA — Sistema de categorías con reveal animado
// ============================================================
(function () {
  const root = document.getElementById('gallery');
  if (!root || typeof PROJECTS === 'undefined') return;

  const isMobile = () => window.innerWidth <= 768;

  // Proyectos destacados (orden curado por relevancia)
  const FEATURED_DESKTOP = ['vmc', 'dic2', 'dic-colegio', 'proyecto-comercial-restaurante', 'vcm', 'v2p'];
  const FEATURED_MOBILE  = ['dic2', 'dic-colegio', 'proyecto-comercial-restaurante', 'vcm'];

  function getFeaturedList() {
    const ids = isMobile() ? FEATURED_MOBILE : FEATURED_DESKTOP;
    return ids.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean);
  }

  // Categorías únicas (preserva orden de aparición)
  const catOrder = [];
  PROJECTS.forEach(p => {
    if (!catOrder.includes(p.info.categoria)) catOrder.push(p.info.categoria);
  });
  const CATS = ['Todos', ...catOrder];

  // ── Filtros ─────────────────────────────────────────────
  const filtersEl = document.createElement('div');
  filtersEl.className = 'cat-filters';
  filtersEl.setAttribute('role', 'tablist');
  filtersEl.innerHTML = CATS.map((c, i) => {
    const count = c === 'Todos' ? PROJECTS.length
      : PROJECTS.filter(p => p.info.categoria === c).length;
    return `<button class="cat-filter${i === 0 ? ' active' : ''}" data-cat="${c}" role="tab" aria-selected="${i === 0}">
      ${c}<span class="cat-filter__count">${count}</span>
    </button>`;
  }).join('');

  const section = root.closest('.section') || root.parentElement;
  const header  = section.querySelector('.section__header');
  header ? header.after(filtersEl) : section.prepend(filtersEl);

  // ── Botón "Ver más" glass ────────────────────────────────
  const moreBtnWrap = document.createElement('div');
  moreBtnWrap.className = 'gallery-more';
  moreBtnWrap.innerHTML = `<button class="gallery-more__btn" aria-label="Ver más proyectos">
    <span>Ver más</span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  </button>`;
  root.after(moreBtnWrap);

  let currentList = PROJECTS;
  let currentCat = 'Todos';
  let expanded = false;

  // ── Render de tarjetas ───────────────────────────────────
  function renderCards(list, resetExpand) {
    if (resetExpand !== undefined) expanded = resetExpand;
    currentList = list;

    root.querySelectorAll('.card').forEach(c => c.classList.remove('card--in'));
    const DELAY = root.children.length ? 180 : 0;

    setTimeout(() => {
      root.innerHTML = '';
      root.classList.add('gallery--scroll-cards');

      // En "Todos" sin expandir: mostrar solo destacados (diferentes en desktop/mobile)
      // En filtros de categoría o expandido: mostrar la lista completa
      let visible;
      if (currentCat === 'Todos' && !expanded) {
        visible = getFeaturedList();
      } else {
        visible = list;
      }

      visible.forEach((p, i) => {
        const cover = projectAssetUrl(p, p.portada);
        const a = document.createElement('a');
        a.className = 'card';
        a.style.setProperty('--card-i', i);
        a.href = `proyecto.html?id=${p.id}`;
        a.setAttribute('aria-label', `Ver proyecto ${p.title}`);
        a.innerHTML = `
          <div class="card__inner">
            <img class="card__img" src="${cover}" alt="${p.title}" loading="${i < 3 ? 'eager' : 'lazy'}">
            <div class="card__arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/></svg>
            </div>
            <div class="card__glass">
              <div class="card__title">${p.title}</div>
              <div class="card__meta">${p.info.categoria} · ${p.info.ubicacion}</div>
            </div>
          </div>`;
        root.appendChild(a);
      });

      // Stagger reveal
      requestAnimationFrame(() => {
        root.querySelectorAll('.card').forEach((c, idx) => {
          setTimeout(() => c.classList.add('card--in'), idx * 55);
        });
      });

      // Mostrar "Ver más" solo en "Todos" sin expandir (y si hay más que los destacados)
      const featuredCount = getFeaturedList().length;
      const needsBtn = currentCat === 'Todos' && !expanded && list.length > featuredCount;
      moreBtnWrap.classList.toggle('visible', needsBtn);
    }, DELAY);
  }

  renderCards(PROJECTS, false);

  // ── Click "Ver más" ──────────────────────────────────────
  moreBtnWrap.addEventListener('click', () => {
    expanded = true;
    renderCards(currentList, true);
  });

  // Re-render al cambiar entre desktop/mobile (destacados son distintos)
  let lastIsMobile = isMobile();
  window.addEventListener('resize', () => {
    const nowMobile = isMobile();
    if (nowMobile !== lastIsMobile && currentCat === 'Todos' && !expanded) {
      lastIsMobile = nowMobile;
      renderCards(currentList, false);
    } else {
      lastIsMobile = nowMobile;
    }
  });

  // ── Click en filtro ──────────────────────────────────────
  filtersEl.addEventListener('click', e => {
    const btn = e.target.closest('.cat-filter');
    if (!btn) return;
    filtersEl.querySelectorAll('.cat-filter').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const cat = btn.dataset.cat;
    currentCat = cat;
    const filtered = cat === 'Todos' ? PROJECTS : PROJECTS.filter(p => p.info.categoria === cat);
    renderCards(filtered, false);
  });
})();


// ============================================================
// SERVICIOS — Glass Cards Grid con mini-form WhatsApp
// ============================================================
(function () {
  const root = document.getElementById('servicesList');
  if (!root || typeof SERVICES === 'undefined') return;

  // Íconos SVG únicos por servicio (stroke, Lucide-style)
  const ICONS = [
    // 01 Licencias
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="11" y2="17"/></svg>`,
    // 02 Diseño Arquitectónico
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><rect x="9" y="13" width="6" height="8"/><line x1="9" y1="13" x2="9" y2="21"/><line x1="15" y1="13" x2="15" y2="21"/></svg>`,
    // 03 Diseño Interior
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    // 04 Propiedad Horizontal
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"/><path d="M5 21V11"/><path d="M19 21V11"/><rect x="9" y="14" width="6" height="7"/></svg>`,
    // 05 Estudios de Suelos
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    // 06 Cálculos Estructurales
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
  ];

  root.className = 'svc-list';
  root.innerHTML = SERVICES.map((s, i) => {
    const isFeatured = i === 1; // Diseño Arquitectónico es la card destacada
    return `
    <article class="svc-item${isFeatured ? ' svc-item--featured' : ''}" style="--svc-i:${i}" role="button" tabindex="0" aria-expanded="false">
      <div class="svc-item__head">
        <span class="svc-item__num">${s.num}</span>
        <span class="svc-item__icon" aria-hidden="true">${ICONS[i] || ICONS[0]}</span>
      </div>
      <h3 class="svc-item__title">${s.title}</h3>
      <div class="svc-item__body" id="svc-body-${i}" role="region">
        <div>
          <p class="svc-item__desc">${s.desc}</p>
        </div>
      </div>
      <div class="svc-item__divider"></div>
      <div class="svc-item__foot">
        <button class="svc-item__solicitar" data-service="${s.title}">
          Cotizar
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
        </button>
        <span class="svc-item__toggle" aria-hidden="true">
          <svg class="svc-icon-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <svg class="svc-icon-minus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </span>
      </div>
    </article>`;
  }).join('');

  // IntersectionObserver para reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  root.querySelectorAll('.svc-item').forEach(el => io.observe(el));

  function toggleItem(item) {
    const isOpen = item.classList.contains('active');
    root.querySelectorAll('.svc-item.active').forEach(it => {
      it.classList.remove('active');
      it.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('active');
      item.setAttribute('aria-expanded', 'true');
    }
  }

  // Click en la card (salvo botón Solicitar)
  root.addEventListener('click', e => {
    const solicitar = e.target.closest('.svc-item__solicitar');
    if (solicitar) {
      e.stopPropagation();
      const name = solicitar.dataset.service;
      if (typeof window.openSvcModal === 'function') window.openSvcModal(name);
      return;
    }
    const item = e.target.closest('.svc-item');
    if (item) toggleItem(item);
  });

  // Teclado: Enter / Space
  root.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const item = e.target.closest('.svc-item');
    if (item) { e.preventDefault(); toggleItem(item); }
  });
})();
