(() => {
  const COLORS = ['#29d3e6', '#f5c82e', '#a65bf0', '#4cc76a', '#ee4b5a', '#4a7cf0', '#f28a30'];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- filters + grid ---------- */
  const state = { type: 'All', tag: 'All' };
  const types = [...new Set(PROJECTS.map(p => p.type))];
  const tags = [...new Set(PROJECTS.flatMap(p => p.tags))];
  const filterBox = document.getElementById('filters');
  const grid = document.getElementById('project-grid');

  function renderFilters() {
    const group = (label, key, vals) =>
      `<div class="filter-group" role="group" aria-label="${label}"><span class="filter-label">${label}</span>` +
      ['All', ...vals].map(v => `<button type="button" class="chip" data-group="${key}" data-value="${esc(v)}" aria-pressed="${state[key] === v}">${esc(v)}</button>`).join('') +
      '</div>';
    filterBox.innerHTML = (types.length > 1 ? group('Type', 'type', types) : '') + group('Discipline', 'tag', tags);
  }

  function renderGrid() {
    const list = PROJECTS.filter(p => (state.type === 'All' || p.type === state.type) && (state.tag === 'All' || p.tags.includes(state.tag)));
    grid.innerHTML = list.map(p => {
      const initials = p.title.split(' ').filter(w => /^[A-Za-z]/.test(w)).slice(0, 2).map(w => w[0]).join('');
      const thumb = p.image
        ? `<img class="thumb" src="${esc(p.image)}" alt="" loading="lazy">`
        : `<div class="thumb-fallback" style="--c:${p.color}"><span>${esc(initials)}</span></div>`;
      return `<div class="col-md-6 col-xl-4"><button type="button" class="project-card" data-id="${p.id}" style="--c:${p.color}">
        ${thumb}<div class="card-text"><h3>${esc(p.title)}</h3><div class="card-role">${esc(p.role)}, ${esc(p.org)}</div>
        <p class="card-sum">${esc(p.summary)}</p>${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div></button></div>`;
    }).join('') || '<p class="section-lead">No projects match these filters yet.</p>';
  }

  filterBox.addEventListener('click', e => {
    const b = e.target.closest('.chip');
    if (!b) return;
    const { group, value } = b.dataset;
    state[group] = (state[group] === value) ? 'All' : value; // clicking the active filter again clears it
    renderFilters();
    renderGrid();
  });

  /* ---------- case study modal ---------- */
  const modalEl = document.getElementById('projectModal');
  const modal = new bootstrap.Modal(modalEl);

  // Turn a YouTube link (watch, youtu.be, or embed) into a responsive embedded player
  function videoEmbed(url) {
    if (!url) return '';
    const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
    if (!m) return '';
    return `<div class="ratio ratio-16x9 cs-media"><iframe src="https://www.youtube.com/embed/${m[1]}?rel=0" title="Project video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
  }
  // Empty the modal on close so a playing video stops
  modalEl.addEventListener('hidden.bs.modal', () => { modalEl.querySelector('.modal-body').innerHTML = ''; });

  function openProject(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;
    const tech = Array.isArray(p.technology) ? p.technology.join(', ') : p.technology;
    const facts = [['Role', p.role], ['Organization', p.org], ['Technology', tech]]
      .filter(f => f[1]).map(f => `<div><dt>${f[0]}</dt><dd>${esc(f[1])}</dd></div>`).join('');
    modalEl.querySelector('.modal-title').textContent = p.title;
    modalEl.querySelector('.modal-body').innerHTML =
      videoEmbed(p.video) +
      (p.image ? `<img class="cs-media" src="${esc(p.image)}" alt="">` : '') +
      `<dl class="cs-facts">${facts}</dl>` +
      `<div class="cs-body">${[].concat(p.description || []).map(t => `<p>${esc(t)}</p>`).join('')}</div>` +
      (p.links && p.links.length ? `<div class="d-flex flex-wrap gap-2">${p.links.map(l => `<a class="btn btn-resume" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')}</div>` : '');
    modal.show();
  }
  grid.addEventListener('click', e => {
    const card = e.target.closest('.project-card');
    if (card) openProject(card.dataset.id);
  });

  /* ---------- falling block ---------- */
  const piece = document.getElementById('piece');
  const pieceRot = document.getElementById('piece-rot');
  const anchor = document.getElementById('piece-anchor');
  const stack = document.getElementById('stack');

  // T-piece: three across the top, one below the middle
  [[0, 0], [0, 1], [0, 2], [1, 1]].forEach(([r, c]) => {
    const d = document.createElement('div');
    d.className = 'cell';
    d.style.cssText = `grid-row:${r + 1};grid-column:${c + 1};--c:${COLORS[2]}`;
    pieceRot.appendChild(d);
  });

  // The placed blocks ("x" = filled). The T-piece fits the gap at columns 4-6 (row 1) and column 5 (row 2).
  const rows = ['xx......xx', 'xxxx...xxx', 'xxxxx.xxxx'];
  rows.forEach((row, r) => [...row].forEach((ch, c) => {
    const d = document.createElement('div');
    d.className = 'cell' + (ch === 'x' ? '' : ' empty');
    if (ch === 'x') d.style.setProperty('--c', COLORS[(r * 3 + c * 2) % 7]);
    stack.appendChild(d);
  }));

  let start = { x: 0, y: 0 }, end = { x: 0, y: 0 }, maxScroll = 1;

  function measure() {
    const sy = window.scrollY;
    const a = anchor.getBoundingClientRect();
    // measure the first cell, not #stack itself: the container is full width and the cells are centered inside it
    const first = stack.firstElementChild;
    const s = first.getBoundingClientRect();
    const cell = first.offsetWidth;
    maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    start = { x: a.left, y: a.top + sy };
    // where the slot sits in the viewport once scrolled all the way down
    end = { x: s.left + 4 * cell, y: s.top + sy + cell - maxScroll };
    update();
  }

  function update() {
    const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    const x = start.x + (end.x - start.x) * p;
    const y = start.y + (end.y - start.y) * p;
    piece.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  // page height changes when filters change the grid
  new ResizeObserver(measure).observe(document.body);

  renderFilters();
  renderGrid();
  measure();
})();
