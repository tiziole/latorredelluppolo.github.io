document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    let startX, startY, endX, endY;
    let startTime, endTime;
    let currentSlide = 1;

    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const timeThreshold = 300; // Maximum time for a swipe (in ms)

    // Clone first and last slides for smooth looping
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);

    // Append clones to create an infinite effect
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slides[0]);

    // Set the initial position to the first slide (offset by one slide due to the cloned slide)
    slidesContainer.style.transform = `translateX(-${100}%)`;

    function moveSlide(direction) {
        currentSlide += direction;
        slidesContainer.style.transition = 'transform 0.5s ease';
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Check if we’ve moved to a cloned slide
        if (currentSlide === 0) {
            // Moved to the last clone; jump to the actual last slide after transition
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                currentSlide = totalSlides;
                slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            }, 500);
        } else if (currentSlide === totalSlides + 1) {
            // Moved to the first clone; jump to the actual first slide after transition
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                currentSlide = 1;
                slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            }, 500);
        }
    }

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
});
