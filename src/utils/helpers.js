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

class CardData {
  constructor(value) {
    this.match = false;
    this.selected = false;
    this.value = value;
  }
}

function createBoard() {
  let board = new Array(4).fill(null);
  let values = createValues();

  for (let i = 0; i < board.length; i++) {
    const arr = [];
    for (let j = 0; j < board.length; j++) {
      arr.push(new CardData(values.pop()));
    }
    board[i] = arr;
  }

  return board;
}

function cardAt(b, {r, c}) {
  return b[r][c];
}

export {createBoard, cardAt};
