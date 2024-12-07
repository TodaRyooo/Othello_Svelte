<script lang="ts">
  import { onMount } from 'svelte'

  let Ddata = Array.from({ length: 6 }, (_, colId) =>
    Array.from({ length: 6 }, (_, lowId) => ({
      colId,
      lowId,
      isWhite: false,
      isBlank: true
    }))
  )
  let turn = true
  let random = Math.random() < 0.5

  const toggleTurn = () => (turn = !turn)
  //TODO: 白の時の反転操作のみ
  const toggleColor = (col: number, low: number) => {
    const tmp = [...Ddata]
    tmp[col][low].isBlank = false
    tmp[col][low].isWhite = !tmp[col][low].isWhite

    findReversibleTiles(tmp, col, low, 0, 1)
    findReversibleTiles(tmp, col, low, 0, -1)
    findReversibleTiles(tmp, col, low, 1, 0)
    findReversibleTiles(tmp, col, low, -1, 0)
    findReversibleTiles(tmp, col, low, 1, 1)
    findReversibleTiles(tmp, col, low, 1, -1)
    findReversibleTiles(tmp, col, low, -1, 1)
    findReversibleTiles(tmp, col, low, -1, -1)

    Ddata = tmp
  }

  const findReversibleTiles = (
    grid: typeof Ddata,
    col: number,
    low: number,
    colStep: number,
    lowStep: number
  ) => {
    let arr = []
    let found = false

    const size = grid.length

    for (
      let [colIndex, lowIndex] = [col + colStep, low + lowStep];
      colIndex >= 0 && colIndex < size && lowIndex >= 0 && lowIndex < size;
      colIndex += colStep, lowIndex += lowStep
    ) {
      if (grid[colIndex][lowIndex].isBlank) break // 空のマスがあれば終了
      if (grid[colIndex][lowIndex].isWhite) {
        found = true
        break
      }
      arr.push({ arrCol: colIndex, arrLow: lowIndex }) // 黒のマスを記録
    }

    // 反転処理
    if (found) {
      arr.forEach(({ arrCol, arrLow }) => {
        grid[arrCol][arrLow].isWhite = true // 黒を白に反転
      })
    }
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
    width: calc(80vh / 6);
    height: calc(80vh / 6);
    outline: 1px solid white;
    cursor: pointer;
    color: red;
  }
</style>
