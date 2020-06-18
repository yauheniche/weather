const tempToggler = document.getElementById('tempToggle');
const celsiusBtn = document.getElementById('celsius-btn');
const fahrenheitBtn = document.getElementById('fahrenheit-btn');

function covertToFahrenheit() {
  const tempList = document.querySelectorAll('.temperature');
  fahrenheitBtn.classList.add('checked');
  celsiusBtn.classList.remove('checked');

  tempList.forEach((el) => {
    const innerValue = +el.innerHTML.slice(0, -1);
    el.innerHTML = `${Math.round((innerValue * 9 / 5) + 32)}&#176;`;
  });
}

function covertToCelsius() {
  const tempList = document.querySelectorAll('.temperature');

  celsiusBtn.classList.add('checked');
  fahrenheitBtn.classList.remove('checked');

  tempList.forEach((el) => {
    const innerValue = +el.innerHTML.slice(0, -1);
    return el.innerHTML = `${Math.round((innerValue - 32) * 5 / 9)}&#176;`;
  });
}


tempToggler.addEventListener('click', (e) => {
  tempToggler.querySelectorAll('.item').forEach((a) => a.classList.remove('active'));
  e.target.classList.add('active');

  if (fahrenheitBtn.classList.contains('active')) {
    covertToFahrenheit();
  } else if (celsiusBtn.classList.contains('active')) {
    covertToCelsius();
  }
});


export { covertToFahrenheit };
