<script lang="ts">
  import { onMount } from 'svelte'

  let GRID_SIZE = 8

  let data = Array.from({ length: GRID_SIZE }, (_, colId) =>
    Array.from({ length: GRID_SIZE }, (_, rowId) => ({
      colId,
      rowId,
      isWhite: false,
      isBlank: true
    }))
  )
  let isWhiteTurn = Math.random() > 0.5

  const toggleTurn = (col: number, row: number) => {
    const tmp = [...data]
    if (!tmp[col][row].isBlank) return
    tmp[col][row].isBlank = false
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

  const findReversibleTiles = (
    grid: typeof data,
    col: number,
    row: number,
    colStep: number,
    rowStep: number,
    isWhiteTurn: boolean
  ) => {
    let arr = []
    let found = false

    const size = grid.length

    for (
      let [colIndex, rowIndex] = [col + colStep, row + rowStep];
      colIndex >= 0 && colIndex < size && rowIndex >= 0 && rowIndex < size;
      colIndex += colStep, rowIndex += rowStep
    ) {
      if (grid[colIndex][rowIndex].isBlank) break // 空のマスがあれば終了

      if (isWhiteTurn ? grid[colIndex][rowIndex].isWhite : !grid[colIndex][rowIndex].isWhite) {
        found = true
        break
      }
      arr.push({ arrCol: colIndex, arrRow: rowIndex }) // 反転できるマスを記録
    }

    // 反転処理
    if (found) {
      arr.forEach(({ arrCol, arrRow: arrRow }) => {
        grid[arrCol][arrRow].isWhite = !grid[arrCol][arrRow].isWhite // マスを反転
      })
    }
  }
</script>

<div class="container">
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
    outline: 1px solid white;
    cursor: pointer;
    color: red;
  }
</style>
