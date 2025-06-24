const mainParent = document.querySelector('#mainParent');
const apiKey = 'f0630cd7e73f0aefe4425826d32ecc8e'; // ← استخدم مفتاحك من openweathermap.org

function getWeather() {
  const cityName = document.querySelector('#cityInput').value.trim();
  if (!cityName) {
    alert('Please enter a city name');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  mainParent.innerHTML = ''; // Clear old results

  axios.get(url)
    .then((response) => {
      const forecasts = response.data.list;
      const limitedForecasts = forecasts.filter((_, i) => i % 8 === 0); // كل 24 ساعة تقريبًا

      limitedForecasts.forEach(forecast => {
        const time = forecast.dt_txt;
        const temp = forecast.main.temp;
        const desc = forecast.weather[0].description;
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const box = document.createElement('div');
        box.className = 'weather-box';
        box.innerHTML = `
          <h3>${time}</h3>
          <img src="${iconUrl}" alt="icon" width="60">
          <p>🌡️ Temperature: ${temp}°C</p>
          <p>☁️ Weather: ${desc}</p>
        `;
        mainParent.appendChild(box);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      mainParent.innerHTML = `<p style="color:red;">⚠️ Could not load weather for "${cityName}". Please check the name.</p>`;
    });
}
