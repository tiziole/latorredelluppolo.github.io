document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    function updateSlidePosition() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function moveSlide(direction) {
        if (direction === 'next' && currentSlide < slides.length - 1) {
            currentSlide++;
        } else if (direction === 'prev' && currentSlide > 0) {
            currentSlide--;
        }
        updateSlidePosition();
    }

    // Touch events for swipe functionality on touch devices
    if ('ontouchstart' in window) {
        let startX = 0;
        let endX = 0;
        const swipeThreshold = 50; // Minimum swipe distance in pixels

        slidesContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slidesContainer.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        slidesContainer.addEventListener('touchend', () => {
            const diffX = startX - endX;

            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    moveSlide('next'); // Swipe left to go to the next slide
                } else {
                    moveSlide('prev'); // Swipe right to go to the previous slide
                }
            }
        });
    } else {
        // Click events for non-touch devices
        document.querySelector('.left-area').addEventListener('click', () => moveSlide('prev'));
        document.querySelector('.right-area').addEventListener('click', () => moveSlide('next'));
    }

    // Initial setup to show the first slide and update indicators
    updateSlidePosition();
});
