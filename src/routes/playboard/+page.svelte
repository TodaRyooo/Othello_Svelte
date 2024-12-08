<script lang="ts">
  import type { boardData } from '@/types/type'
  import findReversibleTiles from './whiteLogic'
  import { gridCount } from '@/lib/stores/setting'

  let GRID_SIZE = 0
  gridCount.subscribe((value) => (GRID_SIZE = value))

  let data: boardData[][] = Array.from({ length: GRID_SIZE }, (_, colId) =>
    Array.from({ length: GRID_SIZE }, (_, rowId) => ({
      colId,
      rowId,
      isWhite: false,
      isBlank: true
    }))
  )
  let isWhiteTurn = Math.random() > 0.5
  let clickCount = 0

  const toggleTurn = (col: number, row: number) => {
    const tmp = [...data]
    if (!tmp[col][row].isBlank) return
    tmp[col][row].isBlank = false
    clickCount++
    isWhiteTurn = !isWhiteTurn
  }

  //TODO: 白の時の反転操作のみ
  const toggleColor = (col: number, row: number) => {
    const tmp = [...data]
    if (!data[col][row].isBlank) return

    isWhiteTurn ? (tmp[col][row].isWhite = true) : (tmp[col][row].isWhite = false)

    findReversibleTiles(tmp, col, row, 0, 1, isWhiteTurn)
    findReversibleTiles(tmp, col, row, 0, -1, isWhiteTurn)
    findReversibleTiles(tmp, col, row, 1, 0, isWhiteTurn)
    findReversibleTiles(tmp, col, row, -1, 0, isWhiteTurn)
    findReversibleTiles(tmp, col, row, 1, 1, isWhiteTurn)
    findReversibleTiles(tmp, col, row, 1, -1, isWhiteTurn)
    findReversibleTiles(tmp, col, row, -1, 1, isWhiteTurn)
    findReversibleTiles(tmp, col, row, -1, -1, isWhiteTurn)

    data = tmp
  }
</script>

<div class="container">
  <a href="/">back home</a>
  <p>{GRID_SIZE}</p>
  <h1>{isWhiteTurn ? 'white turn' : 'black turn'}</h1>
  <div class="board">
    {#each data as outerData, outerIndex}
      {#each outerData as _, innerIndex}
        <div
          id="sq"
          role="button"
          tabindex="0"
          class="square"
          on:mousedown={() => {
            toggleColor(outerIndex, innerIndex)
            toggleTurn(outerIndex, innerIndex)
          }}
          style="
          width: calc(80vh / {GRID_SIZE}); 
          height: calc(80vh / {GRID_SIZE});
           background-color: {data[outerIndex][innerIndex].isBlank
            ? '#3b3b3b'
            : data[outerIndex][innerIndex].isWhite
              ? 'white'
              : 'black'}"
        ></div>
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
    outline: 1px solid white;
    cursor: pointer;
    color: red;
  }
</style>
