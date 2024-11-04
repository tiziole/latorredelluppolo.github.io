document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 1;
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Variables to store swipe positions
    let startX = 0;
    let endX = 0;

    if (slidesContainer && totalSlides > 1) {
        // Clone first and last slides for smooth looping
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);
        slidesContainer.appendChild(firstClone);
        slidesContainer.insertBefore(lastClone, slides[0]);
        slidesContainer.style.width = `${(totalSlides + 2) * 100}%`;

        // Function to display the current slide
        function showSlide(index) {
            const totalSlidesWithClones = totalSlides + 2;
            if (index >= totalSlidesWithClones) {
                currentSlide = 1;
            } else if (index < 0) {
                currentSlide = totalSlides;
            } else {
                currentSlide = index;
            }

            slidesContainer.style.transition = 'transform 0.5s ease-in-out';
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Reset to start or end without animation when looping
            if (currentSlide === totalSlidesWithClones - 1) {
                setTimeout(() => {
                    slidesContainer.style.transition = 'none';
                    slidesContainer.style.transform = `translateX(-100%)`;
                }, 500);
            } else if (currentSlide === 0) {
                setTimeout(() => {
                    slidesContainer.style.transition = 'none';
                    slidesContainer.style.transform = `translateX(-${totalSlides * 100}%)`;
                }, 500);
            }
        }

        // Move slides left or right
        const moveSlide = (direction) => {
            showSlide(currentSlide + direction);
        };

        // Event listeners for button navigation
        document.querySelector('.left-area').addEventListener('click', () => moveSlide(-1));
        document.querySelector('.right-area').addEventListener('click', () => moveSlide(1));

        // Swipe functionality
        slidesContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slidesContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const swipeDistance = startX - endX;

            // Detect swipe left or right based on swipe distance
            if (swipeDistance > 50) {        // Swipe left
                moveSlide(1);
            } else if (swipeDistance < -50) { // Swipe right
                moveSlide(-1);
            }
        });

        // Initialize the slideshow at the first visible slide
        showSlide(1);
    }
});
