<template>
  <div>
    <div v-show="false">
      <script data-n-head="1" src="https://www.googletagmanager.com/gtag/js?id=G-MND0S9FGM9" async></script>
      <script data-n-head="1">
        window.dataLayer = window.dataLayer || [];

        function gtag() {
          dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'G-MND0S9FGM9');
      </script>
    </div>

    <Brand/>
    <Navigation/>
    <section-home/>
    <section-about/>
    <section-skills/>
    <section-experience/>
    <section-contact/>
    <my-footer/>
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
