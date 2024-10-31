let selectedSize = null; // Variabile per tenere traccia della taglia selezionata

function selectSize(element, size) {
    if (element.classList.contains('selectedsize')) {
        // Deseleziona se già selezionato
        element.classList.remove('selectedsize');
        element.classList.add('size');
        selectedSize = null; // Imposta a null per il messaggio dell'email
    } else {
        // Rimuove la classe 'selectedsize' da tutte le taglie
        const sizes = document.querySelectorAll('.selectedsize');
        sizes.forEach(el => {
            el.classList.remove('selectedsize');
            el.classList.add('size');
        });

        // Cambia la classe dell'elemento selezionato
        element.classList.remove('size');
        element.classList.add('selectedsize');
        selectedSize = size; // Aggiorna la taglia selezionata
    }
}

function sendEmail() {
    // Ottieni il contenuto di tutti i <p> con classe 'p-prod' all'interno di 'prod-form'
    const prodFormTexts = Array.from(document.querySelectorAll('.prod-form .p-prod'))
        .map(p => p.textContent) // Prendi solo il testo di ciascun <p>
        .join(' - '); // Unisci i testi con " - " tra di loro

    if (selectedSize) {
        // Crea l'oggetto dell'email includendo il testo del prodotto e la taglia selezionata
        const subject = `Prenotazione ${prodFormTexts} - Taglia ${selectedSize}`;
        const email = "mailto:tuamail@example.com?subject=" + encodeURIComponent(subject);
        window.location.href = email;
    } else {
        alert("Seleziona una taglia prima di prenotare."); // Mostra alert se non è selezionata
    }
}
