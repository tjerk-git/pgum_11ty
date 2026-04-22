(function () {
  const PAGES = [
    { label: 'Writing/Teaching/Now',       shape: 'diamond',  href: '/now/' },
    { label: 'Websites',      shape: 'square',   href: '/websites/' },
    { label: 'Photography',   shape: 'circle',   href: '/photography/' },
    { label: 'Offline',       shape: 'rect',     href: '/offline/' },
    { label: 'Playlists',     shape: 'triangle', href: '/playlists/' },
    { label: 'Talk to Tjerk', shape: 'hexagon',  href: '/about/' },
  ];

  function shapeHTML(type) {
    if (type === 'triangle') return `<div style="width:0;height:0;border-left:16px solid transparent;border-right:16px solid transparent;border-bottom:28px solid #e05386;"></div>`;
    if (type === 'square')   return `<div style="width:28px;height:28px;background:#2f74b5;"></div>`;
    if (type === 'circle')   return `<div style="width:30px;height:30px;border-radius:50%;background:#ff79a4;"></div>`;
    if (type === 'rect')     return `<div style="width:32px;height:18px;background:#000;"></div>`;
    if (type === 'diamond')  return `<div style="width:20px;height:20px;background:#e05386;transform:rotate(45deg);"></div>`;
    if (type === 'hexagon')  return `<svg width="30" height="34" viewBox="0 0 40 46" fill="none"><polygon points="20,2 38,12 38,34 20,44 2,34 2,12" stroke="#343131" stroke-width="3" fill="none"/></svg>`;
    return '';
  }

  const currentPath = location.pathname.replace(/\/$/, '') + '/';

  const overlay = document.createElement('div');
  overlay.id = 'pg-menu-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="pg-overlay-wordmark">POTLOODGUM</div>
    <ul class="pg-overlay-nav">
      ${PAGES.map(p => {
        const isActive = currentPath === p.href || location.pathname === p.href;
        return `
          <li>
            <a class="pg-overlay-item${isActive ? ' active' : ''}" href="${p.href}">
              <span class="pg-overlay-shape">${shapeHTML(p.shape)}</span>
              <span class="pg-overlay-label">${p.label}</span>
            </a>
          </li>`;
      }).join('')}
    </ul>
  `;

  const btn = document.createElement('button');
  btn.id = 'pg-menu-btn';
  btn.setAttribute('aria-label', 'Toggle menu');
  btn.innerHTML = `<img src="/images/Potloodgum.svg" alt="Menu"><span class="pg-btn-label">menu</span>`;

  let open = false;
  function toggle() {
    open = !open;
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    const img = btn.querySelector('img');
    img.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
    btn.querySelector('.pg-btn-label').textContent = open ? 'close' : 'menu';
  }

  btn.addEventListener('click', toggle);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) toggle(); });

  window.addEventListener('scroll', () => {
    btn.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  document.body.appendChild(overlay);
  document.body.appendChild(btn);
})();
