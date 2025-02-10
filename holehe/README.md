# Holehe Docker

Este contenedor permite ejecutar **Holehe** fácilmente sin necesidad de instalación manual.

## 🚀 Uso rápido

Para analizar un correo electrónico:

```sh
docker run --rm faller222/holehe email@example.com
```

(Sustituye `email@example.com` con el correo a investigar).

## 🛠 Construcción manual

Si deseas construir la imagen localmente:

```sh
docker build -t faller222/holehe .
```

## 🔗 Fuente

Este contenedor se basa en [Holehe](https://github.com/megadose/holehe).