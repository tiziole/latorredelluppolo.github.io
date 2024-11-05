document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const thumbnailsContainer = document.querySelector('.thumbnails-container');
    let currentSlide = 0;

    // Generate thumbnail images dynamically
    slides.forEach((slide, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = slide.querySelector('img').src;
        thumbnail.classList.add('thumbnail');
        if (index === 0) thumbnail.classList.add('active'); // Mark first thumbnail as active

        thumbnail.addEventListener('click', () => {
            currentSlide = index;
            updateSlidePosition();
        });

        thumbnailsContainer.appendChild(thumbnail);
    });

    function updateSlidePosition() {
        // Translate slides container to show the current slide
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
        updateThumbnails();
    }

    function updateIndicators() {
        // Update indicator styles based on the current slide
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function updateThumbnails() {
        // Update thumbnails to reflect the active slide
        const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === currentSlide);
        });
    }

    document.querySelector('.left-area').addEventListener('click', () => {
        // Move to the previous slide if possible
        if (currentSlide > 0) {
            currentSlide--;
            updateSlidePosition();
        }
    });

    document.querySelector('.right-area').addEventListener('click', () => {
        // Move to the next slide if possible
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlidePosition();
        }
    });

    // Initial setup to show the first slide and update indicators and thumbnails
    updateSlidePosition();
});
