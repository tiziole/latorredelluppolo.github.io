//SET HEIGHT OF CARDS

function setCardHeight() {
    var cards = document.querySelectorAll('.p-r-card');
    cards.forEach(function(card) {
        var image = card.querySelector('.card-image');

        if (!image.complete) {
            image.onload = function() {
                calculateHeight(card, image);
            };
        } else {
            calculateHeight(card, image);
        }
    });
}

function calculateHeight(card, image) {
    var imageTop = 50;

    var imageWidth = card.offsetWidth * 0.9; 
    var imageHeight = imageWidth * (image.naturalHeight / image.naturalWidth); // Mantieni il rapporto d'aspetto

    var totalHeight = imageTop + imageHeight;

    card.style.height = totalHeight + 'px';
}

document.addEventListener("DOMContentLoaded", setCardHeight);

window.addEventListener('resize', setCardHeight);
