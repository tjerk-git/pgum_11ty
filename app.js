const thebigboi = document.querySelector('.giant-title-boi');
let lastScrollY = 0;

// Scramble text on page load
window.addEventListener('load', () => {
    const text = thebigboi.innerText;
    const scrambled = text.split('').sort(() => Math.random() - 0.5).join('');
    thebigboi.innerText = scrambled;
    
    setTimeout(() => {
        thebigboi.innerText = 'POTLOODGUM';
    }, 2000);
});


window.addEventListener('scroll', () => {

    if (window.scrollY >= lastScrollY + 30) {
        const text = thebigboi.innerText;
        const scrambled = text.split('').sort(() => Math.random() - 0.5).join('');
        thebigboi.innerText = scrambled;
        
        setTimeout(() => {
            thebigboi.innerHTML = `POTLOODGUM`;
            lastScrollY = 0;
        }, 5000);

        lastScrollY = window.scrollY;
    }
});

thebigboi.addEventListener('click', () => {
    const text = thebigboi.innerText;
    if (text === 'POTLOODGUM') {
        thebigboi.innerText = 'GUMPOTLOOD';
    } else {
        thebigboi.innerText = 'POTLOODGUM';
    }
});

// Simple lightbox for photography images
window.addEventListener('DOMContentLoaded', () => {
    const containerImages = document.querySelectorAll('.images-container img, .photos img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');

    if (!containerImages.length || !lightbox || !lightboxImage || !lightboxClose) return;

    const openLightbox = (src, alt) => {
        lightboxImage.src = src;
        lightboxImage.alt = alt || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        lightboxImage.removeAttribute('src');
        document.body.style.overflow = '';
    };

    containerImages.forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(img.src, img.alt);
            }
        });
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'Open image in lightbox');
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
});
