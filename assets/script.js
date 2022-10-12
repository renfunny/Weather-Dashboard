var headrCity = document.querySelector(`.city-name`);
var headrTemp = document.querySelector(`.temp`);
var headrWind = document.querySelector(`.wind`);
var headrHumi = document.querySelector(`.humidity`);
var input = document.querySelector(`#city-input`).value;
var city = `Toronto`;

fetch(
  `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e6da1e8cc496bc4a35c7b3be35019893&units=metric`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    headrCity.textContent = `${data.city.name} (${
      data.list[0].dt_txt.split(` `)[0]
    })`;
    headrTemp.textContent = `Temp: ${data.list[0].main.temp}°C`;
    headrWind.textContent = `Wind: ${data.list[0].wind.speed} MPH`;
    headrHumi.textContent = `Humidity: ${data.list[0].main.humidity}%`;
  });
