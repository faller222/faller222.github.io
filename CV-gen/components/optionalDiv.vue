<template>
  <div class="optional" :class="{ inactive: !isActive }" @click="toggle">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "Optional",
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped lang="scss">

.optional {
  display: inline-block;
  transition: opacity 0.5s ease;
  cursor: pointer;
}

.optional.inactive {
  opacity: 50%;
}

@media print {
  .optional.inactive {
    display: none;
  }
}
</style>