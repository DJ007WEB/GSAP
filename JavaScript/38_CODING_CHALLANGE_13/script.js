"use strict";

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector(".images");

let currentImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");

    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not Found"));
    });
  });
};

createImage("img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    console.log(`Imag 1 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";

    return createImage("img/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log("Img 2 loaded");
    return wait(2);
  }).then(() => {
    currentImg.style.display = "none";
}).catch((err) => console.log(err))
