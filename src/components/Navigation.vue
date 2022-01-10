<template>
  <nav :class="{'fade-in':!faded}">
    <div class="grid">
      <nuxt-link :class="{'active':$route.hash==='#home'}" :to="{ path: '/', hash:'#home'}">Home</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#about'}" :to="{ path: '/', hash:'#about'}">About me</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#skills'}" :to="{ path: '/', hash:'#skills'}">Skills</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#experience'}" :to="{ path: '/', hash:'#experience'}">Experience</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#contact'}" :to="{ path: '/', hash:'#contact'}">Contact me</nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu",
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

<style scoped lang="scss">
nav {
  margin-top: 0;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;

  padding: 10px;
  background-color: #002C2380;

  .grid{
    display: grid;
    grid-auto-flow: column;
    grid-gap: 50px;
    width: fit-content;

    margin-right: auto;
    margin-left: auto;
  }




  &.fade-in {
    top: 130px;
  }
}
</style>
