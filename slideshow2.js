document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 1;
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (slidesContainer && totalSlides > 1) {
        // Set initial container width
        slidesContainer.style.width = `${totalSlides * 100}%`;
        
        // Helper function to move to the specified slide index
        function showSlide(index) {
            currentSlide = index;
            slidesContainer.style.transition = 'transform 0.5s ease-in-out';
            slidesContainer.style.transform = `translateX(-${(index - 1) * (100 / totalSlides)}%)`;
        }

        // Infinite looping logic with smooth transition
        const moveSlide = (direction) => {
            // Update slide index with wrap-around logic
            if (direction === 1 && currentSlide === totalSlides) {
                currentSlide = 0;  // Reset index to 0 temporarily
                slidesContainer.style.transition = 'none'; // Remove transition for seamless loop
                slidesContainer.style.transform = 'translateX(0%)';
                
                // After resetting position, start from first slide again with transition
                setTimeout(() => {
                    slidesContainer.style.transition = 'transform 0.5s ease-in-out';
                    currentSlide = 2; // Move to second slide naturally
                    slidesContainer.style.transform = `translateX(-${(currentSlide - 1) * (100 / totalSlides)}%)`;
                }, 20); // Small timeout for the transition to apply correctly
            } 
            else if (direction === -1 && currentSlide === 1) {
                currentSlide = totalSlides + 1;
                slidesContainer.style.transition = 'none';
                slidesContainer.style.transform = `translateX(-${(totalSlides - 1) * (100 / totalSlides)}%)`;

                setTimeout(() => {
                    slidesContainer.style.transition = 'transform 0.5s ease-in-out';
                    currentSlide = totalSlides - 1;
                    slidesContainer.style.transform = `translateX(-${(currentSlide - 1) * (100 / totalSlides)}%)`;
                }, 20);
            }
            else {
                // Regular movement between slides
                showSlide(currentSlide + direction);
            }
        };

        // Set up click events for navigation
        document.querySelector('.left-area').addEventListener('click', () => moveSlide(-1));
        document.querySelector('.right-area').addEventListener('click', () => moveSlide(1));

        // Initialize slideshow at the first real slide
        showSlide(1);
    }
});
