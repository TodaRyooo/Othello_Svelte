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
  const toggleColor = (col, low) => {
    const tmp = Ddata
    ;(() => {
      tmp[col][low].isBlank = false
      tmp[col][low].isWhite = !tmp[col][low].isWhite
      Ddata = tmp
    })()

    let arr = []
    //TODO: 右方向への探索
    for (let index = low + 1; index <= 5; index++) {
      if (tmp[col][index].isBlank) break
      if (tmp[col][index].isWhite) break
      else arr.push({ arrCol: col, arrLow: index })
    }

    //TODO: 最初に見つけた白までの黒を反転させる
    let first = { objCol: undefined, objLow: undefined }

    arr.map(({ arrCol, arrLow }) => {
      if (arrLow + 1 > tmp[0].length) undefined
      else {
        tmp[arrCol][arrLow + 1].isWhite
          ? (first = { objCol: arrCol, objLow: arrLow + 1 })
          : undefined
      }
    })
    if (first.objLow !== undefined) {
      for (let index = low + 1; index < first.objLow; index++) tmp[col][index].isWhite = true
    }

    console.log('first', first)

    Ddata = tmp
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
