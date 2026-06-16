<template>
  <div
    class="markdown-body"
    :class="{'markdown-body--light': variant === 'light'}"
    v-html="html"
  />
</template>

<script>
export default {
  name: 'MarkdownContent',

  props: {
    source: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'dark',
      validator: (value) => ['dark', 'light'].includes(value)
    }
  },

  computed: {
    html() {
      if (!this.source || !this.$marked) {
        return ''
      }

      return this.$marked.parse(this.source)
    }
  }
}
</script>
