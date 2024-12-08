<script lang="ts">
  import Button from './Button.svelte'
  import { gridCount } from '@/lib/stores/setting'

  let isLightTheme = false
  let grids: number

  gridCount.subscribe((value) => (grids = value))

  const plus = () => gridCount.update((value) => value + 1)
  const minus = () => gridCount.update((value) => value - 1)
</script>

<a href="/">back home</a>
<h1>Setting</h1>
<div class="container">
  <div class="wrapper">
    <p style="min-width: 120px">Theme</p>
    <Button
      text={isLightTheme ? 'light' : 'dark'}
      bool={isLightTheme}
      handleClick={() => {
        isLightTheme = !isLightTheme
      }}
    />
  </div>

  <div class="wrapper">
    <p style="min-width: 120px">Grids</p>
    <Button text={'Plus'} handleClick={plus} />
    <Button text={'Minus'} handleClick={minus} />
    <p>{grids}</p>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30vh;
    margin-top: 10px;
    gap: 8px;
  }

  .wrapper {
    display: flex;
    width: 100%;
    gap: 10px;
  }
</style>
