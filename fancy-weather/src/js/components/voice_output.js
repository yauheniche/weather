import { lang } from './toggle_language';
import { initFromInput } from './search';

const sayBtn = document.getElementById('say-btn');
const city = document.getElementById('city');
const country = document.getElementById('country');

function say(text) {
  const message = new SpeechSynthesisUtterance();
  message.lang = lang.current;
  message.lang === 'ru' ? message.text = `Погода в городе ${text}`
    : message.lang === 'en' ? message.text = `Today in ${text}`
      : message.text = `Сёняшняе надвор е у гораде ${text}`;

  window.speechSynthesis.speak(message);
}


sayBtn.addEventListener('click', () => {
  const attributes = document.querySelector('.today-weather__attributes');

  const forecast = [city, country, attributes]
    .map((el) => el.textContent)
    .join(',');
  say(forecast);
});
