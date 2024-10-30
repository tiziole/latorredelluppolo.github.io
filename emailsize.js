let selectedSize = null; // Variabile per tenere traccia della taglia selezionata

function selectSize(element, size) {
    if (element.classList.contains('selectedsize')) {
        // Deseleziona se già selezionato
        element.classList.remove('selectedsize');
        element.classList.add('size');
        selectedSize = null; // Non impostiamo mai null; ma mettiamo a "null" qui per il messaggio dell'email
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
    if (selectedSize) {
        const subject = `Prenotazione Felpa Meteorhop 2.0 - Taglia ${selectedSize}`;
        const email = "mailto:tuamail@example.com?subject=" + encodeURIComponent(subject);
        window.location.href = email;
    } else {
        alert("Seleziona una taglia prima di prenotare."); // Mostra alert se non è selezionata
    }
}