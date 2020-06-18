import { renderTime } from './load_today-block';

const app = document.querySelector('.app-wrapper');
const refreshBtn = document.querySelector('.bg-refresh');
const cityCont = document.getElementById('city');


function addBgParameters(city, zone) {
  renderTime(zone);
  const parametersArr = [];

  let hours;
  if (zone) {
    hours = +renderTime(zone).toString().split(':')[0];
  } else {
    hours = +document.querySelector('.today__time').innerHTML.toString().split(':')[0].trim();
  }

  let hoursOfDay;
  (hours >= 12 && hours < 18) ? hoursOfDay = 'day'
    : (hours >= 18 && hours < 24) ? hoursOfDay = 'evening'
      : (hours >= 0 && hours < 6) ? hoursOfDay = 'night' : 'morning';

  parametersArr.push(city.trim(), hoursOfDay);
  return parametersArr.join(',');
}

function getLinkToImage(city, zone) {
  const id = '1c8bb94382e66d67c9fb3cd9d7ecb773c564e0b197533a0e3634dd026060b109';
  // const id = 'e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17'; //example
  addBgParameters(city, zone);
  const url = `https://api.unsplash.com/photos/random?query=${addBgParameters(city, zone)},city,summer,weather&client_id=${id}`;
  console.log(url);
  return fetch(url)
    .then((res) => res.json());
}
function showImage(url) {
  const img = new Image(100, 200);
  img.src = url;
  img.addEventListener('load', () => {
    app.style.cssText = `background: center / cover no-repeat url(' ${url}')`;
  });
}

refreshBtn.addEventListener('click', async () => {
  const data = await getLinkToImage(cityCont.innerHTML);
  const { urls } = data;
  showImage(urls.regular);
});

export { showImage, getLinkToImage };
