<template>
  <div class="error">
    <Brand/>
    <Navigation/>
    <img id="background_1" alt="background_1" src="@/assets/img/german_faller_banner_cover.svg">
    <h1>Page not found</h1>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
}
</script>

<style lang="scss">
.error{
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;

  h1{
    position: relative;
  }

  #background_1 {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
