<template>
  <ul class="blog-sidebar-tree" :class="{'blog-sidebar-tree--nested': depth > 0}">
    <li
      v-for="folder in folders"
      :key="`folder-${folderPath(folder.name)}`"
      class="blog-sidebar-tree__folder"
    >
      <button
        type="button"
        class="blog-sidebar-tree__folder-btn"
        :style="{ paddingLeft: `${0.75 + depth * 0.75}rem` }"
        @click="toggleFolder(folder.name)"
      >
        <span class="blog-sidebar-tree__chevron" :class="{'blog-sidebar-tree__chevron--open': isOpen(folder.name)}">›</span>
        <span class="blog-sidebar-tree__folder-label">{{ folderLabel(folder.name) }}</span>
      </button>
      <blog-sidebar-tree
        v-show="isOpen(folder.name)"
        :nodes="folder.children"
        :depth="depth + 1"
        :current-slug="currentSlug"
        :mode="mode"
        :parent-path="folderPath(folder.name)"
        :open-folders="openFolders"
        @toggle-folder="$emit('toggle-folder', $event)"
      />
    </li>

    <li
      v-for="post in posts"
      :key="post.slug"
      class="blog-sidebar-tree__post"
    >
      <nuxt-link
        :to="linkFor(post.slug)"
        class="blog-sidebar-tree__link"
        :class="{'blog-sidebar-tree__link--active': post.slug === currentSlug}"
        :style="{ paddingLeft: `${1.25 + depth * 0.75}rem` }"
        :title="post.title"
        @click.native="$emit('navigate')"
      >
        {{ post.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import { blogPostPath, editorPath, folderLabel } from '@/common/blog-index'

export default {
  name: 'BlogSidebarTree',

  props: {
    nodes: {
      type: Object,
      required: true
    },
    depth: {
      type: Number,
      default: 0
    },
    parentPath: {
      type: String,
      default: ''
    },
    currentSlug: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'viewer'
    },
    openFolders: {
      type: Object,
      required: true
    }
  },

  computed: {
    folders() {
      return Object.keys(this.nodes.children || {})
        .sort()
        .map((name) => ({
          name,
          children: this.nodes.children[name]
        }))
    },

    posts() {
      return [...(this.nodes.posts || [])].sort((a, b) => a.title.localeCompare(b.title))
    }
  },

  methods: {
    folderLabel,

    folderPath(name) {
      return this.parentPath ? `${this.parentPath}/${name}` : name
    },

    isOpen(name) {
      return Boolean(this.openFolders[this.folderPath(name)])
    },

    toggleFolder(name) {
      this.$emit('toggle-folder', this.folderPath(name))
    },

    linkFor(slug) {
      return this.mode === 'editor' ? editorPath(slug) : blogPostPath(slug)
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-sidebar-tree {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.blog-sidebar-tree--nested {
  margin-left: 0;
}

.blog-sidebar-tree__folder,
.blog-sidebar-tree__post {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
}

.blog-sidebar-tree__folder-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: 0.45rem 0.75rem;
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;

  &:hover {
    color: #00FFCE;
    background: rgba(0, 255, 206, 0.08);
  }
}

.blog-sidebar-tree__folder-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.blog-sidebar-tree__chevron {
  display: inline-block;
  flex-shrink: 0;
  width: 0.75rem;
  transition: transform 0.15s ease;
  color: #00FFCE;
}

.blog-sidebar-tree__chevron--open {
  transform: rotate(90deg);
}

.blog-sidebar-tree__link {
  display: block;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: 0.45rem 0.75rem;
  padding-right: 0.75rem;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  line-height: 1.4;
  text-decoration: none;
  border-left: 2px solid transparent;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.05);
  }

  &--active {
    color: #00FFCE;
    border-left-color: #00FFCE;
    background: rgba(0, 255, 206, 0.1);
    font-weight: 600;
  }
}
</style>
