<template>
  <div class="navigation fixed container" :class="{'fade-in':!faded}">
      <nuxt-link :class="{'active':$route.hash==='#home'}" :to="{ path: '/', hash:'#home'}">Home</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#about'}" :to="{ path: '/', hash:'#about'}">About me</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#skills'}" :to="{ path: '/', hash:'#skills'}">Skills</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#experience'}" :to="{ path: '/', hash:'#experience'}">Experience</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#contact'}" :to="{ path: '/', hash:'#contact'}">Contact me</nuxt-link>
  </div>
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
.navigation {

  &.fixed{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
  }

  transition: all .4s ease;

  margin-top: 45px;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;

  display: grid;
  grid-auto-flow: column;

  grid-gap: 50px;
  width: fit-content;

  margin-right: auto;
  margin-left: auto;

  &.fade-in {
    top: 130px;
  }

  a{
    text-decoration: none;

    &:visited{
      color: #FFFFFF;
    }

    &:hover{
      color: #00ffce;
    }

    &.active{
      color: #00ffce;
    }
  }
}
</style>
