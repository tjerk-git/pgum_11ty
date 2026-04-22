(function () {
  const colors = ['#e05386', '#ff79a4', '#2f74b5', '#f178a4'];

  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const wipe = document.createElement('div');
  wipe.id = 'pg-wipe';
  document.body.appendChild(wipe);

  const style = document.createElement('style');
  style.textContent = `
    #pg-wipe {
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      will-change: transform;
    }
    @keyframes pg-wipe-in {
      from { transform: translateY(100%); }
      to   { transform: translateY(0%); }
    }
    @keyframes pg-wipe-out {
      from { transform: translateY(0%); }
      to   { transform: translateY(-100%); }
    }
  `;
  document.head.appendChild(style);

  // On load: if a color is stored, cover the screen instantly then slide out
  const storedColor = sessionStorage.getItem('pg-wipe-color');
  if (storedColor) {
    sessionStorage.removeItem('pg-wipe-color');
    wipe.style.background = storedColor;
    wipe.style.transform = 'translateY(0%)';

    function startWipeOut() {
      wipe.style.animation = 'pg-wipe-out 0.45s cubic-bezier(0.77, 0, 0.175, 1) forwards';
    }

    function waitForImages() {
      const imgs = Array.from(document.querySelectorAll('img'));
      return Promise.all(imgs.map(img =>
        img.complete ? Promise.resolve() : img.decode().catch(() => {})
      ));
    }

    waitForImages().then(() => {
      requestAnimationFrame(() => requestAnimationFrame(startWipeOut));
    });
  } else {
    wipe.style.transform = 'translateY(100%)';
  }

  // On link click: pick color, store it, animate in, then navigate
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a || !a.href) return;
    if (a.target === '_blank') return;
    if (a.hostname !== location.hostname) return;
    if (a.href === location.href) return;

    e.preventDefault();
    const dest = a.href;
    const color = randomColor();

    sessionStorage.setItem('pg-wipe-color', color);
    wipe.style.background = color;
    wipe.style.animation = 'pg-wipe-in 0.35s cubic-bezier(0.77, 0, 0.175, 1) forwards';

    wipe.addEventListener('animationend', function go() {
      wipe.removeEventListener('animationend', go);
      window.location.href = dest;
    });
  });
})();
