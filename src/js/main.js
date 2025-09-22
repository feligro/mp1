/* Your JS here. */
console.log('Hello World!')

const nav = document.getElementById('Navbar');

const track = document.getElementById('slides');
const slideEls = Array.from(track.children);
let index = 0;
let autoTimer;

const nav = document.getElementById("Navbar");
const links = nav.querySelectorAll("a");
const sections = document.querySelectorAll("div[id]");

/* FUNCTIONS */

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    nav.classList.add('shrink');
  } else {
    nav.classList.remove('shrink');
  }
});

function showSlide(i) {
  index = (i + slideEls.length) % slideEls.length;
  track.style.transform = `translateX(${-index * 100}%)`;
}

function scheduleAuto() {
  clearInterval(autoTimer);
  autoTimer = setTimeout(() => {
    showSlide(index + 1);
    scheduleAuto(); // reschedule the next tick
  }, 3000);
}

document.getElementById('next').addEventListener('click', () => {
  showSlide(index + 1);
  scheduleAuto();
});
document.getElementById('prev').addEventListener('click', () => {
  showSlide(index - 1);
  scheduleAuto();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { showSlide(index + 1); scheduleAuto(); }
  if (e.key === 'ArrowLeft')  { showSlide(index - 1); scheduleAuto(); }
});

scheduleAuto();
