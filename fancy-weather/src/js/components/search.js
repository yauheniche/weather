import { lang } from './toggle_language';
import { currentTime } from '../main';
import { showMap } from './map';
import {
  getCity, getTodayInfo, getWeatherForecast, getCurrentWeather,
} from './load_today-block';
import { getForecast } from './load_forecast';
import { daysOfWeekShort, monthNames } from '../data/translation/date_translate';
import { errorMessage } from '../data/translation/error-message_translate';
import { getLinkToImage, showImage } from './change_background';


const form = document.getElementById('form');
const searchInput = document.getElementById('searchInput');
const error = document.getElementById('error-message');
const forecastElem = document.getElementById('forecast');

function getCoordinatesFromInput(city) {
  const weatherToken = 'bc28e5954a224da39d4c88db7430bd21';
  // const weatherToken ='e58a598b7e264313b01fb93b81a7893d'
  return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=4&units=S&lang=${lang.current}&key=${weatherToken}`)
    .then((res) => res.json());
}

function getDate(lang, timezone) {
  const date = document.getElementById('date');
  let requestLang = lang;

  if (!requestLang) requestLang = 'en';

  const dateLoc = new Date().toLocaleString('en', { timeZone: timezone });
  const dateInPlace = new Date(dateLoc);

  const dayOfWeekArr = daysOfWeekShort[requestLang];
  const todayDayOfWeakIndex = dateInPlace.getDay();
  const todayMonthIndex = dateInPlace.getMonth();

  date.innerHTML = '';
  date.innerHTML = `
    <span class="today__day-of-weak">${dayOfWeekArr[todayDayOfWeakIndex]}</span>
    <span class="today__day-of-month">${dateInPlace.getDate()}</span>
    <span class="today__month">${monthNames[requestLang][todayMonthIndex]}</span>`;
}


async function initFromInput() {
  try {
    const locationInfo = await getCoordinatesFromInput(searchInput.value);
    const {
      lat, lon, city_name, country_code, timezone,
    } = locationInfo;

    showMap(lat, lon);

    const forecast = await getWeatherForecast(city_name, country_code, lang.current);
    const { data } = forecast;

    getCity(country_code, city_name);
    forecastElem.innerHTML = '';
    getForecast(data, lang.current);

    const today = await getCurrentWeather(city_name, country_code);
    const [todayInfo] = today.data;

    document.querySelector('.today-weather__attributes').remove();

    getDate(lang.current, timezone);
    getTodayInfo(todayInfo, data);
    currentTime.timezone = timezone;

    const bgImage = await getLinkToImage(city_name, currentTime.timezone);
    const { urls } = bgImage;
    showImage(urls.regular);
  } catch {
    error.innerHTML = `${errorMessage[lang.current]}`;
    error.classList.remove('hidden');
    setTimeout(() => {
      error.classList.add('hidden');
    }, 3000);
  }
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  initFromInput(lang.current);
});

export { initFromInput };
