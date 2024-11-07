document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slides .slide'); // Select all slides
    const indicatorContainer = document.querySelector('.indicator-container'); // Select the indicator container

    // Loop through the slides and create an indicator for each
    slides.forEach((_, index) => {
        const indicator = document.createElement('span'); // Create a new span element
        indicator.classList.add('indicator'); // Add the 'indicator' class to the span

        // Optionally, add an active class to the first indicator for default selection
        if (index === 0) {
            indicator.classList.add('active');
        }

        indicatorContainer.appendChild(indicator); // Append the indicator to the container
    });
});
