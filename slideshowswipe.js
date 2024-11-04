document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 1;
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Variables for swipe detection
    let startX = 0;
    let endX = 0;

    if (slidesContainer && totalSlides > 1) {
        // Clone first and last slides for smooth looping
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);
        slidesContainer.appendChild(firstClone);
        slidesContainer.insertBefore(lastClone, slides[0]);
        slidesContainer.style.width = `${(totalSlides + 2) * 100}%`;

        // Show slide function
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

        const moveSlide = (direction) => {
            showSlide(currentSlide + direction);
        };

        // Button navigation listeners
        document.querySelector('.left-area').addEventListener('click', () => moveSlide(-1));
        document.querySelector('.right-area').addEventListener('click', () => moveSlide(1));

        // Swipe functionality
        slidesContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            console.log("Touch start at:", startX); // Debugging
        });

        slidesContainer.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        slidesContainer.addEventListener('touchend', (e) => {
            console.log("Touch end at:", endX); // Debugging
            const swipeDistance = startX - endX;

            if (swipeDistance > 50) {        // Swipe left
                console.log("Swiped left");
                moveSlide(1);
            } else if (swipeDistance < -50) { // Swipe right
                console.log("Swiped right");
                moveSlide(-1);
            }

            // Reset swipe values
            startX = 0;
            endX = 0;
        });

        // Initialize the slideshow
        showSlide(1);
    }
});
