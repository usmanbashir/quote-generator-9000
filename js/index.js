// Enable strict mode to eliminate some JavaScript silent errors 
// by changing them to throw errors. And help JavaScript engines 
// to perform optimizations to run our code faster.
'use strict';

// Global constant variables that can't be changed but are accessible 
// anywhere in our code.
const INSPIRATION_SENTENCE_FRAGMENTS = [
  "I visualized what I wanted",
  "I was determined to have it.",
  "Rule your mind or it will rule you.",
  "You decide and create your own destiny.",
  "Amateurs look for inspiration;",
  "the rest of us just get up and go to work.",
  "While you were busy working on your ego,",
  "she was busy working on her soul.",
  "Darkness!",
  "Come not for my soul. It is light I seek.",
  "Illumination, my goal.",
  "Your violent hand leads me to unsafe ground.",
  "My enemies, hide in you, extending their cowardly grip shredding my existence, shrouding it with obscurity.",
  "We are infinite beings.",
  "Everything we need to succeed is already within us.",
  "Hold on to and cherish even the smallest of moments...",
  "you may not know it yet, but years from now when you look back...",
  "they could become one of your biggest memories!",
  "Always react Positively and be Happy!",
  "Never allow the fear of striking out keep you from playing the game!",
  "Move on!",
  "It doesn't matter what you did or where you were...",
  "it matters where you are and what you're doing.",
  "Get out there!",
  "Sing the song in your heart and NEVER let anyone shut you up!!"
];
const KNOWLEDGE_SENTENCE_FRAGMENTS = [
  "God has no regard for the ignorant.",
  "If a person is not free, his right is restricted.",
  "Where is the wisdom?",
  "Power rests on the kind of knowledge one holds.",
  "What is the sense of knowing things that are useless?",
  "I want to learn more and more.",
  "The more I know, the more I see a brand-new world.",
  "The path of light is the quest for knowledge.",
  "My heart knows what my mind only think it knows.",
  "Not everything in life comes as we expect",
  "teach your brain now.. don't wait until life teach you!",
  "Self-discovery is the key to knowing what to do with your life.",
  "For those who would die, there is life.",
  "For those who would dream, there is reality.",
  "For those who would hope, there is knowledge.",
  "For those who would grow, there is eternity",
  "I am too much of a skeptic to deny the possibility of anything.",
  "Many much-learned men have no intelligence.",
  "My wealth is in my knowledge of self, love, and spirituality.",
  "Knowledge cannot be inherited nor can it simply be gifted.",
  "Work always makes a difference.",
  "for whenever men are right they are not young",
  "The man who sees both sides of a question is a man who sees absolutely nothing.",
  "The people of the light, loves the light of knowledge.",
  "Begin to convert your time into knowledge and wisdom",
];

function init() {
  console.log('Welcome to Quote Generator 9000');

  console.log(buildQuote(INSPIRATION_SENTENCE_FRAGMENTS));

  // Setup varies event listeners to drive our UI. By finding relevant 
  // HTML elements and attaching event listeners that call respective
  // functions for each event.
  document.querySelector('#generateQuote')
    .addEventListener('click', onGenerateQuoteClick);

  // Trigger the click event for the quote generation so we have at least
  // have a quote on page load.
  document.querySelector('#generateQuote').click();
}

// Call the initialization function to get everything setup and the 
// website responding to user actions
init();

function onGenerateQuoteClick(event) {
  event.preventDefault();

  // Get the type of quotes user wants to see.
  const typeOfQuotes = document.querySelector("input[name='optionTypeOfQuotes']:checked").value;

  // Find out how many quotes does the user wants to see at a time.
  const numberOfQuotes = parseInt(document.querySelector("input[name='optionNumberOfQuotes']:checked").value);

  // Select the source sentence fragments.
  let quotesSource;

  if (typeOfQuotes === "inspiration") {
    quotesSource = INSPIRATION_SENTENCE_FRAGMENTS;
  }
  
  if (typeOfQuotes === "knowledge") {
    quotesSource = KNOWLEDGE_SENTENCE_FRAGMENTS;
  }

  // Build a list of quotes to be shown to the user.
  let listOfQuotes = [];
  
  for (let index = 0; index < numberOfQuotes; index++) {
    listOfQuotes.push(buildQuote(quotesSource));
  }

  // Let's clear the quotes list.
  document.querySelector('.quotes-list').innerHTML = '';

  // For each returned quote, we will clone a HTML template we've already 
  // defined in our `index.html` file. That already has the needed elements 
  // and styles attached. We just need to add relevant data from the quotes 
  // Array and add the cloned template quote block in to the `.quotes-list` 
  // DIV element.
  listOfQuotes.forEach(quote => {
    const template = document.querySelector('#quote-block-template');
    let quoteBlock = document.importNode(template.content, true);
    quoteBlock.querySelector('.quote').innerText = quote;
    document.querySelector('.quotes-list').appendChild(quoteBlock);
  });
}

// Return a quote based on the provided sentence fragments.
function buildQuote(fragments) {
  // Build an Array containing the beginning, middle, and end sections
  // for the sentence.
  let sections = [
    getFragment(fragments, "BEGINNING"),
    getFragment(fragments, "MIDDLE"),
    getFragment(fragments, "END")
  ];

  // Join the 3 sections from the Array into a single String.
  let quote = sections.join(" ");

  quote = tidyEndOfSentence(quote);

  return quote;
}

// Add a full stop at the end of the sentence if one is not already present
// or if there is no exclamation/question mark.
function tidyEndOfSentence(sentence) {
  // Get the last character for the sentence.
  let lastCharacter = sentence.charAt(sentence.length -1);

  if(lastCharacter === "!") { return sentence; }
  if(lastCharacter === "?") { return sentence; }
  if(lastCharacter === ".") { return sentence; }

  return sentence + ".";
}

// Get a proper fragment for the appropriate section of the sentence.
function getFragment(fragments, safeFor) {
  let fragment = getRandomFragment(fragments);

  // In case the random fragment includes inappropriate punctuation marks
  // for the given section of the sentence. Recursively call this function
  // with the same parameters until we can find an appropriate version of 
  // the fragment for the given sentence section.

  if (safeFor === "BEGINNING" && includesFilteredItems(fragment, ["!"])) {
    fragment = getFragment(fragments, safeFor);
  }

  if (safeFor === "MIDDLE" && includesFilteredItems(fragment, ["!"])) {
    fragment = getFragment(fragments, safeFor);
  }

  if (safeFor === "END" && includesFilteredItems(fragment, [",", ";", "..."])) {
    fragment = getFragment(fragments, safeFor);
  }
  
  return fragment;
}

// Return TRUE if a filtered item is found in the fragment.
function includesFilteredItems(fragment, filters) {  
  return filters.find(filter => {     // Iterate over every filter
    return fragment.includes(filter); // Until one is found in the fragment.
  });
}

// Return a random fragment from the sentence fragments Array.
function getRandomFragment(fragments) {
  return fragments[getRandomIndex(fragments.length)];
}

// Based on the max length of the Array. Return a random items index
// within the Array's length.
function getRandomIndex(maxLength) {
  return Math.floor(Math.random() * Math.floor(maxLength));
}