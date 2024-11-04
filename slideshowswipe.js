document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slideshow-container');

    if (slidesContainer) {
        let startX = 0;
        let startY = 0;
        let isSwiping = false;

        slidesContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = true;
        });

        slidesContainer.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;

            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;

            // Ignore vertical swipes to focus on horizontal swipes only
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
                isSwiping = false;

                // Swipe threshold of 50px
                if (diffX > 50) {
                    // Swipe left
                    moveSlide(1);  // Go to the next slide
                } else if (diffX < -50) {
                    // Swipe right
                    moveSlide(-1); // Go to the previous slide
                }
            }
        });

        slidesContainer.addEventListener('touchend', () => {
            isSwiping = false;
        });
    }
});
