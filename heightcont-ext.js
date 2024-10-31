function adjustContentHeight() {
        const header = document.getElementById('header');
        const headerHeight = header.clientHeight; // Ottieni l’altezza dell’header in px
        
        // Seleziona tutti gli elementi con la classe cont-ext e aggiorna l’altezza
        document.querySelectorAll('.cont-ext').forEach(element => {
            element.style.height = `calc(100vh - ${headerHeight}px)`;
        });
    }

    // Esegui la funzione all’inizio e al resize della finestra
    window.addEventListener('load', adjustContentHeight);
    window.addEventListener('resize', adjustContentHeight);