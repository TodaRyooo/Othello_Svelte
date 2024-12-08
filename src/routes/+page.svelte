<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  let isDragging = false
  let [startX, startY, startWidth, currentX, currentY, currentWidth] = [0, 0, 0, 0, 0, 0]

  let fuga: HTMLElement | null = null

  onMount(() => {
    fuga = document.getElementById('fuga')
    fuga?.addEventListener('mousedown', (e) => {
      if (!fuga) return
      isDragging = true
      startX = e.clientX - currentX
      startY = e.clientY - currentY
      startWidth = fuga.clientWidth
      fuga.classList.add('dragging')
    })

    document.addEventListener('mousemove', (e) => {
      if (!isDragging || !fuga) return
      currentX = e.clientX - startX
      currentY = e.clientY - startY
      fuga.style.transform = `rotate(${180 - currentX}deg)
	  skew(${180 - currentX}deg, ${180 - currentY}deg)`
    })

    document.addEventListener('click', () => {
      isDragging = false
    })
  })
</script>

<div class="container">
  <div id="trail-container" class="trail"></div>
  <div class="hoge">
    <h1>Othello</h1>
    <a href="/playboard">start</a>
    <a href="/settings">settings</a>
  </div>
  <div id="fuga" class="draggable" bind:this={fuga}>
    {#each Array.from({ length: 16 }) as index}
      <div id={String(index)} class="piyo"></div>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    gap: 20px;
    overflow: hidden;
  }

  .hoge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    z-index: 1;
  }
  .draggable {
    display: flex;
    flex-wrap: wrap;
    width: 100px;
    height: 100px;
    outline: 4px solid #ff22ff;
    cursor: grab;
    transition: transform 0.01s;
    z-index: 0;
  }
  .piyo {
    width: calc(100px / 4);
    height: calc(100px / 4);
    outline: 1px solid #0ff;
  }
</style>
