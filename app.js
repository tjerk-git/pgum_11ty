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
