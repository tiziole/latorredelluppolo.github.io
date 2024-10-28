document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 1;
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (slidesContainer && totalSlides > 1) {
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);

        slidesContainer.appendChild(firstClone);
        slidesContainer.insertBefore(lastClone, slides[0]);
        slidesContainer.style.width = `${(totalSlides + 2) * 100}%`;

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

        // Set up event listeners on navigation areas
        document.querySelector('.left-area').addEventListener('click', () => moveSlide(-1));
        document.querySelector('.right-area').addEventListener('click', () => moveSlide(1));

        showSlide(1); // Initialize the slideshow
    }
});
