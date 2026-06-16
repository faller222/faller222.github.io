export const CONTENT_BASE_PATH = '/content/blog'

export const DEFAULT_MARKDOWN = `# Main Title

## Subtitle

### Smaller Subtitle

---

*Italic text* or _also like this_

**Bold text** or __also like this__

***Italic and bold text***

---

## Lists

### Unordered List

- Element 1
- Element 2
  - Subelement 2.1
  - Subelement 2.2
- Element 3

### Ordered List

1. First element
2. Second element
   1. Subelement 2.1
   2. Subelement 2.2
3. Third element

---

## Links and Images

[Link to Google](https://www.google.com)

![Image](https://picsum.photos/800/600)

---

## Quotes and Code Blocks

> This is a quote

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

---

## Tables

| Header 1 | Header 2 |
|----------|----------|
| Cell 1,1 | Cell 1,2 |
| Cell 2,1 | Cell 2,2 |

---

## Inline Code Lines

\`print("Hello, world!")\`

---

## Horizontal Lines

---

---

## Escape Characters

\\*Italic text\\*

---

## Block Elements

<details>
  <summary>Click to see content</summary>

  This is a block element that is initially hidden and shown when clicked.
</details>

---

## Checkboxes

- [x] Task completed
- [ ] Task pending
`

export function contentUrl(slug) {
  const normalized = slug.replace(/^\/+|\/+$/g, '')
  return `${CONTENT_BASE_PATH}/${normalized}.md`
}

export async function fetchMarkdown(slug) {
  const response = await fetch(contentUrl(slug))

  if (!response.ok) {
    throw new Error(`No se encontró el archivo: ${slug}`)
  }

  return response.text()
}
