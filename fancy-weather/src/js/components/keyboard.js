const keyboardOpener = document.getElementById('keyboardOpener');
const keyboard = document.getElementById('keyboard');
const searchInput = document.getElementById('searchInput');


const buttonsCode = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Backspace',
  'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'ru-en',
  'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period',
  'Space'];

const buttonsLowerLatin = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Ru',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
  'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.',
  ' '];

const buttonsLowerRus = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace',
  'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'En',
  'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю',
  ' '];

function addLowerButtons(keys) {
  buttonElement = '';
  buttonsCode.forEach((el, index) => {
    buttonElement += `<div class = 'key ${el}'>${keys[index]}</div>`;
  });
  keyboard.innerHTML = buttonElement;
}

function switchKeyboard() {
  if (keyboard.classList.contains('latin')) {
    addLowerButtons(buttonsLowerRus);
  } else {
    addLowerButtons(buttonsLowerLatin);
  }
  keyboard.classList.toggle('latin');
}

function addSymbolToInput(event) {
  const notAddedToInputClasses = ['ru-en', 'Enter', 'Backspace'];

  const checkClassArr = notAddedToInputClasses.map((el) => event.target.classList.contains(el));

  if (checkClassArr.includes(true)) {
    searchInput.value += '';
  } else {
    searchInput.value += event.target.innerHTML;
  }

  if (event.target.classList.contains('Backspace')) {
    searchInput.value = searchInput.value.slice(0, -1);
  }
}

keyboardOpener.addEventListener('click', () => {
  keyboard.classList.toggle('hidden');
  keyboard.classList.add('latin');
  addLowerButtons(buttonsLowerLatin);
});

document.addEventListener('click', (e) => {
  const switchLangBtn = keyboard.querySelector('.ru-en');
  if (e.target === switchLangBtn)switchKeyboard();
  if (e.target.classList.contains('key')) {
    addSymbolToInput(e);
  }
});
