document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const sliderContainer = document.getElementById('slider-container');
    const sliderItems = document.querySelectorAll('.project_slider_item');
    const contentItems = document.querySelectorAll('.project_content_contain'); // Zelfde hier: overweeg class
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const paginationContainer = document.getElementById('pagination-container');

    // States
    let currentIndex = 0;
    const totalItems = sliderItems.length;

    // Mapping Logic
    const slideContentMap = [];
    let slideCounter = 0;

    contentItems.forEach((item) => {
        if (slideCounter < totalItems) {
            slideContentMap[slideCounter] = item;
            slideCounter++;
        }

        if (item.classList.contains('is-keep-content') && slideCounter < totalItems) {
            slideContentMap[slideCounter] = item;
            slideCounter++;
        }
    });
    // -----------------------------

    // Initialize Pagination
    sliderItems.forEach((_, index) => {
        const paginationDot = document.createElement('div');
        paginationDot.classList.add('slider_pagination_dot');
        if (index === 0) paginationDot.classList.add('is-active');

        // Clickable Pagination
        paginationDot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });

        paginationContainer.appendChild(paginationDot);
    });

    const paginationDots = document.querySelectorAll('.slider_pagination_dot');

    // Update Slider
    function updateSlider() {
        const itemWidth = sliderItems[0].offsetWidth;
        const style = window.getComputedStyle(sliderContainer);
        const gap = parseFloat(style.gap) || 0;

        const moveAmount = (itemWidth + gap) * currentIndex;
        sliderContainer.style.transform = `translateX(-${moveAmount}px)`;

        const activeContentItem = slideContentMap[currentIndex];

        contentItems.forEach((item) => {
            if (item === activeContentItem) {
                item.classList.add('is-active');
            } else {
                item.classList.remove('is-active');
            }
        });
        // -----------------------------------------------------

        paginationDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('is-active');
            } else {
                dot.classList.remove('is-active');
            }
        });

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalItems - 1;
    }

    // Event Listeners
    nextButton.addEventListener('click', () => {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Responsive Fix
    window.addEventListener('resize', () => {
        updateSlider();
    });

    // Start Slider
    updateSlider();

    // Touch Swipe Logic
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let animationID;
    const threshold = 50;

    // Event Listeners
    sliderContainer.addEventListener('touchstart', touchStart);
    sliderContainer.addEventListener('touchend', touchEnd);
    sliderContainer.addEventListener('touchmove', touchMove);

    // Touch Start
    function touchStart(event) {
        isDragging = true;
        startPosition = getPositionX(event);

        const itemWidth = sliderItems[0].offsetWidth;
        const style = window.getComputedStyle(sliderContainer);
        const gap = parseFloat(style.gap) || 0;
        previousTranslate = -(itemWidth + gap) * currentIndex;

        animationID = requestAnimationFrame(animation);

        sliderContainer.style.transition = 'none';
    }

    // Touch Move
    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const currentMove = currentPosition - startPosition;
            currentTranslate = previousTranslate + currentMove;
        }
    }

    // Touch End
    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - previousTranslate;

        if (movedBy < -threshold && currentIndex < totalItems - 1) {
            currentIndex += 1;
        }

        if (movedBy > threshold && currentIndex > 0) {
            currentIndex -= 1;
        }

        sliderContainer.style.transition = '';

        updateSlider();
    }

    // Help Function
    function animation() {
        if (isDragging) {
            sliderContainer.style.transform = `translateX(${currentTranslate}px)`;
            requestAnimationFrame(animation);
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
});