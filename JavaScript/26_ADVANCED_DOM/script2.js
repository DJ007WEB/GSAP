"use strict";

/*==============================================================*/
// MODAL WINDOW
/*==============================================================*/

const modalWindow = function () {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");

  const btnShowModal = document.querySelector(".btn--show-modal");
  const btnCloseModal = document.querySelector(".btn--close-modal");

  btnShowModal.addEventListener("click", () => {
    modal.classList.toggle("hidden");
    overlay.classList.remove("hidden");
  });

  btnCloseModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  overlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
    modal.classList.toggle("hidden");
  });
};

/*==============================================================*/
// SMOOTH SCROLLING
/*==============================================================*/

const smoothScroll = function () {
  const nav__links = document.querySelector(".nav__links");

  const btnScrollTo = document.querySelector(".btn--scroll-to");

  const sec1 = document.querySelector("#section--1");

  btnScrollTo.addEventListener("click", () => {
    sec1.scrollIntoView({ behavior: "smooth" });
  });

  nav__links.addEventListener("click", (e) => {
    e.preventDefault();

    if (!e.target.classList.contains("nav__link")) return;

    const href = e.target.getAttribute("href");

    document.querySelector(href).scrollIntoView({ behavior: "smooth" });
  });
};

/*==============================================================*/
// TABBED COMPONENTS
/*==============================================================*/

const tabbledComponents = function () {
  const opertaionsTabContainer = document.querySelector(
    ".operations__tab-container"
  );
  const operationsTab = document.querySelectorAll(".operations__tab");

  const operaionsContent = document.querySelectorAll(".operations__content");

  opertaionsTabContainer.addEventListener("click", (e) => {
    const clicked = e.target.closest("button");

    if (!clicked) return;

    operationsTab.forEach((btn) =>
      btn.classList.remove("operations__tab--active")
    );
    operaionsContent.forEach((con) =>
      con.classList.remove("operations__content--active")
    );
    clicked.classList.add("operations__tab--active");

    document
      .querySelector(
        `.operations__content--${clicked.getAttribute("data-tab")}`
      )
      .classList.add("operations__content--active");
  });
};

/*==============================================================*/
// REVEALING ON SCROLL
/*==============================================================*/

const revealAnimation = function () {
  const allSections = document.querySelectorAll(".section");

  const revealSec = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    secObserve.unobserve(entry.target);
  };

  const secObserve = new IntersectionObserver(revealSec, {
    root: null,
    threshold: 0.15,
  });

  allSections.forEach((sec) => {
    secObserve.observe(sec);
    sec.classList.add("section--hidden");
  });
};

/*==============================================================*/
// FADDING NAV LINKS
/*==============================================================*/

const handleHoverFeature = function () {
  const nav__links = document.querySelector(".nav__links");
  const handleHover = function (e) {
    if (e.target.classList.contains("nav__link")) {
      const link = e.target.closest(".nav");

      link.querySelectorAll(".nav__link").forEach((l) => {
        if (e.target != l) {
          l.style.opacity = this;
        }
        link.querySelector("img").style.opacity = this;
      });
    }
  };

  nav__links.addEventListener("mouseover", handleHover.bind(0.5));

  nav__links.addEventListener("mouseout", handleHover.bind(1));
};

/*==============================================================*/
// LAZY LOADING
/*==============================================================*/

const lazyLoadingFeature = function () {
  const lazyImgs = document.querySelectorAll("img[data-src]");

  const lazyLoad = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", () => {
      entry.target.classList.remove("lazy-img");
    });

    imgObserve.unobserve(entry.target);
  };

  const imgObserve = new IntersectionObserver(lazyLoad, {
    root: null,
    threshold: 0,
    rootMargin: "-150px",
  });

  lazyImgs.forEach((img) => imgObserve.observe(img));
};

/*==============================================================*/
// SILDER COMPONENT
/*==============================================================*/

const sliderComponent = function () {
  const slides = document.querySelectorAll(".slide");

  const slider = document.querySelector(".slider");

  const btnRight = document.querySelector(".slider__btn--right");
  const btnleft = document.querySelector(".slider__btn--left");

  const dotContainer = document.querySelector(".dots");

  let slideCount = 0;

  const maxSlide = slides.length;

  // FUNCTIONS

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class = "dots__dot" data-slide = "${i}"><button/>`
      );
    });
  };
  const activeDot = function (slide) {
    const dots = document.querySelectorAll(".dots__dot");
    dots.forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  const slideEngine = function (slideCount) {
    slides.forEach(
      (slider, i) =>
        (slider.style.transform = `translateX(${100 * (i - slideCount)}%)`)
    );
  };
  const nextSlide = function () {
    if (slideCount === maxSlide - 1) {
      slideCount = 0;
    } else {
      slideCount++;
    }
    slideEngine(slideCount);
    activeDot(slideCount);
  };
  const prevSlide = function () {
    if (slideCount === 0) {
      slideCount = maxSlide - 1;
    } else {
      slideCount--;
    }
    slideEngine(slideCount);
    activeDot(slideCount);
  };

  const init = function () {
    createDots();
    activeDot(0);
    slideEngine(0);
  };

  init();

  // EVENT LISTENER

  btnRight.addEventListener("click", nextSlide);

  btnleft.addEventListener("click", prevSlide);

  dotContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("dots__dot")) return;

    // console.log();

    slideEngine(e.target.dataset.slide);
    activeDot(e.target.dataset.slide);
  });
};



/*==============================================================*/
// ACTIVATING THE SCRIPT
/*==============================================================*/

const startAtPageLoad = function () {
  modalWindow();
  smoothScroll();
  tabbledComponents();
  revealAnimation();
  handleHoverFeature();
  lazyLoadingFeature();
  sliderComponent();
};

startAtPageLoad();
