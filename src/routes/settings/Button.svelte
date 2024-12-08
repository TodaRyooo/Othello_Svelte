<script lang="ts">
  let { text, bool = false, handleClick } = $props()
</script>

<button
  class="container"
  style="
  background-color: {bool ? 'lightgreen' : 'transparent'}; 
  outline: {bool ? 'none' : '1px solid white'};
  color: {bool ? 'black' : 'white'}"
  tabindex="0"
  onclick={handleClick}
>
  {text}
</button>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 24px;
  }
</style>
