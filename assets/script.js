//variables for dom elements
var forecastEl = document.querySelector(`.forecast`);
var headrCity = document.querySelector(`.city-name`);
var headerIcon = document.querySelector(`.header-icon`);
var headrTemp = document.querySelector(`.temp`);
var headrWind = document.querySelector(`.wind`);
var headrHumi = document.querySelector(`.humidity`);
var submitBtn = document.querySelector(`#submit`);
var storedCities = document.querySelector(`.stored-cities`);
var cities = [];
//Functions (numbered in order)

// 3. Clears the previous buttons and repopulates them again with the updated arr list
function displayNewbtns() {
  storedCities.innerHTML = "";
  btnList.forEach((element) => {
    var btn = document.createElement(`button`);
    btn.textContent = element;
    btn.classList.add(`city-btn`);
    storedCities.appendChild(btn);
  });
  var storedCitybtn = document.querySelectorAll(`.city-btn`);
  // adds the click event to all the buttons
  for (let i = 0; i < btnList.length; i++) {
    storedCitybtn[i].addEventListener(`click`, function () {
      document.querySelector(`#city-input`).value = this.innerText;
      searchCity();
    });
  }
}

// 2. This will save the city previously searched in an array in the local storage
function SaveDataToLocalStorage(city) {
  cities = JSON.parse(localStorage.getItem("savedCities")) || [];
  if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem("savedCities", JSON.stringify(cities));
  }
  // updates the list so it matches the arr in the local storage
  btnList = JSON.parse(localStorage.getItem("savedCities"));
  document.querySelector(`#city-input`).value = "";
  displayNewbtns();
}

// 1. checks if a valid city has been passed, once its done it will call the api and using that data it will populate the dom elements and remove the hidden class so it is displayed on the screen
function searchCity() {
  var city = document.querySelector(`#city-input`).value;
  if (city) {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e6da1e8cc496bc4a35c7b3be35019893&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        forecastEl.classList.remove(`hidden`);
        headrCity.textContent = `${data.city.name} (${
          data.list[0].dt_txt.split(` `)[0]
        }) `;
        headerIcon.src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
        headrTemp.textContent = `Temp: ${data.list[0].main.temp}°C`;
        headrWind.textContent = `Wind: ${data.list[0].wind.speed} MPH`;
        headrHumi.textContent = `Humidity: ${data.list[0].main.humidity}%`;
        for (let i = 0; i < 39; i = i + 8) {
          document.querySelector(`.card-${i}`).children[0].textContent = `${
            data.list[i].dt_txt.split(` `)[0]
          }`;
          document.querySelector(
            `.card-${i}`
          ).children[1].src = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
          document.querySelector(
            `.card-${i}`
          ).children[2].textContent = `Temp: ${data.list[i].main.temp}°C`;
          document.querySelector(
            `.card-${i}`
          ).children[3].textContent = `Wind: ${data.list[i].wind.speed} MPH`;
          document.querySelector(
            `.card-${i}`
          ).children[4].textContent = `Humidity: ${data.list[0].main.humidity}%`;
        }
        SaveDataToLocalStorage(city);
      });
  } else return;
}

// Displays the cities saved in the local storage as buttons when the page first loads up
var btnList = JSON.parse(localStorage.getItem("savedCities"));
if (btnList !== null) {
  btnList.forEach((element) => {
    var btn = document.createElement(`button`);
    btn.classList.add(`city-btn`);
    btn.textContent = element;
    storedCities.appendChild(btn);
  });
}

// Makes the Search btn call function #1
submitBtn.addEventListener(`click`, searchCity);

// Adds the click events to all buttons when the page first loads up
var storedCitybtn = document.querySelectorAll(`.city-btn`);
for (let i = 0; i < storedCitybtn.length; i++) {
  storedCitybtn[i].addEventListener(`click`, function () {
    document.querySelector(`#city-input`).value = this.innerText;
    searchCity();
  });
}
