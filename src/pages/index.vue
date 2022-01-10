<template>
  <div>
    <Brand/>
    <Navigation/>
    <section-home/>
    <section-about/>
    <section-skills/>
    <section-experience/>
    <section-contact/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  mounted() {
    window.onscroll = function (e: any) {
      // console.log('scrollY', window.scrollY)
    }
  },
  methods: {
    change(hash: string) {
      window.history.pushState("", "", '#' + hash);
      console.log(this.$router)
      this.$router.push('#' + hash)
    }
  }
})
</script>
