"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const name = data.name.common;
  const flag = data.flags.svg;
  const region = data.region;
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${flag}" />
    <div class="country__data">
      <h3 class="country__name">${name}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${language}</p>
      <p class="country__row"><span>💰</span>${currency}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML("beforeend", html);

  countriesContainer.style.opacity = 1;
};

const renederError = function (errMsg) {
  countriesContainer.insertAdjacentText("beforeend", errMsg);

  countriesContainer.style.opacity = 1;
};

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  ).then((response) => {
    if(!response.ok) throw new Error(`Problem with Reverser GeoCoding ${response.status}`)

    return response.json();
}).then((data) => {
    console.log(data);
    return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`)
}).then((response) => {
    if(!response.ok) throw new Error(`Country not found ${response.status}`);

    return response.json();
}).then((data) => {
    renderCountry(data[0]);
})
   
};

whereAmI(52.508, 13.381);
