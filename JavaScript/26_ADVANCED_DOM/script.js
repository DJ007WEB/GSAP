'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach((e) => e.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');


// btnScrollTo.addEventListener('click', () => {
    
//     section1.scrollIntoView({behavior: 'smooth'});
// })


// NAVIGATION LINK SCROLLING

document.querySelector('.nav__links').addEventListener('click' , (e) => {
  e.preventDefault();

  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    console.log(id);

    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})


// BUILDING THE TAB COMPONENT

const tabContainer = document.querySelector('.operations__tab-container');

console.log(tabContainer);

const tabBtns = document.querySelectorAll('.operations__tab');

const tabContents = document.querySelectorAll('.operations__content')

tabContainer.addEventListener('click' , (e) => {
  
  const clicked = e.target.closest('.operations__tab');

 if(!clicked) return;

 // Removing Active Class from The Buttons
 tabBtns.forEach((bt) => bt.classList.remove('operations__tab--active'));

 // Removing Active Class from The Container Tabs

 tabContents.forEach((tab) => tab.classList.remove('operations__content--active'));

 // Adding The Active Class to the clicked Button
 clicked.classList.add('operations__tab--active');

 // Adding The Active Class to the Respective Content Tab

 document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

 console.log(clicked.dataset.tab);

})

// Making Hover Effect on The Nav Links

const nav = document.querySelector('.nav');

const handleHOver = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((sb) => {
      if(sb !== link) {
        sb.style.opacity = this;
      }
    })

    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover' , handleHOver.bind(0.5));

nav.addEventListener('mouseout' , handleHOver.bind(1));