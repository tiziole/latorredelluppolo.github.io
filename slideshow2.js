document.addEventListener("DOMContentLoaded", function() {
    const leftArea = document.querySelector('.left-area');
    const rightArea = document.querySelector('.right-area');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    // Function to show or hide areas based on device type
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
        let startX, endX;
        
        const slidesContainer = document.querySelector('.slides');

        slidesContainer.addEventListener('touchstart', function(event) {
            startX = event.touches[0].clientX;
        });

        slidesContainer.addEventListener('touchmove', function(event) {
            endX = event.touches[0].clientX;
        });

        slidesContainer.addEventListener('touchend', function() {
            if (startX > endX + 50) {
                nextSlide();
            } else if (startX < endX - 50) {
                previousSlide();
            }
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
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    }

    // Function to show the previous slide
    function previousSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
    }

    adjustDisplay();
});