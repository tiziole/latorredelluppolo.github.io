document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const totalSlides = document.querySelectorAll('.slide').length;
    let currentSlide = 1; // Iniziare con la prima slide
    let startX, endX;

    // Clonare la prima e l'ultima slide per il loop infinito
    const firstClone = slidesContainer.firstElementChild.cloneNode(true);
    const lastClone = slidesContainer.lastElementChild.cloneNode(true);
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstElementChild);

    // Imposta la posizione iniziale
    slidesContainer.style.transform = `translateX(-${100}%)`;

    function moveSlide(direction) {
        // Calcolare il nuovo indice slide
        currentSlide += direction;

        // Controllo per le slide clonate
        if (currentSlide === 0) {
            currentSlide = totalSlides; // Ripristina l'ultima slide reale
            slidesContainer.style.transition = 'none'; // Disabilita la transizione
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`; // Riposizionare immediatamente
        } else if (currentSlide === totalSlides + 1) {
            currentSlide = 1; // Ripristina la prima slide reale
            slidesContainer.style.transition = 'none'; // Disabilita la transizione
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`; // Riposizionare immediatamente
        } else {
            slidesContainer.style.transition = 'transform 0.5s ease-in-out'; // Riabilita la transizione
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
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
            if (diffX > 0) {
                moveSlide(1); // Swipe sinistra per andare alla slide successiva
            } else {
                moveSlide(-1); // Swipe destra per andare alla slide precedente
            }
        }
    });
});
