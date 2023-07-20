const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const slideCount = slides.length;
let currentSlide = 0;

function showSlide(index) {
  if (index < 0) {
    index = slideCount - 1;
  } else if (index >= slideCount) {
    index = 0;
  }

  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  slides[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

setInterval(nextSlide, 3000);
