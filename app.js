const thebigboi = document.querySelector('.giant-title-boi');
let lastScrollY = 0;
let mouseTimeout;
let scrollTimeout;
let isShuffling = false;

const shuffleText = () => {
    if (isShuffling) return;
    isShuffling = true;
    
    const text = thebigboi.innerText;
    const scrambled = text.split('').sort(() => Math.random() - 0.5).join('');
    thebigboi.innerText = scrambled;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        thebigboi.innerHTML = 'POTLOODGUM';
        isShuffling = false;
    }, 500);
};

// Scramble text on page load
window.addEventListener('load', () => {
    const text = thebigboi.innerText;
    const scrambled = text.split('').sort(() => Math.random() - 0.5).join('');
    thebigboi.innerText = scrambled;
    
    setTimeout(() => {
        thebigboi.innerText = 'POTLOODGUM';
    }, 2000);
});

// Shuffle on mouse movement
window.addEventListener('mousemove', () => {
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        shuffleText();
    }, 100);
});

// Shuffle on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY >= lastScrollY + 30) {
        shuffleText();
        lastScrollY = window.scrollY;
    }
    
    // Handle sticky header
    const header = document.querySelector('.logo-container');
    if (window.scrollY > 100) {
        header.classList.add('sticky-small');
    } else {
        header.classList.remove('sticky-small');
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

// Simple lightbox for photography images (excluding gallery images which use Lightbox2)
window.addEventListener('DOMContentLoaded', () => {
    const containerImages = document.querySelectorAll('.images-container img:not(.gallery img), .photos img:not(.gallery img)');
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
