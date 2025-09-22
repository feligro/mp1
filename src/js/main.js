/* Your JS here. */
console.log('Hello World!')

const nav = document.getElementById('Navbar');

const track = document.getElementById('slides');
const slideEls = Array.from(track.children);
let index = 0;
let autoTimer;

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
  clearTimeout(autoTimer);
  autoTimer = setTimeout(() => {
    showSlide(index + 1);
    scheduleAuto(); // reschedule the next tick
  }, 5000);
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

function highlightLink() {
  const navBottom = nav.getBoundingClientRect().bottom;
  let current = sections[0];

  for (const sec of sections) {
    const top = sec.getBoundingClientRect().top;
    if (top - navBottom <= 1) {
      current = sec;
    } else {
      break;
    }
  }

  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current.id);
  });
}

function setNavHeightVar() {
  document.documentElement.style.setProperty('--navH', nav.offsetHeight + 'px');
}

/* TRIGGERS */

scheduleAuto();
setNavHeightVar();

window.addEventListener('resize', setNavHeightVar);
window.addEventListener('scroll', setNavHeightVar);
window.addEventListener('load', setNavHeightVar);
window.addEventListener("scroll", highlightLink);
window.addEventListener("hashchange", highlightLink);

links.forEach(link => {
  link.addEventListener("click", () => {
    highlightLink();
  });
});

highlightLink();