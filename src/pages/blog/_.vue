<template>
  <div class="blog-shell">
    <blog-sidebar :current-slug="slug" mode="viewer" />

    <main class="blog-shell__main">
      <div v-if="loading" class="blog-shell__state">Cargando…</div>
      <div v-else-if="error" class="blog-shell__state blog-shell__state--error">{{ error }}</div>
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
      const pathMatch = this.$route.params.pathMatch

      if (Array.isArray(pathMatch)) {
        return pathMatch.join('/')
      }

      return (pathMatch || this.$route.params.slug || '').replace(/^\/+|\/+$/g, '')
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
      if (!this.slug) {
        this.loading = false
        this.error = 'No se indicó ningún post.'
        return
      }

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
.blog-shell {
  display: flex;
  min-height: 100vh;
  background: #002C23;
}

.blog-shell__main {
  flex: 1;
  min-width: 0;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 3.5rem 1rem 4rem;
  overflow-x: hidden;

  @media (min-width: 900px) {
    padding: 2rem 2rem 4rem 1rem;
  }
}

.blog-shell__state {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;

  &--error {
    color: #ffb4b4;
  }
}
</style>
