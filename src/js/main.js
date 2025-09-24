/* Your JS here. */
console.log("Hello World!")

document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------------
   * 1) ELEMENT REFERENCES
   * ---------------------------------*/
  const nav = document.getElementById("Navbar");
  const track = document.getElementById("slides");
  const slideEls = track ? Array.from(track.children) : [];
  const links = nav ? nav.querySelectorAll("a") : [];
  const sections = document.querySelectorAll("section[id]");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  /* -----------------------------------
   * 2) STATE
   * ---------------------------------*/
  let slideIndex = 0;
  let autoTimerId;

  /* -----------------------------------
   * 3) UTILS
   * ---------------------------------*/
  function setNavHeightVar() {
    if (!nav) return;
    document.documentElement.style.setProperty("--navH", nav.offsetHeight + "px");
  }

  function updateNavbarShrink() {
    if (!nav) return;
    if (window.scrollY > 0) {
      nav.classList.add("shrink");
    } else {
      nav.classList.remove("shrink");
    }
    // Keep the CSS var in sync when height changes due to shrinking
    setNavHeightVar();
  }

  function highlightActiveLink() {
    if (!nav || sections.length === 0) return;

    const navBottom = nav.getBoundingClientRect().bottom;
    let currentSection = sections[0];

    for (const sec of sections) {
      const top = sec.getBoundingClientRect().top;
      if (top - navBottom <= 1) {
        currentSection = sec;
      } else {
        break;
      }
    }

    links.forEach(link => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === "#" + currentSection.id);
    });
  }

  /* -----------------------------------
   * 4) CAROUSEL
   * ---------------------------------*/
  function showSlide(i) {
    if (!track || slideEls.length === 0) return;
    slideIndex = (i + slideEls.length) % slideEls.length;
    track.style.transform = `translateX(${-slideIndex * 100}%)`;
  }

  function scheduleAuto() {
    clearTimeout(autoTimerId);
    autoTimerId = setTimeout(() => {
      showSlide(slideIndex + 1);
      scheduleAuto(); // loop
    }, 5000);
  }

  /* -----------------------------------
   * 5) MODALS (open/close)
   * ---------------------------------*/
  document.querySelectorAll("button.open").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.target;
      const modal = document.getElementById(id);
      if (modal) modal.classList.add("show");
      document.body.style.overflow = "hidden"; // prevent background scroll
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) {
      const modal = e.target.closest(".modal");
      if (modal) modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.show").forEach(m => m.classList.remove("show"));
      document.body.style.overflow = "";
    }
  });

  /* -----------------------------------
   * 6) EVENT BINDINGS
   * ---------------------------------*/
  // Carousel controls
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(slideIndex + 1);
      scheduleAuto();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(slideIndex - 1);
      scheduleAuto();
    });
  }

  // Scroll-driven UI updates (shrink navbar + highlight active link)
  window.addEventListener("scroll", () => {
    updateNavbarShrink();
    highlightActiveLink();
  });

  // Keep --navH up to date on load & resize
  window.addEventListener("load", setNavHeightVar);
  window.addEventListener("resize", setNavHeightVar);

  // Update highlight on in-page hash navigation
  window.addEventListener("hashchange", highlightActiveLink);

  // Clicking a nav link: run highlight immediately (no duplicate listeners needed)
  links.forEach(link => {
    link.addEventListener("click", highlightActiveLink);
  });

  /* -----------------------------------
   * 7) INITIALIZE
   * ---------------------------------*/
  setNavHeightVar();
  updateNavbarShrink();
  highlightActiveLink();
  showSlide(0);
  scheduleAuto();
});