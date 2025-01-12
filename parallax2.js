function setParallaxEffect() {
        var cards = document.querySelectorAll('.card');
        var windowHeight = window.innerHeight;
        var startTop = 60; // Valore iniziale di top
        var endTop = 0; // Valore finale di top

        cards.forEach(function(card) {
            var image = card.querySelector('.card-image');
            var rect = card.getBoundingClientRect();

            // Se la card è visibile nella viewport
            if (rect.top <= windowHeight && rect.bottom >= 0) {
                var distanceFromCenter = windowHeight / 2 - rect.top; // Distanza dalla metà della viewport
                var parallax = startTop - (distanceFromCenter * 0.15); // Calcola il movimento parallax

                // Assicurati che il valore parallax non superi il range specificato
                parallax = Math.max(endTop, Math.min(startTop, parallax));

                // Applica il movimento parallax all'immagine
                image.style.transform = `translate(0%, ${parallax}px)`;
            }
        });
    }

    function onScroll() {
        if (!window.requestAnimationFrame) {
            setParallaxEffect();
        } else {
            requestAnimationFrame(setParallaxEffect);
        }
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', setParallaxEffect);
    document.addEventListener("DOMContentLoaded", setParallaxEffect);