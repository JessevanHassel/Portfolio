document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const mainMenu = document.getElementById('main-menu');
    const menuContainer = document.getElementById('menu-container');
    const hamburgerButtons = document.querySelectorAll('.hamburger_menu_button');
    const menuLinks = document.querySelectorAll('.main_menu_link');

    // Main Menu Animation
    Array.from(menuLinks).forEach((item, index) => {
        item.onmouseover = () => {
            menuContainer.dataset.activeIndex = index;
        }
    });

    // Hamburger Menu Toggle
    function toggleMenuState() {
        const isMenuVisible = mainMenu.classList.contains('is-visible');

        if (isMenuVisible) {
            mainMenu.classList.remove('is-visible');
            document.body.classList.remove('no-scroll');

            hamburgerButtons.forEach(button => {
                button.classList.remove('is-open');
                button.classList.add('is-closed');
            });
        } else {
            mainMenu.classList.add('is-visible');
            document.body.classList.add('no-scroll');

            hamburgerButtons.forEach(button => {
                button.classList.remove('is-closed');
                button.classList.add('is-open');
            });
        }
    }

    hamburgerButtons.forEach(button => {
        button.addEventListener('click', toggleMenuState);
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainMenu.classList.remove('is-visible');
            hamburgerButtons.forEach(button => {
                button.classList.remove('is-open');
                button.classList.add('is-closed');
            });
        });
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetURL = link.href;

            mainMenu.classList.remove('is-visible');
            hamburgerButtons.forEach(button => {
                button.classList.remove('is-open');
                button.classList.add('is-closed');
            });

            setTimeout(() => {
                window.location.href = targetURL;
            }, 800);
        });
    });
});