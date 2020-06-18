import { iconLink } from '../data/iconLink';
import { daysOfWeekShort, monthNames } from '../data/translation/date_translate';
import { getCountryName } from '../data/countryName';
import { lang, changeTodayBlockLang } from './toggle_language';

const mainIconContainer = document.getElementById('main-icon__container');
const city = document.getElementById('city');
const country = document.getElementById('country');

function getLocation() {
  const locationToken = '77070a50b62361';
  return fetch(`https://ipinfo.io/json?token=${locationToken}`)
    .then((res) => res.json());
}

function getWeatherForecast(city, countryCode, lang) {
  const weatherToken = 'bc28e5954a224da39d4c88db7430bd21';
  // const weatherToken ='e58a598b7e264313b01fb93b81a7893d'
  return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${countryCode}&days=4&units=S&lang=${lang}&key=${weatherToken}`)
    .then((res) => res.json());
}

function getCurrentWeather(city, countryCode) {
  const weatherToken = 'bc28e5954a224da39d4c88db7430bd21';
  // const weatherToken ='e58a598b7e264313b01fb93b81a7893d'
  return fetch(`https://api.weatherbit.io/v2.0/current?city=${city},${countryCode}&key=${weatherToken}`)
    .then((res) => res.json());
}

function getCity(userCountry, userCity) {
  city.innerHTML = `${userCity} `;
  country.innerHTML = getCountryName(userCountry);
}

function getIcon(iconCode) {
  const mainIcon = document.createElement('img');
  mainIcon.src = `${iconCode}`;
  return mainIcon;
}

function renderTime(zone) {
  if (!zone) return false;
  const dateLoc = new Date().toLocaleString('en', { timeZone: zone });
  const dateInPlace = new Date(dateLoc);
  document.querySelector('.today__time').innerHTML = `${dateInPlace.toLocaleTimeString({ timeZone: zone })}`;
  return `${dateInPlace.toLocaleTimeString({ timeZone: zone })}`;
}

function getDate(lang) {
  const date = document.getElementById('date');
  let requestLang = lang;

  if (!requestLang) requestLang = 'en';

  const dateToday = new Date();
  const dayOfWeekArr = daysOfWeekShort[requestLang];
  const todayDayOfWeakIndex = dateToday.getDay();
  const todayMonthIndex = dateToday.getMonth();

  date.innerHTML = `
    <span class="today__day-of-weak">${dayOfWeekArr[todayDayOfWeakIndex]}</span>
    <span class="today__day-of-month">${dateToday.getDate()}</span>
    <span class="today__month">${monthNames[requestLang][todayMonthIndex]}</span>`;
}

function getTodayInfo(data) {
  mainIconContainer.innerHTML = '';

  const {
    weather, app_temp, wind_spd, rh, temp,
  } = data;
  const mainIcon = getIcon(iconLink[weather.code]);
  mainIconContainer.append(mainIcon);

  const info = document.createElement('div');
  info.classList.add('today-weather__attributes');
  info.innerHTML = `
    <p class="today-weather__summary" data-code=${weather.code} >${weather.description}</p>
    <p class="today-weather__apparent"><span data-attribute="feel">FEELS LIKE</span>: <span class="temperature">${Math.round(app_temp)}&#176;</span></p>
    <p class="today-weather__wind"><span data-attribute="wind">WIND</span>: ${Math.round(wind_spd)} <span data-attribute="ms">M/S</span></p>
    <p class="today-weather__humidity"><span data-attribute="humidity">HUMIDITY</span>: ${rh}%</p>`;

  document.querySelector('.today-weather__temperature').innerHTML = `${Math.round(temp)}&#176;`;
  document.querySelector('.today-weather__description').append(info);
  changeTodayBlockLang(lang.current, lang.prev);
}
export {
  getIcon, getDate, renderTime, getCity, getLocation, getTodayInfo, getWeatherForecast, getCurrentWeather,
};
