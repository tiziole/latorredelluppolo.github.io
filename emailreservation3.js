let selectedSize = null; // Variabile per tracciare la taglia selezionata

function selectSize(element, size) {
    if (element.classList.contains('selectedsize')) {
        // Deseleziona se è già selezionata
        element.classList.remove('selectedsize');
        element.classList.add('size');
        selectedSize = null;
    } else {
        // Rimuovi 'selectedsize' da tutte le altre taglie
        const sizes = document.querySelectorAll('.selectedsize');
        sizes.forEach(el => {
            el.classList.remove('selectedsize');
            el.classList.add('size');
        });

        // Imposta la taglia selezionata
        element.classList.remove('size');
        element.classList.add('selectedsize');
        selectedSize = size;
    }
}

function sendEmail() {
    // Se nessuna taglia è selezionata, controlla se il prodotto è "taglia unica"
    if (!selectedSize) {
        const unicaContainer = document.querySelector('.sizes[data-size="UNICA"]');
        if (unicaContainer) {
            selectedSize = unicaContainer.dataset.size; // Imposta "UNICA"
        }
    }

    // Se ancora non c’è una taglia selezionata, mostra alert
    if (!selectedSize) {
        alert("Seleziona una taglia prima di prenotare.");
        return;
    }

    // Recupera i testi degli elementi nel form
    const itemText = document.querySelector('.prod-form label.item')?.textContent || '';
    const prodFormTexts = Array.from(document.querySelectorAll('.prod-form label.p-prod'))
        .map(label => label.textContent)
        .filter((value, index, self) => self.indexOf(value) === index)
        .join(' - ');

    // Costruisci subject e body dell’email
    const subject = `Prenotazione ${itemText} - ${prodFormTexts} - Taglia ${selectedSize}`;
    const body = "Inserisci qui il tuo Nome, Cognome, numero di cellulare, modello e taglia della felpa che vuoi prenotare";

    // Crea e apri il link mailto
    const email = `mailto:latorre@latorredelluppolo.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = email;
}
