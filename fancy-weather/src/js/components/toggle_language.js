import { getDate } from './load_today-block';
import { daysOfWeekLong, daysOfWeekShort } from '../data/translation/date_translate';
import { latitudeCoordinates, longitudeCoordinates } from '../data/translation/coord_translate';
import { translateToRu, translateToEn, translateToBel } from '../data/translation/today-block_translate';
import { placeholder, searchBtn } from '../data/translation/input_translate';

const city = document.getElementById('city');
const country = document.getElementById('country');
const langToggler = document.getElementById('lang');

const lang = {
  prev: 'en',
  current: 'en',
};

function changeInputLang(lang) {
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.getElementById('searchInput');

  searchButton.innerHTML = `${searchBtn[lang]}`;
  searchInput.placeholder = `${placeholder[lang]}`;
}

function getTranslation(location, currentLang, prevLang) {
  const translateKeyApi = 'trnsl.1.1.20200507T185014Z.3b7c0ac1f4adaa34.c56e4715119efcd1e0058bc63b874ce36e9bc63f';
  return fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateKeyApi}&text=${location}&lang=${prevLang}-${currentLang}`)
    .then((res) => res.json());
}

async function translateLocation(currentLang, prevLang) {
  const locationCity = city.innerHTML;
  const translateCity = await getTranslation(locationCity, currentLang, prevLang);
  const cityName = translateCity.text[0];

  const locationCountry = country.innerHTML;
  const translateCountry = await getTranslation(locationCountry, currentLang, prevLang);
  const countryName = translateCountry.text[0];

  city.innerHTML = `${cityName}`;
  country.innerHTML = `${countryName}`;
}

function changeTodayBlockSummaryLang(obj) {
  const summary = document.querySelector('.today-weather__summary');
  const summaryCode = summary.dataset.code;
  const weatherObj = obj.weather;

  summary.innerHTML = `${weatherObj[summaryCode]}`;
}

function changeTodayBlockAttributesLang(obj) {
  document.querySelectorAll('.today-weather__attributes span').forEach((el) => {
    if (el.dataset.attribute) {
      const key = el.dataset.attribute;
      el.innerHTML = obj[key];
    }
  });
}

function changeTodayBlockLang(currentLang, prevLang) {
  let translateObj;

  currentLang === 'be' ? translateObj = translateToBel
    : currentLang === 'ru' ? translateObj = translateToRu : translateObj = translateToEn;

  changeTodayBlockSummaryLang(translateObj);
  changeTodayBlockAttributesLang(translateObj);
  translateLocation(currentLang, prevLang);
}

function changeCoordinatesLang(lang) {
  document.querySelector('.latitude').innerHTML = `${latitudeCoordinates[lang]}`;
  document.querySelector('.longitude').innerHTML = `${longitudeCoordinates[lang]}`;
}

function changeForecastLang(lang) {
  const longElements = document.querySelectorAll('.forecast__day-of-weak_long');
  const shortElements = document.querySelectorAll('.forecast__day-of-weak_short');

  longElements.forEach((el) => {
    el.innerHTML = daysOfWeekLong[lang][el.dataset.index];
  });
  shortElements.forEach((el) => {
    el.innerHTML = daysOfWeekShort[lang][el.dataset.index];
  });
}

langToggler.addEventListener('change', () => {
  lang.prev = lang.current;
  lang.current = langToggler.querySelector('option:checked').value;

  getDate(lang.current);
  changeForecastLang(lang.current);
  changeCoordinatesLang(lang.current);
  changeTodayBlockLang(lang.current, lang.prev);
  changeInputLang(lang.current);
});

export {
  lang, changeCoordinatesLang, changeTodayBlockLang, changeInputLang,
};
