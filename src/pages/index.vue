<template>
  <div>
    <Brand/>
    <Navigation/>
    <section-home/>
    <section-about/>
<!--        <section-skills/>-->
<!--        <section-experience/>-->
<!--        <section-contact/>-->
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  mounted() {

    window.onscroll = function (e) {
      // console.log('scrollY', window.scrollY)
    }
  },
  methods: {
    change(hash) {
      window.history.pushState("", "", '#' + hash);
      console.log(this.$router)
      this.$router.push('#' + hash)
    }
  }
}
</script>
