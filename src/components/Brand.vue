<template>
  <div :class=" {'brand-header':true, 'fade-out':faded}">
    <h1>GERMÁN FALLER</h1>
  </div>
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
.brand-header {
  padding-top: 70px;
  min-height: 130px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  transition: all .4s ease;

  h1{
    margin: 0;
    text-align: center;
    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    line-height: 60px;
  }

  &.fade-out {
    top: -130px;
  }
}
</style>
