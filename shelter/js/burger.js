export function initBurger() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.header-nav');
    const menuLinks = document.querySelectorAll('.header-nav a');
    const overlay = document.querySelector('.overlay');
    const logo = document.querySelector('.logo');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            menu.classList.remove('open');
            overlay.classList.remove('open');
            logo.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        menu.classList.toggle('open');
        overlay.classList.toggle('open');
        logo.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
        console.log('Click');
    });
    overlay.addEventListener('click', () => {
        overlay.classList.remove('open');
        burger.classList.remove('open');
        menu.classList.remove('open');
        logo.classList.remove('open');
        document.body.classList.remove('no-scroll');
    });
}