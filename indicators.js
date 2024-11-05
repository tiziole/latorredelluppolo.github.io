document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = document.querySelectorAll('.slide').length;
    let currentSlide = 1;

    // Funzione per aggiornare lo stato dell'indicatore
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide - 1);
        });
    }

    // Funzione per spostare le slide e aggiornare gli indicatori
    function moveSlide(direction) {
        currentSlide += direction;

        if (currentSlide < 1) currentSlide = totalSlides;
        else if (currentSlide > totalSlides) currentSlide = 1;

        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

        updateIndicators();
    }

    // Aggiungi event listener per le aree sinistra e destra
    document.querySelector('.left-area').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.right-area').addEventListener('click', () => moveSlide(1));

    // Inizializza gli indicatori allo stato corretto
    updateIndicators();
});
