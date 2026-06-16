# Primera app en Firebase — lo que nadie te cuenta

Arrancar con Firebase parece simple. La documentación es buena, la consola es linda, y en teoría en 10 minutos tenés todo funcionando. En la práctica hay algunas trampas que te roban tiempo si no sabés dónde mirar.

Acá van los pasos reales y los piques que tuvimos en el camino.

---

## Crear el proyecto

Nada raro acá. [console.firebase.google.com](https://console.firebase.google.com), nuevo proyecto, siguiente siguiente siguiente.

Lo que sí vale la pena pensar antes de hacer click: el nombre del proyecto define el subdominio de Firebase Hosting y el ID de Firestore. Después se puede cambiar el nombre visible pero no el ID. Elegilo bien.

---

## Firestore — qué edition elegir

Cuando creás la base de datos te pregunta entre **Standard** y **Enterprise**. Enterprise es para casos con MongoDB compatibility y Pipelines. Para el 99% de los proyectos, Standard es lo correcto y punto.

En el paso siguiente te pide región. Si tus usuarios están en Argentina o Sudamérica, elegí `southamerica-east1` (São Paulo). La diferencia de latencia con `us-east1` se nota en el día a día.

---

## Las Security Rules — el paso que todos saltean

Firebase viene en modo producción con todo bloqueado:

```
allow read, write: if false;
```

Está bien que sea así. El problema es que mucha gente lo cambia a `if true` para que "funcione" y se olvida de volver. Eso deja la base de datos abierta para cualquier persona autenticada — no solo para el dueño de cada documento.

La regla mínima correcta para una app con usuarios es:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

Esto garantiza que cada usuario solo puede leer y escribir su propio documento. Sin middleware, sin backend. Las reglas son el backend.

Las Rules están en **Firestore Database → Rules** (no en Authentication, no en App Check — me costó encontrarlas la primera vez).

---

## Google Auth — dónde se activa

Authentication → Sign-in method → Google → activar. Fácil.

Lo que no es tan obvio: Google Auth no es solo Firebase. Por detrás usa OAuth 2.0 de Google Cloud, y eso tiene su propia configuración en [console.cloud.google.com](https://console.cloud.google.com).

---

## El error que te va a aparecer en localhost

```
Error 400: origin_mismatch
```

Esto pasa sí o sí la primera vez que probás el login en local. Firebase sabe que tu app existe, pero Google no sabe que `localhost` es un origen válido para hacer OAuth.

**Solución:**

1. Ir a [console.cloud.google.com](https://console.cloud.google.com)
2. Seleccionar tu proyecto
3. APIs & Services → Credentials
4. Click en el OAuth 2.0 Client ID que Firebase creó automáticamente (dice "Web client (auto created by Google Service)")
5. En **Authorized JavaScript origins** agregar `http://localhost` y el puerto que estés usando (ej: `http://localhost:5000`)
6. Guardar

Puede tardar unos minutos en propagarse. No es un bug de tu código.

---

## Firebase Hosting — el servidor que no necesitás tener

La decisión que más simplificó la arquitectura: usar Firebase Hosting en lugar de un servidor Node.js propio.

Firebase Hosting es una CDN global que sirve archivos estáticos. No hay cold start, no hay servidor que mantener, no hay costo adicional si ya estás en el plan gratuito. El deploy es un `firebase deploy` y listo.

Los headers de caché se configuran en `firebase.json`:

```json
{
  "hosting": {
    "public": "public",
    "headers": [
      {
        "source": "**/*.html",
        "headers": [{ "key": "Cache-Control", "value": "no-cache" }]
      },
      {
        "source": "sw.js",
        "headers": [{ "key": "Cache-Control", "value": "no-cache" }]
      }
    ]
  }
}
```

Los assets con versión en el nombre (ej: `styles.v3.css`) pueden tener caché agresivo porque cuando el archivo cambia, cambia el nombre.

---

## El firebaseConfig no es un secreto

El objeto `firebaseConfig` con el `apiKey` está pensado para vivir en el frontend. No es una credencial privada en el sentido tradicional. La seguridad real viene de las Security Rules de Firestore y de los dominios autorizados en la consola.

Dicho eso, sí vale configurar bien los **Authorized domains** en Authentication → Settings para que solo tus dominios reales puedan usar tu proyecto.

---

## onSnapshot — el socket que ya viene incluido

Para sincronización en tiempo real entre dispositivos, Firestore tiene `onSnapshot()`. Es un listener sobre WebSocket que Firebase mantiene abierto. Cuando el documento cambia desde cualquier otro dispositivo, el cambio llega instantáneo sin polling ni timers.

```js
onSnapshot(doc(db, "users", uid), (snapshot) => {
  const data = snapshot.data();
  // comparar timestamps, rehidratar UI si hay cambios
});
```

Mucho más limpio que un `setInterval` cada N minutos.

---

## Resumen rápido

- **Standard edition** en Firestore, siempre.
- **Región cercana** a tus usuarios desde el principio — no se puede cambiar después.
- **Security Rules** antes de poner la app en producción, no después.
- **origin_mismatch** en localhost → agregar el origen en Google Cloud Console, no en Firebase.
- **Firebase Hosting** elimina la necesidad de un servidor propio para estáticos.
- **onSnapshot** para tiempo real, sin polling.
