<template>
  <div class="blog-viewer">
    <header class="blog-viewer__header">
      <nuxt-link class="blog-viewer__back" to="/">← Inicio</nuxt-link>
      <span class="blog-viewer__path">/content/blog/{{ slug }}.md</span>
    </header>

    <main class="blog-viewer__main">
      <div v-if="loading" class="blog-viewer__state">Cargando…</div>
      <div v-else-if="error" class="blog-viewer__state blog-viewer__state--error">{{ error }}</div>
      <markdown-content v-else :source="source" variant="dark" />
    </main>
  </div>
</template>

<script>
import { fetchMarkdown } from '@/common/markdown'

export default {
  name: 'BlogViewerPage',

  data() {
    return {
      source: '',
      loading: true,
      error: null
    }
  },

  computed: {
    slug() {
      return this.$route.params.slug
    }
  },

  watch: {
    slug: {
      immediate: true,
      handler() {
        this.loadPost()
      }
    }
  },

  methods: {
    async loadPost() {
      this.loading = true
      this.error = null
      this.source = ''

      try {
        this.source = await fetchMarkdown(this.slug)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  },

  head() {
    return {
      title: this.slug ? `${this.slug} | Blog` : 'Blog'
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-viewer {
  min-height: 100vh;
  background: #002C23;
}

.blog-viewer__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(0, 255, 206, 0.2);
  background: rgba(0, 0, 0, 0.15);
}

.blog-viewer__back {
  color: #00FFCE;
  font-weight: 500;

  &:hover {
    color: #FFFFFF;
  }
}

.blog-viewer__path {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.blog-viewer__main {
  max-width: 820px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

.blog-viewer__state {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;

  &--error {
    color: #ffb4b4;
  }
}
</style>
