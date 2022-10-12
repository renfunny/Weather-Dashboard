var headrCity = document.querySelector(`.city-name`);
var headerIcon = document.querySelector(`.header-icon`);
var headrTemp = document.querySelector(`.temp`);
var headrWind = document.querySelector(`.wind`);
var headrHumi = document.querySelector(`.humidity`);
var submitBtn = document.querySelector(`#submit`);
var city = `Toronto`;

function searchCity() {
  // var city = document.querySelector(`#city-input`).value;
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e6da1e8cc496bc4a35c7b3be35019893&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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
    });
}
submitBtn.addEventListener(`click`, searchCity);
