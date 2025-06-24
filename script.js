const mainParent = document.querySelector('#mainParent');
const apiKey = 'YOUR_API_KEY_HERE'; // ضع مفتاح WeatherAPI الحقيقي هنا

function getWeather() {
  const cityName = document.querySelector('#cityInput').value.trim();

  if (!cityName) {
    alert('Please enter a city name');
    return;
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=no&alerts=no`;

  mainParent.innerHTML = ''; // Clear previous results

  axios.get(url)
    .then((response) => {
      const location = response.data.location;
      const current = response.data.current;
      const forecastDays = response.data.forecast.forecastday;

      // ✔️ الطقس الحالي
      const currentBox = document.createElement('div');
      currentBox.className = 'weather-box';
      currentBox.innerHTML = `
        <h2>🌍 ${location.name}, ${location.country}</h2>
        <h3>🌤️ Current Weather</h3>
        <img src="https:${current.condition.icon}" alt="icon" width="60">
        <p>🌡️ Temperature: ${current.temp_c}°C</p>
        <p>☁️ Condition: ${current.condition.text}</p>
      `;
      mainParent.appendChild(currentBox);

      // ✔️ التوقعات للأيام القادمة
      forecastDays.forEach(day => {
        const box = document.createElement('div');
        box.className = 'weather-box';
        box.innerHTML = `
          <h3>📅 ${day.date}</h3>
          <img src="https:${day.day.condition.icon}" alt="icon" width="60">
          <p>🌡️ Avg Temp: ${day.day.avgtemp_c}°C</p>
          <p>☁️ Condition: ${day.day.condition.text}</p>
          <p>💧 Humidity: ${day.day.avghumidity}%</p>
        `;
        mainParent.appendChild(box);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      mainParent.innerHTML = `<p style="color:red;">⚠️ Could not load weather for "${cityName}". Please check the name or try again later.</p>`;
    });
}
