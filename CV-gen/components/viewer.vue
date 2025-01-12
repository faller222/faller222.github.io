<template>
  <div class="viewer">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

/* A4 measures 210 x 297 mm or 8.27 x 11.69 inches*/
.viewer {
  width: 210mm;
  min-height: 100%;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media print {
  .viewer {
    box-shadow: none;
  }
}
</style>