<template>
  <div class="navigation">
      <nuxt-link :class="{'active':$route.hash==='#home'}" :to="{ path: '/', hash:'#home'}">Home</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#about'}" :to="{ path: '/', hash:'#about'}">About me</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#skills'}" :to="{ path: '/', hash:'#skills'}">Skills</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#experience'}" :to="{ path: '/', hash:'#experience'}">Experience</nuxt-link>
      <nuxt-link :class="{'active':$route.hash==='#contact'}" :to="{ path: '/', hash:'#contact'}">Contact me</nuxt-link>

  </div>
</template>

<script>
export default {
  name: "Menu"
}
</script>

<style scoped lang="scss">
.navigation {
  margin-top: 45px + 130px;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: #CDCDCD;

  display: grid;
  grid-auto-flow: column;

  grid-gap: 50px;
  width: fit-content;

  margin-right: auto;
  margin-left: auto;

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
