import {writable} from 'svelte/store';
import {createCards} from './utils/helpers';

const board = writable({
  lastCard: null,
  cards: createCards()
});

function updateCards(idxs, prop, value, clearLast) {
  board.update(state => {
    let c = [...state.cards];

    idxs.forEach(i => {
      c[i][prop] = value;
    });

    return {...state, cards: c, lastCard: clearLast ? null : state.lastCard};
  });
}

function setLast(index) {
  board.update(state => {
    return {...state, lastCard: index};
  });
}

export {board, updateCards, setLast};
