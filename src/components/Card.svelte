<script>
  import {onDestroy} from 'svelte';
  import {
    board, 
    updateBoard, 
    last, 
    setMatches,
    isAnimating,
    toggleAnimate,
    updateScore
    } from  '../store.js';
    import {cardAt} from '../utils/helpers.js';

  export let pos, match, selected, addScore;

  let timer = {},
    inActiveTimer = {},
    inActive = false;

  onDestroy(() => {
    timer.clearTimeOut();
    inActiveTimer.clearTimeOut();
  });

  $: if (match) {
    inActiveTimer = setTimeout(() => {inActive = match}, 1000);
  };
  
  function handleClick() {
    if (cardAt($board, pos).match || $isAnimating) return;

    updateBoard(pos);

    // if no last card, set it
    if (!$last) {
      last.set(pos);
      return;
    };

    // current card same as last, reset last
    if ($last == pos) {
      last.set(null);
      return;
    };

    // current value matches the last
    if (cardAt($board, $last).value === cardAt($board, pos).value) {
      addScore();
      setMatches($last, pos);
      last.set(null);
      return;
    };

    // not a match, start rotate back to default
    isAnimating.set(true);
    timer = setTimeout(flipCards, 1000);
  };

  function flipCards() {
    updateBoard(pos, $last);
    last.set(null);
    isAnimating.set(false);
  };

</script>

<div class="flip-card" class:animating={$isAnimating} on:click={handleClick} >
  <div class:selected class="flip-card-inner">
    <div class="flip-card-front">
      <h1>HELLO</h1>
    </div>
    <div class:inActive class="flip-card-back">
      <h1>{cardAt($board, pos).value}</h1>
    </div>
  </div>
</div>

<style>
/* https://www.w3schools.com/howto/howto_css_flip_card.asp */
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  width: 200px;
  height: 100px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  flex: 1 0 33%;
  display: inline-block;
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

.animating.flip-card:hover, .animating {
  cursor: not-allowed;
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

.inActive {
  opacity: 0.5;
  transition: 1s;
}

.inActive:hover {
  cursor: default;
}
</style>