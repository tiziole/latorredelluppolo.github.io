document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    let currentSlide = 1; // Start at the first actual slide
    let startX, endX;
    const swipeThreshold = 50; // Minimum swipe distance in pixels

    // Clone the first and last slides for infinite looping
    const firstClone = slidesContainer.firstElementChild.cloneNode(true);
    const lastClone = slidesContainer.lastElementChild.cloneNode(true);
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstElementChild);

    // Set the initial position to the first slide
    slidesContainer.style.transform = `translateX(-${100}%)`;

    function moveSlide(direction) {
        currentSlide += direction;

        // Apply the transition
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Loop around on reaching cloned slides
        if (currentSlide === 0) {
            setTimeout(() => {
                slidesContainer.style.transition = 'none'; // Remove transition for instant jump
                currentSlide = totalSlides; // Reset to the last actual slide
                slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            }, 500);
        } else if (currentSlide === totalSlides + 1) {
            setTimeout(() => {
                slidesContainer.style.transition = 'none'; // Remove transition for instant jump
                currentSlide = 1; // Reset to the first actual slide
                slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            }, 500);
        }
    }

    // Touch events for swipe gestures
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
                moveSlide(1); // Swipe left to go to the next slide
            } else {
                moveSlide(-1); // Swipe right to go to the previous slide
            }
        }
    });
});

