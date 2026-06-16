# Showcase Markdown del blog

Página de referencia **exhaustiva** para el visor. Todo lo que ves acá es Markdown estático en `static/content/blog/welcome.md`, servido en `/blog/welcome`.

![Banner del sitio — cohete](/content/blog/images/german_faller_rocket.svg "Cohete Germán Faller")

---

## Encabezados

# H1 con hash
## H2 con hash
### H3 con hash
#### H4 con hash
##### H5 con hash
###### H6 con hash

Encabezado estilo Setext (nivel 1)
==================================

Encabezado estilo Setext (nivel 2)
----------------------------------

---

## Énfasis y texto inline

Párrafo normal con *cursiva con asterisco*, _cursiva con guión bajo_, **negrita con asterisco**, __negrita con guión bajo__, ***negrita y cursiva***, ~~texto tachado (GFM)~~ y `código inline` dentro de una oración.

También podés escapar caracteres: \*no es cursiva\*, \`no es código\`, \[no es link\](url).

Combinación real: un `const x = 42` junto a **API REST** y un [enlace inline](https://developer.mozilla.org/es/docs/Web/HTTP).

---

## Enlaces

| Tipo | Ejemplo |
|:-----|:--------|
| Inline | [MDN — Markdown](https://developer.mozilla.org/es/docs/Glossary/Markdown) |
| Con título | [GitHub](https://github.com/faller222 "Repo de Germán") |
| Autolink URL | https://www.google.com |
| Autolink email | faller222@example.com |
| Referencia | [documentación de marked][marked-docs] |

[marked-docs]: https://marked.js.org "Parser que usamos"

---

## Imágenes

### Imagen remota (fotografía)

![Paisaje aleatorio](https://picsum.photos/seed/welcome-landscape/960/420 "Foto de Picsum")

### Imágenes locales del repo

![Saturno](/content/blog/images/german_faller_saturn.svg)

![Corazón hibiscus](/content/blog/images/hibiscus_heart.svg "Ícono decorativo")

### Imagen por referencia

![Cohete por referencia][img-rocket]

[img-rocket]: /content/blog/images/german_faller_rocket.svg "SVG local"

### Imagen con enlace (HTML permitido por marked)

[![Foto enlazada a Google](https://picsum.photos/seed/welcome-thumb/320/180)](https://www.google.com)

---

## Citas (blockquotes)

> Una cita simple.
>
> Con varios párrafos dentro del mismo bloque.

> Cita anidada nivel 1
>
> > Cita anidada nivel 2
> >
> > Con **formato** y `código`

> **Nota:** las citas pueden incluir listas:
>
> - Punto A
> - Punto B

---

## Listas

### Desordenada

- Primer ítem
- Segundo ítem
  - Subítem 2.1
  - Subítem 2.2
    - Subítem 2.2.1
- Tercer ítem

### Ordenada

1. Paso uno
2. Paso dos
   1. Subpaso 2.1
   2. Subpaso 2.2
3. Paso tres

### Lista de tareas (GFM)

- [x] Estilos `.markdown-body`
- [x] Modo visor `/blog/:slug`
- [x] Modo editor `/editor?file=...`
- [ ] Índice automático de posts
- [ ] Subcarpetas tipo `/blog/2026/marzo/post`

---

## Código

### Bloque con sintaxis (fences)

```javascript
const slug = 'welcome'
const visor = `/blog/${slug}`
const editor = `/editor?file=${slug}`

export function routes(slug) {
  return { visor, editor }
}
```

```python
def fibonacci(n: int) -> list[int]:
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result
```

```bash
cd src
npm run dev
open http://localhost:3000/blog/welcome
```

```json
{
  "contentDir": "static/content/blog",
  "routes": {
    "viewer": "/blog/:slug",
    "editor": "/editor?file=:slug"
  }
}
```

### Bloque sin lenguaje

```
Texto plano
  con indentación
    visual
```

### Código indentado (estilo clásico)

    function legacy() {
      return 'bloque con 4 espacios';
    }

---

## Tablas (GFM)

| Alineación izquierda | Centrado | Alineación derecha |
|:---------------------|:--------:|-------------------:|
| Celda A1             | Celda B1 |               100 |
| Celda A2 con `code`  | **bold** |             3.141 |
| [link](https://example.com) | *italic* |                42 |

| Modo | Ruta | Archivo fuente |
|------|------|----------------|
| Visor | `/blog/welcome` | `static/content/blog/welcome.md` |
| Editor | `/editor?file=welcome` | mismo archivo |
| Guía extra | `/blog/formatos` | `static/content/blog/formatos.md` |

---

## Líneas horizontales

Arriba del primer separador.

---

Entre separadores.

***

Otro estilo de HR.

___

Listo.

---

## HTML embebido (soportado por marked)

<details>
  <summary>Click para expandir — sección colapsable</summary>

  Contenido oculto con **markdown** mezclado y una lista:

  - Item oculto 1
  - Item oculto 2
</details>

Texto con <kbd>Ctrl</kbd> + <kbd>S</kbd> y un resaltado <mark>importante</mark> vía HTML inline.

---

## Flujo del sistema (diagrama ASCII)

```
static/content/blog/*.md
        │
        ▼
  fetchMarkdown(slug)
        │
        ▼
  MarkdownContent.vue  ──►  marked (GFM)
        │
        ├── /blog/:slug     (solo lectura)
        └── /editor?file=   (edición + preview)
```

---

## Lo que **no** está soportado (sin extensiones)

Estas sintaxis de otros flavors **no** las parsea `marked` básico — si las ves abajo, aparecen como texto plano a propósito:

- Footnotes: texto[^1] y [^1]: nota al pie
- Superíndice: 2^3^
- Subíndice: H~2~O
- Emoji cortcodes tipo :rocket: (depende del parser)

No pierdas tiempo peleando con eso hasta que agregues extensiones o cambies de librería.

---

## Resumen final

| Elemento | Estado |
|----------|--------|
| Headings hash + setext | OK |
| Énfasis, tachado, código | OK |
| Links, autolinks, refs | OK |
| Imágenes local + remota | OK |
| Listas, tareas, tablas | OK |
| Blockquotes anidados | OK |
| Fences + indentado | OK |
| HR, details, HTML inline | OK |

**Siguiente paso tuyo:** crear más `.md` en `static/content/blog/` y abrirlos en `/blog/nombre`.

---

*Última actualización: showcase completo para validar el visor.*
