<template>
  <print-btn/>
  <viewer>
    <slot/>
  </viewer>
</template>

<style>
@page {
  margin: 0;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #dadce0;
}

body {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: scroll;

  padding-top: 20px;
  padding-bottom: 20px;
}


@media print {
  body {
    padding: 0;
  }
}

</style>

<script setup lang="ts">
</script>