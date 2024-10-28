// REFRESH ON TOP
document.addEventListener("DOMContentLoaded", function () {
    // Ensure the page refreshes at the top
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
});

// SCROLL TO FORM WITH NO ANCHOR
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("gotoformiscrizione");
    if (button) {
        button.addEventListener("click", function () {
            scrollToElement('formiscrizione');
        });
    }
});

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error("Element with ID '" + elementId + "' not found.");
    }
}

// SET HEIGHT OF CARDS
function setCardHeight() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const image = card.querySelector('.card-image');
        if (image) {
            if (!image.complete) {
                image.onload = function () {
                    calculateHeight(card, image);
                };
            } else {
                calculateHeight(card, image);
            }
        }
    });
}

function calculateHeight(card, image) {
    const imageTop = 50;
    const imageWidth = card.offsetWidth * 0.9;
    const imageHeight = imageWidth * (image.naturalHeight / image.naturalWidth);
    const totalHeight = imageTop + imageHeight;
    card.style.height = `${totalHeight}px`;
}

document.addEventListener("DOMContentLoaded", setCardHeight);
window.addEventListener('resize', setCardHeight);

// PARALLAX SCRIPT
function setParallaxEffect() {
    const cards = document.querySelectorAll('.card');
    const windowHeight = window.innerHeight;
    const startTop = 60;
    const endTop = 10;

    cards.forEach(card => {
        const image = card.querySelector('.card-image');
        const rect = card.getBoundingClientRect();

        if (rect.top <= windowHeight && rect.bottom >= 0) {
            const distanceFromCenter = windowHeight / 2 - rect.top;
            let parallax = startTop - (distanceFromCenter * 0.15);
            parallax = Math.max(endTop, Math.min(startTop, parallax));

            if (image) {
                image.style.transform = `translate(-50%, ${parallax}px)`;
            }
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



