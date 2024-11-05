document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const totalSlides = document.querySelectorAll('.slide').length;
    let currentSlide = 1; // Iniziare con la prima slide
    let startX, endX;
    let isTransitioning = false; // Flag per disabilitare ulteriori interazioni durante la transizione

    // Clonare la prima e l'ultima slide per il loop infinito
    const firstClone = slidesContainer.firstElementChild.cloneNode(true);
    const lastClone = slidesContainer.lastElementChild.cloneNode(true);
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstElementChild);

    // Imposta la posizione iniziale
    slidesContainer.style.transform = `translateX(-${100}%)`;

    function moveSlide(direction) {
        if (isTransitioning) return; // Ignora se già in transizione
        isTransitioning = true; // Imposta il flag per indicare che è in corso una transizione

        currentSlide += direction;

        // Controllo per le slide clonate
        if (currentSlide === 0) {
            currentSlide = totalSlides; // Ripristina l'ultima slide reale
            slidesContainer.style.transition = 'none'; // Disabilita la transizione
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`; // Riposizionare immediatamente
            setTimeout(() => {
                slidesContainer.style.transition = 'transform 0.5s ease-in-out'; // Riabilita la transizione
                moveSlide(direction); // Ripeti il movimento
            }, 50); // Breve timeout per consentire il ripristino
        } else if (currentSlide === totalSlides + 1) {
            currentSlide = 1; // Ripristina la prima slide reale
            slidesContainer.style.transition = 'none'; // Disabilita la transizione
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`; // Riposizionare immediatamente
            setTimeout(() => {
                slidesContainer.style.transition = 'transform 0.5s ease-in-out'; // Riabilita la transizione
                moveSlide(direction); // Ripeti il movimento
            }, 50); // Breve timeout per consentire il ripristino
        } else {
            slidesContainer.style.transition = 'transform 0.5s ease-in-out'; // Riabilita la transizione
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Reset del flag di transizione dopo un breve ritardo
        setTimeout(() => {
            isTransitioning = false;
        }, 500); // Tempo di attesa uguale alla durata della transizione
    }

    // Event listeners per le aree di navigazione
    document.querySelector('.left-area').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.right-area').addEventListener('click', () => moveSlide(1));

    // Gestione degli eventi touch per lo swipe
    slideshowContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slideshowContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    slideshowContainer.addEventListener('touchend', () => {
        const diffX = startX - endX;

        // Gestire lo swipe solo se c'è un movimento significativo
        if (Math.abs(diffX) > 50) { // Soglia di swipe
            moveSlide(diffX > 0 ? 1 : -1); // Swipe sinistra per successiva, destra per precedente
        }
    });
});
