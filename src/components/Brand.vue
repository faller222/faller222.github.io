<template>
  <header :class="{'fade-out':faded}">
    <h1>GERMÁN FALLER</h1>
  </header>
</template>

<script>
export default {
  name: "Brand",
  data() {
    return {
      scroll: 0
    }
  },
  computed: {
    faded() { return this.scroll > 70 }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scroll = window.scrollY
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  padding-top: 70px;
  min-height: 130px;

  &.fade-out {
    top: -130px;
  }
}
</style>
