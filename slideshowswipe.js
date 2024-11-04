document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slideshowContainer = document.querySelector('.slideshow-container');
    let startX, startY, endX, endY;
    let currentSlide = 1;

    // Swipe threshold (in pixels)
    const swipeThreshold = 50;

    // Touchstart event - record the starting position
    slideshowContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    // Touchmove event - prevent vertical scroll if swiping horizontally
    slideshowContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
        endY = e.touches[0].clientY;

        // Prevent scrolling on horizontal swipe
        if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
            e.preventDefault();
        }
    });

    // Touchend event - calculate swipe distance and direction
    slideshowContainer.addEventListener('touchend', () => {
        const diffX = startX - endX;

        if (Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                // Swipe left, go to next slide
                moveSlide(1);
            } else {
                // Swipe right, go to previous slide
                moveSlide(-1);
            }
        }
    });

    function moveSlide(direction) {
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;

        currentSlide += direction;
        
        // Loop back at the end
        if (currentSlide >= totalSlides) currentSlide = 0;
        if (currentSlide < 0) currentSlide = totalSlides - 1;

        // Apply the translation
        slidesContainer.style.transition = 'transform 0.5s ease';
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
});
