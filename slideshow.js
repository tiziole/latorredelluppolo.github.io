document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const leftArea = document.querySelector('.left-area');
    const rightArea = document.querySelector('.right-area');
    const thumbnailcontainer = document.querySelector('.thumbnails-container');
    let currentSlide = 0;
    let startX = 0;
    let endX = 0;

    function updateSlidePosition() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlidePosition();
        }
    }

    function previousSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlidePosition();
        }
    }

    function enableSwipe() {
        slideshowContainer.addEventListener('touchstart', function (event) {
            startX = event.touches[0].clientX;
        });

        slideshowContainer.addEventListener('touchmove', function (event) {
            endX = event.touches[0].clientX;
        });

        slideshowContainer.addEventListener('touchend', function () {
            const diffX = startX - endX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide(); // Swipe left
                } else {
                    previousSlide(); // Swipe right
                }
            }
            startX = 0;
            endX = 0;
        });
    }

    function enableClickNavigation() {
        leftArea.addEventListener('click', previousSlide);
        rightArea.addEventListener('click', nextSlide);
    }

    // Detect touchscreen and adjust display and functionality
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        // Hide click areas for touch devices
        leftArea.style.display = 'none';
        rightArea.style.display = 'none';
        thumbnailcontainer.style.display="none";
        enableSwipe();
    } else {
        // Enable click navigation for non-touch devices
        enableClickNavigation();
    }

    // Initial setup
    updateSlidePosition();
});
