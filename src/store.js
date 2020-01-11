import {writable} from 'svelte/store';
import {createBoard, cardAt} from './utils/helpers';

const last = writable(null);
const isAnimating = writable(false);

const board = writable(createBoard());

function updateBoard(...args) {
  board.update(b => {
    let _b = [...b];

    args.forEach(p => {
      cardAt(_b, p).selected = !cardAt(b, p).selected;
    });

    return [..._b];
  });
}

function setMatches(...args) {
  board.update(b => {
    let _b = [...b];

    args.forEach(p => {
      cardAt(_b, p).match = true;
    });

    return [..._b];
  });
}

function toggleAnimate(...args) {
  board.update(b => {
    let _b = [...b];

    args.forEach(p => {
      cardAt(_b, p).isAnimating = !cardAt(b, p).isAnimating;
    });

    return [..._b];
  });
}

export {board, updateBoard, last, setMatches, isAnimating, toggleAnimate};
