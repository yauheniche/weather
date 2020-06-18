import { showMap } from './components/map';
import { covertToFahrenheit } from './components/toggle_temperature';
import { lang, changeInputLang } from './components/toggle_language';
import './components/search';
import { getLinkToImage, showImage } from './components/change_background';
import './components/voice_input';
import './components/voice_output';
import './components/keyboard';
import './components/contacts'

import { getForecast } from './components/load_forecast';
import {
  getCity, getDate, renderTime, getLocation, getTodayInfo, getWeatherForecast, getCurrentWeather,
} from './components/load_today-block';


const app = document.getElementById('app');
const tempToggler = document.getElementById('tempToggle');
const langToggle = document.getElementById('lang');
const celsiusBtn = document.getElementById('celsius-btn');


const currentTime = {
  timezone: '',
};

async function init(lang) {
  const location = await getLocation();
  const { country, city, loc } = location;

  const [latitude, longitude] = loc.split(',');
  showMap(latitude, longitude, lang);

  const forecast = await getWeatherForecast(city, country, lang);
  const { data } = forecast;

  const today = await getCurrentWeather(city, country);
  const [todayInfo] = today.data;
  const fahrenheitBtn = document.getElementById('fahrenheit-btn');


  getCity(country, city);
  getForecast(data, lang);
  getDate(lang);

  getTodayInfo(todayInfo, data);
  currentTime.timezone = todayInfo.timezone;

  const bgImage = await getLinkToImage(city, currentTime.timezone);
  const { urls } = bgImage;
  showImage(urls.regular);

  if (fahrenheitBtn.classList.contains('active')) {
    covertToFahrenheit();
  }
  app.classList.add('visible');
}


setInterval(() => {
  renderTime(currentTime.timezone);
}, 500);

document.addEventListener('DOMContentLoaded', () => {
});

window.addEventListener('load', () => {
  const activeId = localStorage.getItem('active');

  lang.current = localStorage.getItem('lang') || 'en';

  if (lang.current != 'en') {
    langToggle.querySelectorAll('option').forEach((el) => {
      el.removeAttribute('selected');
    });
    langToggle.querySelector(`[value=${lang.current}]`).selected = true;
  }

  if (activeId) {
    document.getElementById(`${activeId}`).classList.add('active');
  } else {
    celsiusBtn.classList.add('active');
  }
  init(lang.current);
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('active', `${tempToggler.querySelector('.active').id}`);
  localStorage.setItem('lang', `${lang.current}`);
});

export { currentTime };
