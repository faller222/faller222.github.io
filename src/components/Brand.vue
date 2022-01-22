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
  padding-top: 3rem;
  min-height: 6rem;

  &.fade-out {
    top: -6rem;
  }
}
</style>
