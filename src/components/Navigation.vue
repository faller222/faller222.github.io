<template>
  <nav :class="{'fade-in':!faded,'responsive':menuExpanded}">
    <div class="menu">
      <a href="javascript:void(0);" class="icon" @click="menu">
        <span class="icon-bar"/>
        <span class="icon-bar"/>
        <span class="icon-bar"/>
        <span class="icon-bar"/>
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

  .icon {
    display: inline-block;
    float: right;
    padding:  0.5rem;
    background-color: #00FFCE80;
    border-radius: 5px;

    .icon-bar {
      background-color: #FFFFFF;
      display: block;
      width: 1.5rem;
      height: 0.2rem;
      border-radius: 5px;
    }

    .icon-bar + .icon-bar {
      margin-top: 0.2rem;
    }

    &:hover {
      background-color: rgba(0,44,35,0.5);
      .icon-bar {
        background-color: #00FFCE;
      }
    }
  }

  .menu {
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    padding: 1rem;
  }
}

@media screen and (max-width: 767px) {
  &.responsive {
    background-color: rgba(0, 44, 35, 0.95);
    height: 100vh;
  }

  &.responsive a {
    display: block;
    margin-bottom: 2rem;
    margin-left: 2rem;
    font-size: 3rem;

    &:nth-child(2){
      margin-top: 3rem;
    }
  }
}

@media screen and (min-width: 768px) {
  nav {
    background-color: #002C2380;

    a {
      display: inline-block;
    }

    .icon {
      display: none;
    }

    &.fade-in {
      top: 6rem;
    }

    .menu{
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
