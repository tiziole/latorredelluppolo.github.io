document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    function updateSlidePosition() {
        // Translate slides container to show the current slide
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
    }

    function updateIndicators() {
        // Update indicator styles based on the current slide
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
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

    // Initial setup to show the first slide and update indicators
    updateSlidePosition();
});
