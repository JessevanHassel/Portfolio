document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const container = document.querySelector('.visual_gallery_layout');
    const images = Array.from(container.querySelectorAll('.visual_gallery_image'));

    // Calculate Layout
    function renderMasonry() {
        const containerWidth = document.querySelector('.visual_gallery_contain').offsetWidth;
        const numCols = containerWidth < 640 ? 1 : 3;

        container.innerHTML = '';

        const columns = [];
        for (let i = 0; i < numCols; i++) {
            const col = document.createElement('div');
            col.classList.add('is-masonry-column');
            container.appendChild(col);
            columns.push(col);
        }

        images.forEach(img => {
            const shortestCol = columns.reduce((shortest, current) => {
                return current.offsetHeight < shortest.offsetHeight ? current : shortest;
            });

            shortestCol.appendChild(img);
        });
    }

    // Loading Images
    let imagesLoaded = 0;
    images.forEach(img => {
        if (img.complete) {
            incrementLoad();
        } else {
            img.onload = incrementLoad;
            img.onerror = incrementLoad;
        }
    });

    function incrementLoad() {
        imagesLoaded++;
        if (imagesLoaded === images.length) {
            renderMasonry();
        }
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(renderMasonry, 200);
    });

    // Initialize Layout
    renderMasonry();
});