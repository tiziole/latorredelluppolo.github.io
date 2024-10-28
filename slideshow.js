document.addEventListener('DOMContentLoaded', function() {
        // SLIDESHOW
        let currentSlide = 0;
        const slidesContainer = document.querySelector('.slides');
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;

        // Clone first and last slides for the infinite loop effect
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);

        slidesContainer.appendChild(firstClone);  // Append the first slide clone
        slidesContainer.insertBefore(lastClone, slides[0]);  // Prepend the last slide clone

        // Adjust width to account for the cloned slides
        slidesContainer.style.width = `${(totalSlides + 2) * 100}%`;

        // Function to show a specific slide
        function showSlide(index) {
            const totalSlidesWithClones = totalSlides + 2;  // Account for the two cloned slides

            if (index >= totalSlidesWithClones) {
                currentSlide = 1; // Jump back to the first real slide
            } else if (index < 0) {
                currentSlide = totalSlides; // Jump back to the last real slide
            } else {
                currentSlide = index;
            }

            slidesContainer.style.transition = 'transform 0.5s ease-in-out';
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Loop effect (transition without animation to jump instantly)
            if (currentSlide === totalSlidesWithClones - 1) {
                setTimeout(() => {
                    slidesContainer.style.transition = 'none';
                    slidesContainer.style.transform = `translateX(-100%)`;  // Jump back to first real slide
                }, 500);  // Delay should match the transition duration
            }

            if (currentSlide === 0) {
                setTimeout(() => {
                    slidesContainer.style.transition = 'none';
                    slidesContainer.style.transform = `translateX(-${totalSlides * 100}%)`;  // Jump back to last real slide
                }, 500);
            }
        }

        // Function to move between slides
        function moveSlide(direction) {
            showSlide(currentSlide + direction);
        }

        // Initialize the first slide (move to first real slide)
        showSlide(1);

        // Assign click events to navigation areas
        const leftArea = document.querySelector('.left-area');
        const rightArea = document.querySelector('.right-area');

        leftArea.addEventListener('click', () => moveSlide(-1));
        rightArea.addEventListener('click', () => moveSlide(1));
    });