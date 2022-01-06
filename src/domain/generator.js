

const punctuation = `!?.,:;'"-–—`.split('').join('\\');
const word = '[a-zA-Zа-яА-ЯёЁ]+';
const tokenRegExp = new RegExp(`(\\.{3}|[${punctuation}]|${word})`);

const tokenize = (text) => text.split(tokenRegExp).filter(Boolean);

const sliceCorpus = (corpus, sampleSize) => corpus
  .map((token, index) => corpus.slice(index, index + sampleSize))
  .filter((group) => group.length === sampleSize);

const collectTransitions = (samples) => samples
  .reduce((transitions, sample) => {
    const lastIndex = sample.length - 1;
    const lastToken = sample[lastIndex];
    const restTokens = sample.slice(0, lastIndex);
    const state = restTokens.join('');
    const next = lastToken;

    transitions[state] = transitions[state] ?? [];
    transitions[state].push(next);

    return transitions;
  }, {});

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const pickRandom = (list) => list[random(0, list.length - 1)];

const predict = (chain, transitions, sampleSize) => {
  const lastState = chain.slice(-(sampleSize - 1)).join('');
  const nextWords = transitions[lastState] ?? [];

  return pickRandom(nextWords);
}

const createChain = (transitions) => {
  const head = pickRandom(Object.keys(transitions).filter((key) => /^[А-Я]/.test(key.charAt(0))));

  return tokenize(head);
}

function* generateChain(transitions, sampleSize) {
  const chain = createChain(transitions);

  yield chain.join('');

  while (true) {
    const state = predict(chain, transitions, sampleSize);
    yield state;

    if (state) {
      chain.push(state)
    } else {
      chain.pop();
    }
  }
}

export const generate = ({ text, wordCount = 100, sampleSize = 4 }) => {
  const generatedTokens = [];

  const corpus = tokenize(text);
  const samples = sliceCorpus(corpus, sampleSize);
  const transitions = collectTransitions(samples);

  const generator = generateChain(transitions, sampleSize);

  for (let i = 0; i < wordCount; i++) {
    generatedTokens.push(generator.next().value);
  }

  return generatedTokens.join('');
}
