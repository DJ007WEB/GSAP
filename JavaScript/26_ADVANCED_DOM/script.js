"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach((e) => e.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// btnScrollTo.addEventListener('click', () => {

//     section1.scrollIntoView({behavior: 'smooth'});
// })

// NAVIGATION LINK SCROLLING

document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// BUILDING THE TAB COMPONENT

const tabContainer = document.querySelector(".operations__tab-container");

// console.log(tabContainer);

const tabBtns = document.querySelectorAll(".operations__tab");

const tabContents = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  // Removing Active Class from The Buttons
  tabBtns.forEach((bt) => bt.classList.remove("operations__tab--active"));

  // Removing Active Class from The Container Tabs

  tabContents.forEach((tab) =>
    tab.classList.remove("operations__content--active")
  );

  // Adding The Active Class to the clicked Button
  clicked.classList.add("operations__tab--active");

  // Adding The Active Class to the Respective Content Tab

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");

  console.log(clicked.dataset.tab);
});

// Making Hover Effect on The Nav Links

const nav = document.querySelector(".nav");

const handleHOver = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;

    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((sb) => {
      if (sb !== link) {
        sb.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHOver.bind(0.5));

nav.addEventListener("mouseout", handleHOver.bind(1));

// Making Nav Bar Sticky After Header

const header = document.querySelector(".header");

const navHeight = nav.getBoundingClientRect().height;

// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Making Sections Animated

const sections = document.querySelectorAll(".section");

// console.log(sections);

const animateSec = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(animateSec, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('hidden');
});

// Lazy Loading

const lazyimg = document.querySelectorAll(".lazy-img");

// console.log(lazyimg);

const lazyImg = function (entries, observer) {
  const [entry] = entries;

  // console.log(observer);

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  lazyObserver.unobserve(entry.target);
};

const lazyObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0.15,
  rootMargin: `-200px`,
});

// console.log(lazyObserver);

lazyimg.forEach((im) => {
  lazyObserver.observe(im);
});



// Activating Slides

const slider = document.querySelector(".slider");

const slides = document.querySelectorAll(".slide");

// console.log(slider);

const sliderLeftBtn = document.querySelector(".slider__btn--left");
const sliderRightBtn = document.querySelector(".slider__btn--right");

let slideCount = 0;

const maxSlide = slides.length - 1;

// const minSlide = -(slides.length - 1);

const slideEngine = function (slideCount) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - slideCount)}%)`;
  });
};

slideEngine(0);

const nextSlide = function () {
  if (slideCount == maxSlide) {
    slideCount = 0;
  } else {
    slideCount++;
  }

  slideEngine(slideCount);
  dotHighlight(slideCount);
};
const prevSlide = function () {
  if(slideCount == 0) {
    slideCount = maxSlide;
  } else {
    slideCount--;
  }

  slideEngine(slideCount);
  dotHighlight(slideCount);
};

sliderRightBtn.addEventListener("click", nextSlide);

sliderLeftBtn.addEventListener("click", prevSlide);


document.addEventListener('keydown' , (e) => {
  console.log(e.key);
  if(e.key === 'ArrowRight') {
    nextSlide();
  } else if(e.key === 'ArrowLeft') {
    prevSlide();
  }
})


// Activating Dots

const dotContainer = document.querySelector('.dots');

const createDots = function() {
  slides.forEach((_ , i) => {
    dotContainer.insertAdjacentHTML('beforeend' , `<button class="dots__dot" data-slide="${i}"></button>`);
  })
}

createDots();


dotContainer.addEventListener('click' , (e) => {
  if(e.target.classList.contains('dots__dot')) {
    // console.log(e.target.dataset);
    const {slide} = e.target.dataset;
    slideEngine(slide);
    dotHighlight(slide);
  }
})


// Highlight the  Activated Dots 

const dotHighlight = function(slide) {
  document.querySelectorAll('.dots__dot').forEach((e) => {
    e.classList.remove('dots__dot--active')
  })

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

dotHighlight(0);