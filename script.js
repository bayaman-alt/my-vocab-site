function getStorageKey(language) {
  return \`vocab_\${language}\`;
}

function loadWords(language) {
  const key = getStorageKey(language);
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveWords(language, words) {
  const key = getStorageKey(language);
  localStorage.setItem(key, JSON.stringify(words));
}

function addWord(language) {
  const word = document.getElementById('word').value.trim();
  const translation = document.getElementById('translation').value.trim();
  if (!word || !translation) return;

  const words = loadWords(language);
  words.push({ word, translation, learned: false });
  saveWords(language, words);
  document.getElementById('word').value = '';
  document.getElementById('translation').value = '';
  displayWords(language);
}

function toggleLearned(language, index) {
  const words = loadWords(language);
  words[index].learned = !words[index].learned;
  saveWords(language, words);
  displayWords(language);
}

function filterWords(language) {
  displayWords(language);
}

function displayWords(language) {
  const filter = document.getElementById('filter').value;
  const wordList = document.getElementById('wordList');
  const words = loadWords(language);

  wordList.innerHTML = '';

  words.forEach((entry, index) => {
    if (filter === 'learned' && !entry.learned) return;
    if (filter === 'new' && entry.learned) return;

    const div = document.createElement('div');
    div.innerHTML = \`<strong>\${entry.word}</strong> - \${entry.translation} <button onclick="toggleLearned('\${language}', \${index})">\${entry.learned ? '✅' : '❌'}</button>\`;
    wordList.appendChild(div);
  });
}

window.onload = () => {
  const path = window.location.pathname;
  if (path.includes('korean')) displayWords('korean');
  else if (path.includes('english')) displayWords('english');
};
