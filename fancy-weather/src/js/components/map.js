import { lang, changeCoordinatesLang } from './toggle_language';


function showMap(latitude, longitude) {
  const mapboxToken = 'pk.eyJ1IjoieWF1aGVuaWNoZXJrYXMiLCJhIjoiY2thcXptYnpuMXU0dTJ6bXY1c3d1Yng5bCJ9.am_mb-vcgf871-vfI08QVQ';
  mapboxgl.accessToken = mapboxToken;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 8,
  });

  const marker = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);

  const [degLat, minLat] = latitude.split('.');
  const [degLong, minLong] = longitude.split('.');

  const latcoord = Math.round(minLat * 100).toString().slice(0, 2);
  const longcoord = Math.round(minLong * 100).toString().slice(0, 2);

  let latLetter;
  latcoord > 0 ? latLetter = 'E' : latLetter = 'W';

  let longLetter;
  longcoord > 0 ? longLetter = 'N' : longLetter = 'S';

  document.querySelector('.coords__latitude').innerHTML = `<span class="latitude">Latitude</span>: ${degLat}° ${latcoord}' ${latLetter}`;
  document.querySelector('.coords__longitude').innerHTML = `<span class="longitude">Longitude</span>:  ${degLong}° ${longcoord}' ${longLetter}`;
  changeCoordinatesLang(lang.current);
}

export { showMap };
