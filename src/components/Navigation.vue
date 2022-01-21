<template>
  <nav :class="{'fade-in':!faded,'responsive':menuExpanded}">
    <div class="menu">
      <nuxt-link :class="{'active':$route.hash==='#home'}" :to="{ path: '/', hash:'#home'}">Home</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#about'}" :to="{ path: '/', hash:'#about'}">About me</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#skills'}" :to="{ path: '/', hash:'#skills'}">Skills</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#experience'}" :to="{ path: '/', hash:'#experience'}">Experience
      </nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#contact'}" :to="{ path: '/', hash:'#contact'}">Contact me</nuxt-link>
      <a href="javascript:void(0);" class="icon" @click="menu">
        <span class="icon-bar"/>
        <span class="icon-bar"/>
        <span class="icon-bar"/>
        <span class="icon-bar"/>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      scroll: 0,
      menuExpanded: false
    }
  },
  computed: {
    faded() {
      return this.scroll > 70
    }
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
    },
    menu() {
      this.menuExpanded = !this.menuExpanded
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

  .menu {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 50px;
    width: fit-content;

    margin-right: auto;
    margin-left: auto;
  }

  .icon {
    display: none;
    padding: 10px;
    margin-top: 40px;
    margin-right: 10px;

    .icon-bar {
      background-color: #888;
      display: block;
      width: 33px;
      height: 4px;
      border-radius: 5px;
    }

    .icon-bar + .icon-bar {
      margin-top: 4px;
    }
  }


  &.fade-in {
    top: 130px;
  }
}

@media screen and (max-width: 600px) {
  nav {
    position: fixed;
    background-color: transparent;

    &.fade-in {
      top: 0;
    }

    a {
      display: none;
    }

    .menu {
      grid-auto-flow: row;
      margin: 20px;
    }

    .icon {
      float: right;
      display: block;
    }

    &.responsive {
      height: 100vh;
      background-color: rgba(0, 44, 35, 0.95);
    }

    &.responsive .icon {
      position: absolute;
      right: 0;
      top: 0;
    }

    &.responsive a {
      float: none;
      display: block;
      text-align: left;
    }

  }
}


</style>
