document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 1;
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (slidesContainer && totalSlides > 1) {
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);

        slidesContainer.appendChild(firstClone);       // Add first clone to the end
        slidesContainer.insertBefore(lastClone, slides[0]); // Add last clone to the beginning

        slidesContainer.style.width = `${(totalSlides + 2) * 100}%`;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

        function updateSlidePosition(index) {
            slidesContainer.style.transition = 'transform 0.5s ease-in-out';
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        }

        function showSlide(index) {
            currentSlide = index;

            updateSlidePosition(currentSlide);

            // Check for clones and reset without transition after animation
            if (currentSlide === totalSlides + 1) {  // Moving to the cloned first slide
                setTimeout(() => {
                    slidesContainer.style.transition = 'none';
                    currentSlide = 1;
                    updateSlidePosition(currentSlide);
                }, 500);
            } else if (currentSlide === 0) {  // Moving to the cloned last slide
                setTimeout(() => {
                    slidesContainer.style.transition = 'none';
                    currentSlide = totalSlides;
                    updateSlidePosition(currentSlide);
                }, 500);
            }
        }

        const moveSlide = (direction) => {
            showSlide(currentSlide + direction);
        };

        // Set up click events
        document.querySelector('.left-area').addEventListener('click', () => moveSlide(-1));
        document.querySelector('.right-area').addEventListener('click', () => moveSlide(1));

        // Initialize the slideshow
        showSlide(currentSlide);
    }
});
