<template>
  <nav :class="{'fade-in':!faded,'responsive':menuExpanded}">
    <div class="menu">
      <h1 class="logo" v-if="menuExpanded">GERMÁN FALLER</h1>
      <a href="javascript:void(0);" class="icon" @click="menu">
        <img v-if="menuExpanded" alt="german_faller_menu_close_icon" src="@/assets/img/german_faller_menu_close_icon.svg">
        <img v-else alt="german_faller_menu_icon" src="@/assets/img/german_faller_menu_icon.svg">
      </a>
      <nuxt-link @click.native='handler' :class="{'active':$route.hash==='#home'}" :to="{ path: '/', hash:'#home'}">Home</nuxt-link>
      <nuxt-link @click.native='handler' :class="{'active':$route.hash==='#about'}" :to="{ path: '/', hash:'#about'}">About me</nuxt-link>
      <nuxt-link @click.native='handler' :class="{'active':$route.hash==='#skills'}" :to="{ path: '/', hash:'#skills'}">Skills</nuxt-link>
      <nuxt-link @click.native='handler' :class="{'active':$route.hash==='#experience'}" :to="{ path: '/', hash:'#experience'}">Experience</nuxt-link>
      <nuxt-link @click.native='handler' :class="{'active':$route.hash==='#contact'}" :to="{ path: '/', hash:'#contact'}">Contact me</nuxt-link>
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
    handler(pointerEvent){
      if(this.menuExpanded) {
        this.menu()
      }
    },
    menu() {
      window.navigator.vibrate(50);
      this.menuExpanded = !this.menuExpanded
      document.body.style.overflowY = this.menuExpanded ? 'hidden' : '';
    }
  }
}
</script>

<style scoped lang="scss">
nav {

  a {
    display: none;
  }

  .logo {
    margin-top: 1rem;
    margin-bottom: 4rem;
  }

  .icon {
    display: inline-block;
    position: fixed;
    right: 2rem;
    top: 2rem;

    img {
      width: 2rem;
    }
  }

  .menu {
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 2rem;

    position: absolute;
    width: 100%;
  }
}

@media screen and (max-width: 767px) {
  &.responsive {
    background-color: rgba(0, 44, 35, 0.95);
    height: 100vh;
  }

  &.responsive a:not(.icon) {
    display: block;
    margin-bottom: 2rem;
    margin-left: 2rem;
    font-size: 3rem;
  }
}

@media screen and (min-width: 768px) {
  nav {
    background-color: #002C2380;

    a {
      display: inline-block;
    }

    .logo,
    .icon {
      display: none;
    }

    &.fade-in {
      top: 6rem;
    }

    .menu {
      padding: 1rem 2rem;
      position: relative;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
