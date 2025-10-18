document.addEventListener('DOMContentLoaded', () => {
  const slideshow = document.querySelector('.slideshow-container');
  const slidesContainer = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const leftArea = document.querySelector('.left-area');
  const rightArea = document.querySelector('.right-area');
  const thumbnails = document.querySelector('.thumbnails-container');

  let current = 1; // partiamo dalla prima slide "vera"
  let touchStartX = 0;

  // Clona prima e ultima slide per il loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slides[0]);

  const allSlides = document.querySelectorAll('.slide');
  const total = allSlides.length;

  // Imposta larghezza e posizione iniziale
  slidesContainer.style.transform = `translateX(-${current * 100}%)`;

  const setSlide = (index) => {
    slidesContainer.style.transition = 'transform 0.6s ease-in-out';
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    current = index;
  };

  const next = () => setSlide(current + 1);
  const prev = () => setSlide(current - 1);

  // Gestione fine transizione per creare il loop infinito
  slidesContainer.addEventListener('transitionend', () => {
    if (allSlides[current].isEqualNode(firstClone)) {
      slidesContainer.style.transition = 'none';
      current = 1;
      slidesContainer.style.transform = `translateX(-${current * 100}%)`;
      requestAnimationFrame(() => slidesContainer.offsetHeight); // forza reflow
    }

    if (allSlides[current].isEqualNode(lastClone)) {
      slidesContainer.style.transition = 'none';
      current = total - 2;
      slidesContainer.style.transform = `translateX(-${current * 100}%)`;
      requestAnimationFrame(() => slidesContainer.offsetHeight);
    }
  });

  // Swipe
  const onSwipeStart = (e) => (touchStartX = e.touches[0].clientX);
  const onSwipeEnd = (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  // Abilita touch o click
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    leftArea.hidden = true;
    rightArea.hidden = true;
    thumbnails.hidden = true;
    slideshow.addEventListener('touchstart', onSwipeStart, { passive: true });
    slideshow.addEventListener('touchend', onSwipeEnd, { passive: true });
  } else {
    leftArea.addEventListener('click', prev);
    rightArea.addEventListener('click', next);
  }
});
