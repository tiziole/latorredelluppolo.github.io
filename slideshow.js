document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 1;
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (slidesContainer && totalSlides > 1) {
        // Clone first and last slides for smooth looping
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);

        // Add clones to the container
        slidesContainer.appendChild(firstClone);
        slidesContainer.insertBefore(lastClone, slides[0]);
        
        // Adjust container width to fit all slides including clones
        slidesContainer.style.width = `${(totalSlides + 2) * 100}%`;

        // Set initial position to the first slide
        slidesContainer.style.transform = `translateX(-${100}%)`;

        function updateSlidePosition() {
            slidesContainer.style.transition = 'transform 0.5s ease-in-out';
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function jumpToSlide(position) {
            slidesContainer.style.transition = 'transform 0.5s ease-in-out';
            slidesContainer.style.transform = `translateX(-${position * 100}%)`;
            currentSlide = position;
        }

        function moveToNextSlide() {
            currentSlide++;
            updateSlidePosition();

            // When reaching the cloned last slide, jump to the real first slide
            if (currentSlide === totalSlides + 1) {
                setTimeout(() => jumpToSlide(1), 500);
            }
        }

        function moveToPreviousSlide() {
            currentSlide--;
            updateSlidePosition();

            // When reaching the cloned first slide, jump to the real last slide
            if (currentSlide === 0) {
                setTimeout(() => jumpToSlide(totalSlides), 500);
            }
        }

        // Event listeners for navigation areas
        document.querySelector('.left-area').addEventListener('click', moveToPreviousSlide);
        document.querySelector('.right-area').addEventListener('click', moveToNextSlide);

        // Initialize with the first slide
        updateSlidePosition();
    }
});


