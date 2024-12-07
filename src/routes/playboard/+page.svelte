<script>
  import { onMount } from 'svelte'

  let Ddata = Array.from({ length: 4 }, (_, colId) =>
    Array.from({ length: 4 }, (_, lowId) => ({
      colId,
      lowId,
      isWhite: false,
      isBlank: true
    }))
  )
  let turn = true
  let random = Math.trunc(Math.random() * 100)
  random % 2 === 0 ? (turn = true) : (turn = false)

  const toggleTurn = () => (turn = !turn)
  //TODO: 白の時の反転操作のみ
  const toggleColor = (col, low) => {
    const tmp = Ddata
    ;(() => {
      tmp[col][low].isBlank = false
      tmp[col][low].isWhite = !tmp[col][low].isWhite
      Ddata = tmp
    })()
  }
</script>

<div class="container">
  <h1>{turn ? 'your turn' : 'enemy turn'}</h1>
  <h3>{random}</h3>
  <div class="board">
    {#each Ddata as outerData, outerIndex}
      {#each outerData as innerData, innerIndex}
        <div
          id="sq"
          role="button"
          tabindex="0"
          class="square"
          on:mousedown={() => {
            toggleTurn()
            toggleColor(outerIndex, innerIndex)
            //   toggleWhiteColor(index, data)
          }}
          style="background-color: {Ddata[outerIndex][innerIndex].isBlank
            ? '#3b3b3b'
            : Ddata[outerIndex][innerIndex].isWhite
              ? 'white'
              : 'black'}"
        >
          {outerIndex}
          {innerIndex}
        </div>
      {/each}
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }

  .board {
    display: inline-flex;
    flex-wrap: wrap;
    width: 80vh;
    height: 80vh;
    border: 2px solid white;
  }

  .square {
    width: calc(80vh / 4);
    height: calc(80vh / 4);
    outline: 1px solid white;
    cursor: pointer;
    color: red;
  }
</style>
