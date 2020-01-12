<script>
  import {board} from './store.js';
  import Card from './components/Card.svelte';
  import Modal from './components/Modal.svelte';

  let score = 0;

  function addScore() {
    score = score + 1;
  }

</script>

<main>
  <h1>Score: {score}</h1>
  {#if score === 8}
    <Modal />
  {/if}
  <div class="board">
    {#each $board.cards as card, i}
      <Card {...card} {addScore} index={i} />
    {/each}
  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

  .board{
    display: flex;
    flex-flow: row wrap;
  }
</style>