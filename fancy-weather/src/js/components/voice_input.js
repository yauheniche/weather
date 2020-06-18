import { lang } from './toggle_language';
import { initFromInput } from './search';

const voiceBtn = document.getElementById('voiceButton');
const searchInput = document.getElementById('searchInput');
'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=agree&lang=en-ru';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const grammar = '#JSGF V1.0';
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;

recognition.interimResults = false;
recognition.maxAlternatives = 1;


voiceBtn.addEventListener('click', () => {
  voiceBtn.classList.add('active');
  recognition.lang = lang.current;
  recognition.start();
});

recognition.addEventListener('speechend', () => {
  recognition.stop();
  voiceBtn.classList.remove('active');
});

recognition.addEventListener('result', (e) => {
  searchInput.value = e.results[0][0].transcript;
  initFromInput();
});
