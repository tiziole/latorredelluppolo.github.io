let selectedSize = null; // Variabile per tracciare la taglia selezionata

function selectSize(element, size) {
    if (element.classList.contains('selectedsize')) {
        // Deseleziona se già selezionata
        element.classList.remove('selectedsize');
        element.classList.add('size');
        selectedSize = null;
    } else {
        // Rimuovi 'selectedsize' da tutte le altre
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
    const prodForm = document.querySelector('.prod-form');

    // ✅ 1. Controlla se il form ha un attributo data-size
    const defaultSize = prodForm?.dataset.size || null;

    // ✅ 2. Usa la taglia selezionata, oppure quella "di default" del form
    const finalSize = selectedSize || defaultSize;

    // Se non c’è né una selezione né un attributo data-size, mostra alert
    if (!finalSize) {
        alert("Seleziona una taglia prima di prenotare.");
        return;
    }

    // Recupera le informazioni del prodotto
    const itemText = document.querySelector('.prod-form label.item')?.textContent || '';
    const prodFormTexts = Array.from(document.querySelectorAll('.prod-form label.p-prod'))
        .map(label => label.textContent)
        .filter((value, index, self) => self.indexOf(value) === index)
        .join(' - ');

    // Costruisci subject e body dell’email
    const subject = `Prenotazione ${itemText} - ${prodFormTexts} - Taglia ${finalSize}`;
    const body = "Inserisci qui il tuo Nome, Cognome, numero di cellulare, modello e taglia della felpa che vuoi prenotare";

    // Crea e apri il link mailto
    const email = `mailto:latorre@latorredelluppolo.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = email;
}
