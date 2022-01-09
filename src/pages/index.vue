<template>
  <div>
    <Brand/>
    <Navigation/>
    <section-home/>
    <br>
    <br>
    <br>
    <br>
    <br>


    <h1 id="about">About me</h1>
    <button @click="change('about')">Ir</button>
    <br>
    <br>
    <br>
    <br>

    <h1 id="skills">Skills</h1>
    <button @click="change('skills')">Ir</button>
    <br>
    <br>
    <br>
    <br>

    <h1 id="experience">Experience</h1>
    <button @click="change('experience')">Ir</button>
    <br>
    <br>
    <br>
    <br>

    <h1 id="contact">Contact me</h1>
    <button @click="change('contact')">Ir</button>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  mounted() {
    window.onscroll = function (e: any) {
      console.log('scrollY', window.scrollY)
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
