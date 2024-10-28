// SLIDESHOW
document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables
    let currentSlide = 1;  // Start at the first real slide
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Ensure we have slides to work with and a container
    if (slidesContainer && totalSlides > 1) {
        // Clone first and last slides for seamless looping
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);

        // Append clones to create an "infinite" effect
        slidesContainer.appendChild(firstClone);
        slidesContainer.insertBefore(lastClone, slides[0]);

        // Set container width to accommodate clones
        slidesContainer.style.width = `${(totalSlides + 2) * 100}%`;

        // Function to display a specific slide
        function showSlide(index) {
            const totalSlidesWithClones = totalSlides + 2;  // Adjust for cloned slides

            if (index >= totalSlidesWithClones) {
                currentSlide = 1; // Reset to first real slide
            } else if (index < 0) {
                currentSlide = totalSlides; // Reset to last real slide
            } else {
                currentSlide = index;
            }

            // Transition to the current slide
            slidesContainer.style.transition = 'transform 0.5s ease-in-out';
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Seamlessly loop to the first or last real slide
            if (currentSlide === totalSlidesWithClones - 1) {
                setTimeout(() => {
                    slidesContainer.style.transition = 'none';
                    slidesContainer.style.transform = `translateX(-100%)`;
                }, 500); // Transition time
            } else if (currentSlide === 0) {
                setTimeout(() => {
                    slidesContainer.style.transition = 'none';
                    slidesContainer.style.transform = `translateX(-${totalSlides * 100}%)`;
                }, 500);
            }
        }

        // Move slides by a direction (-1 or +1)
        const moveSlide = (direction) => {
            showSlide(currentSlide + direction);
        };

        // Initialize slideshow by showing the first real slide
        showSlide(1);

        // Event listeners for navigation areas
        const leftArea = document.querySelector('.left-area');
        const rightArea = document.querySelector('.right-area');

        if (leftArea) {
            leftArea.addEventListener('click', () => moveSlide(-1));
        }
        if (rightArea) {
            rightArea.addEventListener('click', () => moveSlide(1));
        }
    } else {
        console.warn("Slides container or insufficient slides were not found.");
    }
});
