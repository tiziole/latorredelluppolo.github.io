document.addEventListener('DOMContentLoaded', function () {
    const thumbnailContainer = document.querySelector('.thumbnails-container');

    function checkWindowSize() {
        if (window.innerWidth < 992) {
            thumbnailContainer.style.display = 'none';
        } else {
            thumbnailContainer.style.display = ''; // Clears any inline style without explicitly setting display
        }
    }

    // Initial check on load
    checkWindowSize();

    // Listen for window resize events
    window.addEventListener('resize', checkWindowSize);
});
