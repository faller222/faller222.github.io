<template>
  <div class="blog-shell blog-shell--editor">
    <blog-sidebar
      :current-slug="loadedSlug"
      mode="editor"
      @download="saveFile"
    />

    <div class="blog-shell__content">
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
.blog-shell {
  display: flex;
  min-height: 100vh;
  background: #002C23;
}

.blog-shell--editor {
  .blog-shell__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding-top: 3.25rem;

    @media (min-width: 900px) {
      padding-top: 0;
    }
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
  min-height: calc(100vh - 3.25rem);

  @media (min-width: 900px) {
    min-height: 100vh;
  }
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

@media (max-width: 899px) {
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
