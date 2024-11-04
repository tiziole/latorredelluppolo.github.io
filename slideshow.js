document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    let currentSlide = 1; // Start at the first actual slide

    // Clone first and last slides for smooth looping
    const firstClone = slidesContainer.firstElementChild.cloneNode(true);
    const lastClone = slidesContainer.lastElementChild.cloneNode(true);
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstElementChild);

    // Set initial position to the first slide
    slidesContainer.style.transform = `translateX(-${100}%)`;

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

    // Event listeners for tap/click navigation
    document.querySelector('.left-area').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.right-area').addEventListener('click', () => moveSlide(1));
});
