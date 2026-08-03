# Web de precios — Lavadero

Web estática (HTML + CSS + JS), sin base de datos real: los precios viven en
`precios.json`, un archivo de texto que editás vos mismo. Nada de servidores,
nada de mantenimiento.

## Archivos
```
lavadero/
├── index.html      → estructura de la página (no hace falta tocarlo)
├── styles.css       → diseño visual (no hace falta tocarlo)
├── script.js         → arma la página a partir de precios.json (no tocarlo)
├── precios.json      → ⭐ ACÁ CAMBIÁS LOS PRECIOS
└── images/            → íconos de cada servicio (podés reemplazarlos por fotos reales)
```

## 1) Cómo subir un precio (lo único que vas a tocar seguido)

Abrí `precios.json` con cualquier editor de texto (hasta el Bloc de notas
sirve, o directamente el editor de archivos de GitHub desde el celu) y
cambiá el número de `"precio"`. Por ejemplo:

```json
"precio": 8000,
```
lo cambiás a
```json
"precio": 9000,
```

Guardá el archivo. Listo — la próxima vez que alguien escanee el QR va a
ver el precio nuevo. No hace falta tocar ningún otro archivo.

También podés:
- Agregar un servicio nuevo copiando uno de los bloques `{ ... }` dentro de `"servicios"`.
- Cambiar `"nombre"`, `"direccion"` y `"horario"` del negocio arriba del todo.
- Poner una foto real en vez del ícono: subí la imagen a la carpeta `images/`
  y cambiá el campo `"imagen"` por su nombre, ej: `"images/mi-foto.jpg"`.

## 2) Reserva de turno con Google Calendar (gratis)

1. Andá a [calendar.google.com](https://calendar.google.com) con tu cuenta de Google (o creá una gratis).
2. Botón **Crear** → **Cita** → **Programación de citas** (Appointment schedule).
3. Configurá duración de cada turno, horarios de atención, y cuántos autos
   podés atender a la vez.
4. Guardá y copiá el **link público** que te da Google (algo como
   `https://calendar.app.google/xxxxxxx`).
5. Pegalo en `precios.json`, en el campo `"reserva_url_default"`. Eso hace
   que **todas** las tarjetas reserven ahí.
   - Si en el futuro querés que cada servicio reserve en una agenda distinta,
     agregá `"reserva_url": "..."` dentro de ese servicio puntual — pisa al link por defecto.

Vos vas a recibir la reserva por email y en tu Google Calendar, con
recordatorios automáticos. Es 100% gratis, sin límite de turnos.

## 3) Hostear gratis (para que el QR funcione desde cualquier celular)

La opción más simple es **GitHub Pages**:

1. Creá una cuenta gratis en [github.com](https://github.com) si no tenés.
2. Creá un repositorio nuevo, por ejemplo `lavadero-precios` (puede ser público).
3. Subí estos 5 elementos (`index.html`, `styles.css`, `script.js`,
   `precios.json`, carpeta `images/`) arrastrándolos a la página del repo
   ("Add file" → "Upload files").
4. Andá a **Settings → Pages**, en "Branch" elegí `main` y guardá.
5. En un minuto vas a tener tu web en:
   `https://TU-USUARIO.github.io/lavadero-precios/`

Alternativa igual de gratis y aún más simple (arrastrar y soltar, sin
cuenta de GitHub): [Netlify Drop](https://app.netlify.com/drop) — arrastrás
la carpeta y te da un link al instante.

Para editar precios después de hostear en GitHub Pages: entrás al repo desde
el celu o la PC, abrís `precios.json`, tocás el lápiz (editar), cambiás el
número y le das "Commit changes". Se actualiza solo.

## 4) Generar el QR

Una vez que tengas el link (paso 3), andá a un generador gratuito como
[qr-code-generator.com](https://www.qr-code-generator.com/) o
[qrcode-monkey.com](https://www.qrcode-monkey.com/), pegá tu URL, descargá el
PNG/SVG e imprimilo para el local.

## Notas
- No hace falta base de datos real: para un solo local con una lista de
  precios que cambia de vez en cuando, un archivo JSON es más simple, gratis
  y no se rompe. Si en el futuro querés que varios empleados editen precios
  desde el celu con una app en vez de tocar código, ahí sí conviene sumar
  algo como Google Sheets como base de datos — avisame y lo armamos.
