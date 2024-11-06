document.addEventListener("DOMContentLoaded", function() {
    const leftArea = document.querySelector('.left-area');
    const rightArea = document.querySelector('.right-area');
    const slides = document.querySelectorAll('.slide');
    const slideshowContainer = document.querySelector('.slideshow-container');
    let currentIndex = 0;
    let startX, endX;

    // Adjust display based on device type
    function adjustDisplay() {
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            // Hide left and right areas for touch devices
            leftArea.style.display = 'none';
            rightArea.style.display = 'none';
            enableSwipe();
        } else {
            // Show left and right areas for desktop devices
            leftArea.style.display = 'block';
            rightArea.style.display = 'block';
            enableClickNavigation();
        }
    }

    // Enable swipe functionality for touch devices
    function enableSwipe() {
        slideshowContainer.addEventListener('touchstart', function(event) {
            startX = event.touches[0].clientX;
            endX = startX;  // Initialize endX to startX at start of swipe
        });

        slideshowContainer.addEventListener('touchmove', function(event) {
            endX = event.touches[0].clientX;  // Update endX as the touch moves
        });

        slideshowContainer.addEventListener('touchend', function() {
            const diffX = startX - endX;  // Calculate swipe distance

            // Check if swipe distance exceeds threshold
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide(); // Swipe left
                } else {
                    previousSlide(); // Swipe right
                }
            }

            // Reset startX and endX to avoid interference with future swipes
            startX = 0;
            endX = 0;
        });
    }

    // Enable click navigation for desktop devices
    function enableClickNavigation() {
        leftArea.addEventListener('click', previousSlide);
        rightArea.addEventListener('click', nextSlide);
    }

    // Function to show the next slide
    function nextSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = Math.min(currentIndex + 1, slides.length - 1);  // Go to next if available
        slides[currentIndex].classList.add('active');
    }

    // Function to show the previous slide
    function previousSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = Math.max(currentIndex - 1, 0);  // Go to previous if available
        slides[currentIndex].classList.add('active');
    }

    adjustDisplay();  // Initial check to configure swipe or click
});
