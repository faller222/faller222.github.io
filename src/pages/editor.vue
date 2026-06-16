<template>
  <div class="editor-page">
    <header class="editor-toolbar">
      <div class="editor-toolbar__left">
        <nuxt-link class="editor-toolbar__back" to="/">← Inicio</nuxt-link>
        <span class="editor-toolbar__title">Editor Markdown</span>
        <span v-if="loadedSlug" class="editor-toolbar__slug">/blog/{{ loadedSlug }}</span>
      </div>
      <div class="editor-toolbar__actions">
        <button type="button" class="btn" @click="saveFile">Descargar .md</button>
      </div>
    </header>

    <div v-if="loadError" class="editor-error">{{ loadError }}</div>

    <div class="editor-layout">
      <div class="editor-panel editor-panel--source">
        <label class="editor-panel__label" for="editor-md">Fuente</label>
        <textarea
          id="editor-md"
          v-model="source"
          spellcheck="false"
          @input="onInput"
        />
      </div>
      <div class="editor-panel editor-panel--preview">
        <label class="editor-panel__label">Vista previa</label>
        <div class="editor-panel__content">
          <markdown-content :source="source" variant="light" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DEFAULT_MARKDOWN, fetchMarkdown } from '@/common/markdown'

export default {
  name: 'EditorPage',

  data() {
    return {
      source: DEFAULT_MARKDOWN,
      loadedSlug: null,
      loadError: null
    }
  },

  async mounted() {
    const slug = this.$route.query.file

    if (slug) {
      await this.loadFromSlug(slug)
    }
  },

  watch: {
    '$route.query.file': {
      immediate: false,
      async handler(slug) {
        if (slug) {
          await this.loadFromSlug(slug)
        } else {
          this.loadedSlug = null
          this.loadError = null
          this.source = DEFAULT_MARKDOWN
        }
      }
    }
  },

  methods: {
    onInput() {
      this.loadError = null
    },

    async loadFromSlug(slug) {
      try {
        this.loadError = null
        this.source = await fetchMarkdown(slug)
        this.loadedSlug = slug.replace(/^\/+|\/+$/g, '')
      } catch (error) {
        this.loadError = error.message
        this.loadedSlug = null
      }
    },

    saveFile() {
      const filename = this.loadedSlug ? `${this.loadedSlug.split('/').pop()}.md` : 'file.md'
      const blob = new Blob([this.source], { type: 'text/plain;charset=utf-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      link.click()
      window.URL.revokeObjectURL(link.href)
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #002C23;
}

.editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(0, 255, 206, 0.2);
  background: rgba(0, 0, 0, 0.15);
  flex-wrap: wrap;
}

.editor-toolbar__left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.editor-toolbar__back {
  color: #00FFCE;
  font-weight: 500;

  &:hover {
    color: #FFFFFF;
  }
}

.editor-toolbar__title {
  font-weight: 700;
  color: #FFFFFF;
}

.editor-toolbar__slug {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
}

.editor-toolbar__actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 0.9rem;
  border-radius: 0.5rem;
  border: 1px solid #00FFCE;
  background: transparent;
  color: #00FFCE;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #00FFCE;
    color: #002C23;
  }
}

.editor-error {
  margin: 0.75rem 1rem 0;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: rgba(255, 80, 80, 0.15);
  border: 1px solid rgba(255, 120, 120, 0.4);
  color: #ffb4b4;
}

.editor-layout {
  display: flex;
  flex: 1;
  min-height: 0;
}

.editor-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: calc(100vh - 57px);
}

.editor-panel__label {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.editor-panel--source {
  border-right: 1px solid rgba(0, 255, 206, 0.15);

  .editor-panel__label {
    background: rgba(255, 255, 255, 0.04);
  }

  textarea {
    flex: 1;
    width: 100%;
    min-height: 0;
    resize: none;
    padding: 1rem;
    border: 0;
    background: #FFFFFF;
    color: #002C23;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }
}

.editor-panel--preview {
  .editor-panel__label {
    background: rgba(0, 0, 0, 0.12);
  }
}

.editor-panel__content {
  flex: 1;
  overflow: auto;
  padding: 1rem 1.25rem;
  background: #f8fafa;
}

@media (max-width: 900px) {
  .editor-layout {
    flex-direction: column;
  }

  .editor-panel {
    min-height: 45vh;
  }

  .editor-panel--source {
    border-right: 0;
    border-bottom: 1px solid rgba(0, 255, 206, 0.15);
  }
}
</style>
