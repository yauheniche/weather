import { getIcon } from './load_today-block';
import { iconLink } from '../data/iconLink';
import { daysOfWeekLong, daysOfWeekShort } from '../data/translation/date_translate';

const forecast = document.getElementById('forecast');

function getForecast(forecastArray, lang) {
  const [firstDay, secondDay, thirdDay] = forecastArray;
  const forecastThreeDaysArray = forecastArray.slice(1);

  forecastThreeDaysArray.forEach((el) => {
    let requestLang = lang;
    const { weather, temp, datetime } = el;
    const dayOfWeekIndex = new Date(datetime).getDay();

    const item = document.createElement('div');
    item.classList.add('forecast__item');

    if (!requestLang) requestLang = 'en';

    const dayOfWeekLongArr = daysOfWeekLong[requestLang];
    const dayOfWeekShortArr = daysOfWeekShort[requestLang];

    const mainIcon = getIcon(iconLink[weather.code]);
    item.innerHTML = `
      <span class="forecast__day-of-weak_long" data-index=${dayOfWeekIndex}>${dayOfWeekLongArr[dayOfWeekIndex]}</span>
      <span class="forecast__day-of-weak_short" data-index=${dayOfWeekIndex}>${dayOfWeekShortArr[dayOfWeekIndex]}</span>
      <div class="forecast__weather">
        <div class="forecast__temperature temperature">${Math.round(temp - 273, 15)}&#176;</div>
        <div class="forecast__img"></div>
      </div>`;
    item.querySelector('.forecast__img').append(mainIcon);
    forecast.append(item);
  });
}

export { getForecast };
