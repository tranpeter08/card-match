export class CardData {
  constructor(value) {
    this.value = value;
    this.inactive = false;
    this.selected = false;
  }
}

function generateNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createValues() {
  const freq = {};
  const values = [];
  let num = generateNum(1, 8);

  while (values.length < 16) {
    if (freq[num] === 2) {
      num = generateNum(1, 8);
      continue;
    }

    if (freq[num]) {
      freq[num]++;
    } else {
      freq[num] = 1;
    }

    values.push(num);
    num = generateNum(1, 8);
  }

  return values;
}

function createCards() {
  let board = new Array(16).fill(null);
  let values = createValues();

  for (let i = 0; i < board.length; i++) {
    board[i] = new CardData(values.pop());
  }

  return board;
}

export {createCards};
