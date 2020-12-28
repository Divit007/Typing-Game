const quotes = [
    'Delvin said, "Hey, you stole my diamond case! Give it! Oh, once my dad finds out, you are in so much trouble!"',
    'Sherry Lock Holmes, to the rescue!',
    'Go fill up the car with gasoline!',
    'A latte is a latte, a milkshake is a milkshake, a cup of coffee is a cup of coffee, a glass of milk is a glass of milk, and a dispenser full of candy is a dispenser full of candy.',
    'Sound asleep, go to sleep.',
    'Everybody is a fraud in one way or another, everyone has a little good in their hearts one way or another.',
    'Douglas wanted to make our day better, so I told him we should go to the water park.',
];

let words = [];
let wordIndex = 0;
let startTime = Date.now();
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  words = quote.split(' ');
  
  wordIndex = 0;

  
  
  const spanWords = words.map(function(word) { return `<span>${word} </span>`});
  
  quoteElement.innerHTML = spanWords.join('');
  quoteElement.childNodes[0].className = 'highlight';
  messageElement.innerText = '';

  typedValueElement.value = '';
  
  typedValueElement.focus();
  
  startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', () => {
  
  const currentWord = words[wordIndex];
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    typedValueElement.value = '';
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = '';
  } else {
    // error state
    typedValueElement.className = 'error';
  }
});