<template>
  <div class="container">
    <button @click="saveFile">Save</button>
    <div class="left-div">
        <textarea id="editor-md" @keyup="generate">
# Main Title

## Subtitle

### Smaller Subtitle

---

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

```python
def hello_world():
    print("Hello, World!")
```
---

## Tables

| Header 1 | Header 2 |
|----------|----------|
| Cell 1,1 | Cell 1,2 |
| Cell 2,1 | Cell 2,2 |

---

## Inline Code Lines

`print("Hello, world!")`

---

## Horizontal Lines

---

---

## Escape Characters

\*Italic text\*

---

## Footnotes

Text with a footnote.[^1]

[^1]: This is the footnote.

---

## Block Elements

<details>
  <summary>Click to see content</summary>

  This is a block element that is initially hidden and shown when clicked.
</details>

---

## Superscript and Subscript

Superscript: 2^3^
Subscript: H~2~O

---

## Checkboxes

- [x] Task completed
- [ ] Task pending
        </textarea></div>
    <div class="right-div">
      <div id="render-md"></div>
    </div>
  </div>
</template>

<script>
// TODO - Mejorar los estilos del MD, normalizar con el resto de la app, mejorar el boton de guardar

export default {
  name: 'EditorPage',

  mounted() {
    this.generate()
  },
  methods: {
    generate() {
      try {
        console.log("Generating")
        const editor = document.getElementById('editor-md');
        const render = document.getElementById('render-md');
        console.log(editor)
        render.innerHTML = this.$marked.parse(editor.value);
      } catch (e) {
        console.error(e)
      }
    },
    saveFile() {
      const editor = document.getElementById('editor-md');
      const blob = new Blob([editor.value], {type: "text/plain;charset=utf-8"});
      this.saveAs(blob, "file.md");
    },
    saveAs(blob, filename) {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
  }
}
</script>

<style lang="scss">
button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #002C23;
  background-color: #FFFFFF;
  color: #002C23;
  text-decoration: none;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #002C23;
    color: #FFFFFF;
    border-color: #FFFFFF;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;

  #editor-md {
    width: 100%;
    height: calc(100% - 5px);
    //height: auto;
    max-height: 100%;
    resize: none;
    padding: 1rem;
    border: 0;
  }

  #render-md img {
    max-width: 100%;
  }

  #render-md {
    padding: 1rem;

    img {
      max-width: 100%;
    }
  }
}

.left-div, .right-div {
  flex: 1; /* Ambos divs tomarán el mismo espacio */
  min-width: 0; /* Asegura que los divs puedan reducirse de tamaño */
}

.left-div {
  background-color: #FFFFFF;
}

.right-div {
  //background-color: lightgreen;
  overflow: scroll;
  max-height: 100%;

  a {
    text-decoration: none;
    color: #00FFCE;

    &:visited {
      color: #00FFCE;
    }

    &.active,
    &:hover {
      color: #FFFFFF;
    }
  }
}

@media (max-width: 800px) {
  .container {
    flex-direction: column; /* Cambia la dirección de los divs cuando la pantalla es estrecha */
    .left-div {
      max-height: 30%;
    }
  }
}
</style>
