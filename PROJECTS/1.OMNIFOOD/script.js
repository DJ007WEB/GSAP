const header = document.querySelector(".header");
const mobile_nav = document.querySelector(".mobile-nav");

mobile_nav.addEventListener("click", () => {
  header.classList.toggle("nav-open");
});

// IMPLEMENTING SMOOTH SCROLLING

const links = document.querySelectorAll("a:link");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const href = link.getAttribute("href");

    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (href !== "#" && href.startsWith("#")) {
      console.log(href);
      const section = document.querySelector(href);

      // console.log(section);

      section.scrollIntoView({ behavior: "smooth" });

      //   console.log(href);
    }

    if(link.classList.contains('header-nav-links')) {
        header.classList.toggle("nav-open");
    }
  });
});


// STICKY NAVIGATION BAR

const secHero = document.querySelector('.hero-sec');


const obs = new IntersectionObserver(function(entries){
    const ent = entries[0];
    // console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
},{
    root: null,
    threshold:0,
    rootMargin: '-100px'
});


obs.observe(secHero);
