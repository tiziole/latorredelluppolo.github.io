document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    let startX, startY, endX, endY;
    let currentSlide = 1; // Start at the first actual slide
    const totalSlides = document.querySelectorAll('.slide').length;

    // Clone first and last slides for smooth looping
    const firstClone = slidesContainer.firstElementChild.cloneNode(true);
    const lastClone = slidesContainer.lastElementChild.cloneNode(true);
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstElementChild);

    // Set initial position to the first slide
    slidesContainer.style.transform = `translateX(-${100}%)`;

    // Swipe thresholds
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const timeThreshold = 300; // Maximum time for a swipe (in ms)

    slidesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = new Date().getTime();
    });

    slidesContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
        endY = e.touches[0].clientY;

        // Prevent vertical scroll if horizontal swipe is detected
        if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
            e.preventDefault();
        }
    });

    slidesContainer.addEventListener('touchend', () => {
        const diffX = startX - endX;
        const timeDiff = new Date().getTime() - startTime;

        // Check if it's a valid swipe (distance > threshold and time < threshold)
        if (Math.abs(diffX) > swipeThreshold && timeDiff < timeThreshold) {
            if (diffX > 0) {
                moveSlide(1); // Swipe left to go to next slide
            } else {
                moveSlide(-1); // Swipe right to go to previous slide
            }
        }
    });

    function moveSlide(direction) {
        currentSlide += direction;
        slidesContainer.style.transition = 'transform 0.5s ease';
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Loop around on reaching cloned slides
        if (currentSlide === 0) {
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                currentSlide = totalSlides;
                slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            }, 500);
        } else if (currentSlide === totalSlides + 1) {
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                currentSlide = 1;
                slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            }, 500);
        }
    }
});
