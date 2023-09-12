'use strict';


let f;

(function() {
    const header = document.querySelector('h1');
    f = header;
})();


document.body.addEventListener('click', () => {
    f.style.color = "red";
})