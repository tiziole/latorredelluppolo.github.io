document.addEventListener('DOMContentLoaded', () => {
  const slideshow = document.querySelector('.slideshow-container');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const indicators = Array.from(document.querySelectorAll('.indicator'));
  const leftArea = document.querySelector('.left-area');
  const rightArea = document.querySelector('.right-area');
  const thumbnails = document.querySelector('.thumbnails-container');
  const slidesContainer = document.querySelector('.slides');

  let current = 0;
  let touchStartX = 0;

  const totalSlides = slides.length;

  const setActiveSlide = (index) => {
    // Usa modulo per ciclo continuo
    current = (index + totalSlides) % totalSlides;

    // Usa requestAnimationFrame per evitare layout thrashing
    requestAnimationFrame(() => {
      slidesContainer.style.transform = `translateX(-${current * 100}%)`;
      indicators.forEach((el, i) =>
        el.classList.toggle('active', i === current)
      );
    });
  };

  const next = () => setActiveSlide(current + 1);
  const prev = () => setActiveSlide(current - 1);

  const onSwipeStart = (e) => (touchStartX = e.touches[0].clientX);
  const onSwipeEnd = (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  const enableTouch = () => {
    slideshow.addEventListener('touchstart', onSwipeStart, { passive: true });
    slideshow.addEventListener('touchend', onSwipeEnd, { passive: true });
  };

  const enableClick = () => {
    leftArea.addEventListener('click', prev);
    rightArea.addEventListener('click', next);
  };

  // Setup iniziale
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    leftArea.hidden = true;
    rightArea.hidden = true;
    thumbnails.hidden = true;
    enableTouch();
  } else {
    enableClick();
  }

  setActiveSlide(0);
});
