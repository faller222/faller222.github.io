<template>
  <div class="blog-sidebar-shell" :class="{'blog-sidebar-shell--collapsed': collapsed}">
    <button
      v-if="collapsed"
      type="button"
      class="blog-sidebar-toggle"
      aria-label="Abrir menú del blog"
      @click="toggleCollapsed"
    >
      ☰
    </button>

    <aside
      class="blog-sidebar"
      :class="{
        'blog-sidebar--collapsed': collapsed,
        'blog-sidebar--mobile-open': mobileOpen
      }"
    >
      <div class="blog-sidebar__header">
        <button
          type="button"
          class="blog-sidebar__close"
          aria-label="Cerrar menú del blog"
          @click="toggleCollapsed"
        >
          ×
        </button>
        <span class="blog-sidebar__title">Blog</span>
      </div>

      <div class="blog-sidebar__nav">
        <nuxt-link to="/" class="blog-sidebar__home" @click.native="closeMobile">
          ← Volver al inicio
        </nuxt-link>

        <p v-if="loading" class="blog-sidebar__state">Cargando índice…</p>
        <p v-else-if="error" class="blog-sidebar__state blog-sidebar__state--error">{{ error }}</p>

        <blog-sidebar-tree
          v-else-if="tree"
          :nodes="tree"
          :current-slug="currentSlug"
          :mode="mode"
          :open-folders="openFolders"
          @toggle-folder="toggleFolder"
          @navigate="closeMobile"
        />
      </div>

      <div class="blog-sidebar__footer">
        <nuxt-link
          v-if="mode === 'viewer' && currentSlug"
          :to="editorPath(currentSlug)"
          class="blog-sidebar__footer-link"
          @click.native="closeMobile"
        >
          Editar este post
        </nuxt-link>
        <button
          v-if="mode === 'editor'"
          type="button"
          class="blog-sidebar__footer-btn"
          @click="$emit('download')"
        >
          Descargar .md
        </button>
      </div>
    </aside>

    <div
      v-if="mobileOpen"
      class="blog-sidebar-backdrop"
      @click="closeMobile"
    />
  </div>
</template>

<script>
import { editorPath, fetchBlogIndex } from '@/common/blog-index'

export default {
  name: 'BlogSidebar',

  props: {
    currentSlug: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'viewer',
      validator: (value) => ['viewer', 'editor'].includes(value)
    }
  },

  data() {
    return {
      collapsed: false,
      mobileOpen: false,
      loading: true,
      error: null,
      tree: null,
      openFolders: {}
    }
  },

  async mounted() {
    if (window.innerWidth < 900) {
      this.collapsed = true
    }

    await this.loadIndex()
    this.expandPathToCurrent()
  },

  watch: {
    currentSlug() {
      this.expandPathToCurrent()
    }
  },

  methods: {
    editorPath,

    async loadIndex() {
      this.loading = true
      this.error = null

      try {
        const index = await fetchBlogIndex()
        this.tree = index.tree
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    expandPathToCurrent() {
      if (!this.currentSlug || !this.tree) {
        return
      }

      const parts = this.currentSlug.split('/')
      let path = ''

      for (let index = 0; index < parts.length - 1; index += 1) {
        path = path ? `${path}/${parts[index]}` : parts[index]
        this.$set(this.openFolders, path, true)
      }
    },

    toggleFolder(path) {
      this.$set(this.openFolders, path, !this.openFolders[path])
    },

    toggleCollapsed() {
      if (window.innerWidth < 900) {
        this.mobileOpen = !this.mobileOpen
        this.collapsed = !this.mobileOpen
        return
      }

      this.collapsed = !this.collapsed
    },

    closeMobile() {
      if (window.innerWidth < 900) {
        this.mobileOpen = false
        this.collapsed = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-sidebar-shell {
  position: relative;
  flex-shrink: 0;
}

.blog-sidebar-toggle {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 1100;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgba(0, 255, 206, 0.35);
  border-radius: 0.5rem;
  background: rgba(0, 44, 35, 0.95);
  color: #00FFCE;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: #00FFCE;
    color: #002C23;
  }
}

.blog-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  width: min(280px, 88vw);
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  border-right: 1px solid rgba(0, 255, 206, 0.2);
  background: rgba(0, 20, 16, 0.98);
  transition: transform 0.2s ease;
}

.blog-sidebar--collapsed {
  transform: translateX(-100%);
  pointer-events: none;
}

.blog-sidebar__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  min-width: 0;
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.blog-sidebar__close {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border: 1px solid rgba(0, 255, 206, 0.35);
  border-radius: 0.4rem;
  background: transparent;
  color: #00FFCE;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: #00FFCE;
    color: #002C23;
  }
}

.blog-sidebar__title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.blog-sidebar__nav {
  position: relative;
  top: auto;
  right: auto;
  left: auto;
  z-index: auto;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.75rem 0;
  -webkit-overflow-scrolling: touch;
}

.blog-sidebar__home {
  display: block;
  margin: 0 0.75rem 0.75rem;
  padding: 0.55rem 0.75rem;
  border-radius: 0.5rem;
  background: rgba(0, 255, 206, 0.1);
  color: #00FFCE;
  font-weight: 600;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    background: rgba(0, 255, 206, 0.2);
    color: #FFFFFF;
  }
}

.blog-sidebar__state {
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;

  &--error {
    color: #ffb4b4;
  }
}

.blog-sidebar__footer {
  flex: 0 0 auto;
  margin-top: auto;
  min-width: 0;
  width: 100%;
  padding: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 20, 16, 1);
  overflow: hidden;
}

.blog-sidebar__footer-link,
.blog-sidebar__footer-btn {
  display: block;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: 0.55rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 255, 206, 0.35);
  background: transparent;
  color: #00FFCE;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    background: #00FFCE;
    color: #002C23;
  }
}

.blog-sidebar-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1040;
  background: rgba(0, 0, 0, 0.45);
}

@media (min-width: 900px) {
  .blog-sidebar-shell {
    width: 280px;
    transition: width 0.2s ease;
  }

  .blog-sidebar-shell--collapsed {
    width: 0;
  }

  .blog-sidebar {
    position: sticky;
    top: 0;
    width: 280px;
    transform: none;
    pointer-events: auto;
  }

  .blog-sidebar--collapsed {
    transform: translateX(-100%);
    pointer-events: none;
  }
}

@media (max-width: 899px) {
  .blog-sidebar--mobile-open {
    transform: translateX(0);
    pointer-events: auto;
  }
}
</style>
