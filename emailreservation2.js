let selectedSize = null; // Variable to track selected size

function selectSize(element, size) {
    if (element.classList.contains('selectedsize')) {
        // Deselect if already selected
        element.classList.remove('selectedsize');
        element.classList.add('size');
        selectedSize = null; // Set to null for the email subject
    } else {
        // Remove 'selectedsize' from all sizes
        const sizes = document.querySelectorAll('.selectedsize');
        sizes.forEach(el => {
            el.classList.remove('selectedsize');
            el.classList.add('size');
        });

        // Change the class of the selected element
        element.classList.remove('size');
        element.classList.add('selectedsize');
        selectedSize = size; // Update the selected size
    }
}

function sendEmail() {
    // Get the content of <label> elements with classes 'p-prod' and 'p-price' within '.prod-form'
    const prodFormTexts = Array.from(document.querySelectorAll('.prod-form label.p-prod, .prod-form label.p-price'))
        .map(label => label.textContent) // Get only the text content of each <label>
        .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
        .join(' - '); // Join texts with " - " between them

    if (selectedSize) {
        // Create the email subject with product text and selected size
        const subject = `Prenotazione ${prodFormTexts} - Taglia ${selectedSize}`;
        const email = "mailto:tuamail@example.com?subject=" + encodeURIComponent(subject);
        window.location.href = email;
    } else {
        alert("Seleziona una taglia prima di prenotare."); // Show alert if size is not selected
    }
}
