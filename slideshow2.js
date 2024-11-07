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
    // Retrieve the text content of <label> with class 'item' inside '.prod-form'
    const itemText = document.querySelector('.prod-form label.item')?.textContent || '';

    // Retrieve the content of <label> elements with class 'p-prod' within '.prod-form'
    const prodFormTexts = Array.from(document.querySelectorAll('.prod-form label.p-prod'))
        .map(label => label.textContent) // Get only the text content of each <label>
        .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
        .join(' - '); // Join texts with " - " between them

    if (selectedSize) {
        // Construct the email subject using the item text and product details
        const subject = `Prenotazione ${itemText} - ${prodFormTexts} - Taglia ${selectedSize}`;

        // Define the email body with additional instructions
        const body = "Inserisci qui il tuo Nome, Cognome, numero di cellulare, modello e taglia della felpa che vuoi prenotare";

        // Construct the mailto URL with both subject and body
        const email = `mailto:latorre@latorredelluppolo.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Redirect to the constructed mailto URL
        window.location.href = email;
    } else {
        alert("Seleziona una taglia prima di prenotare."); // Show alert if size is not selected
    }
}
