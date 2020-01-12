<script>
  import {onDestroy} from 'svelte';
  import {
    board, 
    setLast,
    updateCards
  } from  '../store.js';

  export let index, inactive, selected, addScore, value;

  let flipTimer = {},
    inactiveTimer = {},
    disabled = false;

  onDestroy(() => {
    flipTimer.clearTimeOut();
    inactiveTimer.clearTimeOut();
  });

  $: if (inactive) {
    inactiveTimer = setTimeout(() => (disabled = inactive), 1000);
  };
  
  function handleClick() {
    if (inactive || selected) return;

    updateCards([index], 'selected', true);
    const {lastCard, cards} = $board;

    // if last card not present, set it
    if (lastCard === null) {
      setLast(index);
      return;
    };

    // clicking on same card, reset last card
    if (lastCard === index) {
      setLast(null);
      return;
    };

    // current value matches the last
    if (cards[lastCard].value === value) {
      updateCards([lastCard, index], 'inactive', true, true);
      addScore();
      return;
    };

    setLast(null);

    flipTimer = setTimeout(() => {
      updateCards([index, lastCard], 'selected', false);
    }, 1000)
  };

</script>

<div class="flip-card" on:click={handleClick} >
  <div class:selected class="flip-card-inner">
    <div class="flip-card-front">
      <h1>
        <img 
          src="images/icon.png" 
          width="40px" 
          height="40px" 
          alt='Svelte Icon'
        >
      </h1>
    </div>
    <div class:disabled class="flip-card-back">
      <h1>{value}</h1>
    </div>
  </div>
</div>

<style>
/* https://www.w3schools.com/howto/howto_css_flip_card.asp */
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  width: 200px;
  max-width: calc(25% - 10px);
  height: 100px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  flex: 1 0 25%;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
/* .flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
} */

.flip-card:hover {
  cursor: pointer;
}

.selected{
  transform: rotateY(180deg);
  transition: 0.8s;
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #bbb;
  color: black;
}

/* Style the back side */
.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}

.disabled {
  opacity: 0.5;
  transition: 1s;
}

.disabled:hover, .selected {
  cursor: default;
}
</style>