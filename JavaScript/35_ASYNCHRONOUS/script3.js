"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

////////////////////////////////////

const renderCountry = function (data, className = "") {
  const name = data.name.common;
  const flag = data.flags.svg;
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;

  // console.log(flag);

  const html = `<article class="country ${className}">
  <img class="country__img" src="${flag}" />
  <div class="country__data">
    <h3 class="country__name">${name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} People</p>
    <p class="country__row"><span>🗣️</span>${language}</p>
    <p class="country__row"><span>💰</span>${currency}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);

  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);

  countriesContainer.style.opacity = 1;
};

// AJAX CALL

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();

//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

//   request.send();

//   request.addEventListener("load", function () {
//     // console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);

//     // console.log(data);

//     renderCountry(data);

//     // NEIGHBOUR COUNTRY

//     const neighbour = data.borders?.[0];

//     const request2 = new XMLHttpRequest();

//     request2.open('GET',`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function() {
//       // console.log(this.responseText);

//       const [data2] = JSON.parse(this.responseText);

//       // console.log(data2);

//       renderCountry(data2, 'neighbour');
//     })
//   });
// };

// getCountryData("india");
// getCountryData("bhutan");

// const request = fetch(`https://restcountries.com/v3.1/name/india`);

// USING PROMISES

const getJSON = function (url, errorMsg = `Something Went Wrong`) {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

    return res.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`)
    .then((data) => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];

      // console.log(neighbour);

      if (!neighbour) throw new Error(`No Neighbour country found`);

      // const neighbour = 'dfdsfsf'

      // NEIGHBOURING COUNTRY

      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((data) => {
      // console.log(data);
      renderCountry(data[0], "neighbour");
    })
    .catch((err) => {
      console.log(`${err}`);
      renderError(`Something went wrong ${err.message}. Try Again`);
    });
};

// btn.addEventListener("click", function () {
//   getCountryData("india");
// });

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then((res) => {
//       if (!res.ok) throw new Error(`Problem with geocoding`);
//       return res.json();
//     })
//     .then((data) => {
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Unable to find Country`);
//       return res.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//     })
//     .catch((err) => {
//       console.log(`${err}`);
//       renderError(`Something went wrong. ${err.message}`);
//     });
// };

// whereAmI(52.508, 13.381);

// PROMISES

// const lotteryPromis = new Promise(function (resolve, reject) {
//   console.log(`Lottery is happening`);

//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve(`You won the Lottery`);
//     } else {
//       reject(new Error(`You lost the money`));
//     }
//   }, 2000);
// });

// lotteryPromis
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2).then(() => console.log(`Waited for 2 seconds`));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition()
//   .then((res) => console.log(res.coords))
//   .catch((err) => console.log(err));

// const whereAmI = function () {
//   getPosition()
//     .then((res) => {
//       console.log(res);
//       const { latitude: lat, longitude: lng } = res.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })

//     .then((res) => {
//       console.log(res);
//       if (!res.ok) throw new Error(`Problem with geocoding`);
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Unable to find Country`);
//       return res.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//     })
//     .catch((err) => {
//       console.log(`${err}`);
//       renderError(`Something went wrong. ${err.message}`);
//     });
// };

// btn.addEventListener("click", whereAmI);

const whereAmI = async function () {
  try {
    const pos = await getPosition();

    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error(`Problem in getting Geocoding`);

    const dataGeo = await resGeo.json();

    console.log(dataGeo);

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );

    if (!res.ok) throw new Error(`Problem in getting the details`);

    const data = await res.json();

    console.log(data);

    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong ${err.message}`);
    throw err;
  }
};

// whereAmI().then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// })

// (async function () {
//   try {
//     const res = await whereAmI();
//     console.log(res);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// PROMISES COMBINATOR

// const getThreeCountries = async function (c1, c2, c3) {
//   try {
//     // const [res1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [res2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [res3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

//     // console.log(res1, res2, res3);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);

//     console.log(data);
//     console.log(data.map(d => d[0].capital[0]));
//   } catch (error) {
//     console.log(error);
//   }
// };

// getThreeCountries("india", "bangladesh", "bhutan");

// PROMISE RACE

const timeOut = function (secs) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Response took too long`));
    }, secs * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/bhutan`),
  timeOut(0.25),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

Promise.any([
  Promise.resolve("Resolved"),
  Promise.reject("Reject"),
  getJSON(`https://restcountries.com/v3.1/name/bhutan`),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
