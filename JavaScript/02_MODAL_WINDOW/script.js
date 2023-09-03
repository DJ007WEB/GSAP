"use strict";

const modal = document.querySelector(".modal");

const overlay = document.querySelector(".overlay");

const btnCloseModal = document.querySelector(".close-modal");

const btnShowModal = document.querySelectorAll(".show-modal");

for (let i = 0; i < btnShowModal.length; i++) {
  btnShowModal[i].addEventListener("click", () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

window.addEventListener("keydown", (info) => {
  if (info.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
