document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slideshowContainer = document.querySelector('.slideshow-container');
    let startX, startY, endX, endY;
    let startTime, endTime;
    let currentSlide = 1;

    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const timeThreshold = 300; // Maximum time for a swipe (in ms)

    slideshowContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = new Date().getTime(); // Record time at touch start
    });

    slideshowContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
        endY = e.touches[0].clientY;

        // Prevent vertical scroll if horizontal swipe is detected
        if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
            e.preventDefault();
        }
    });

    slideshowContainer.addEventListener('touchend', () => {
        const diffX = startX - endX;
        const diffY = startY - endY;
        endTime = new Date().getTime();

        // Calculate swipe time and distance
        const timeDiff = endTime - startTime;

        // Check if it's a horizontal swipe (distance > threshold and time < threshold)
        if (Math.abs(diffX) > swipeThreshold && timeDiff < timeThreshold) {
            if (diffX > 0) {
                moveSlide(1); // Swipe left to go to next slide
            } else {
                moveSlide(-1); // Swipe right to go to previous slide
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
