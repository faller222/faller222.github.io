const fs = require('fs')
const path = require('path')

const BLOG_DIR = path.join(__dirname, '../static/content/blog')
const INDEX_FILE = path.join(BLOG_DIR, 'index.json')
const SKIP_DIRS = new Set(['images'])

function titleFromSlug(slug) {
  const last = slug.split('/').pop() || slug
  return last
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function titleFromFile(filePath, slug) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const match = content.match(/^#\s+(.+)$/m)
    if (match) {
      return match[1].trim()
    }
  } catch (error) {
    // fallback below
  }

  return titleFromSlug(slug)
}

function collectPosts(dir, prefix = '') {
  const posts = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'index.json') {
      continue
    }

    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) {
        continue
      }

      const nextPrefix = prefix ? `${prefix}/${entry.name}` : entry.name
      posts.push(...collectPosts(fullPath, nextPrefix))
      continue
    }

    if (!entry.name.endsWith('.md')) {
      continue
    }

    const slug = prefix
      ? `${prefix}/${entry.name.slice(0, -3)}`
      : entry.name.slice(0, -3)

    posts.push({
      slug,
      title: titleFromFile(fullPath, slug)
    })
  }

  return posts.sort((a, b) => a.slug.localeCompare(b.slug))
}

function buildTree(posts) {
  const root = { name: '', children: {}, posts: [] }

  for (const post of posts) {
    const parts = post.slug.split('/')
    let node = root

    for (let index = 0; index < parts.length - 1; index += 1) {
      const part = parts[index]

      if (!node.children[part]) {
        node.children[part] = { name: part, children: {}, posts: [] }
      }

      node = node.children[part]
    }

    node.posts.push(post)
  }

  return root
}

function generateBlogIndex() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }

  const posts = collectPosts(BLOG_DIR)
  const payload = {
    generatedAt: new Date().toISOString(),
    posts,
    tree: buildTree(posts)
  }

  fs.writeFileSync(INDEX_FILE, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(`[blog:index] ${posts.length} posts → ${path.relative(process.cwd(), INDEX_FILE)}`)

  return payload
}

module.exports = generateBlogIndex

if (require.main === module) {
  generateBlogIndex()
}
