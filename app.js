const menuButton = document.querySelector('#menu-button');
const closeButton = document.querySelector('#close-menu');
const menuOverlay = document.querySelector('.menu-overlay');

menuButton.addEventListener('click', (e) => {
    e.preventDefault();
    menuOverlay.classList.add('open');
});

closeButton.addEventListener('click', () => {
    menuOverlay.classList.remove('open');
});

// if you click on a link, close the menu
const menuLinks = document.querySelectorAll('.menu-overlay nav li a');
menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
        menuOverlay.classList.remove('open');
    });
});