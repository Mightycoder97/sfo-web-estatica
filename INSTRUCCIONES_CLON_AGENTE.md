# Instrucciones para la Replicación y Reskin de la Aplicación

Este documento contiene las instrucciones detalladas para que otro agente inteligente pueda replicar esta página web aplicando una nueva marca, colores, tipografía corporativa y contenido (reskin), **manteniendo completamente intacto el core funcional, la arquitectura y los layouts de la aplicación**.

---

## 🏗 Stack Tecnológico Actual

- **Framework**: Next.js 16.1.6 (App Router)
- **UI Library**: React 19.2.3
- **Estilos**: Tailwind CSS v4 + Variables CSS Nativas
- **Internacionalización (i18n)**: next-intl (Soporte Multi-idioma, ejemplo `[locale]`)
- **Animaciones**: GSAP y Framer Motion
- **Lenguaje**: TypeScript

---

## 🎨 1. Cambio de Colores y Variables de Diseño (Design Tokens)

Toda la paleta de colores de la aplicación, los bordes (radiuses), transiciones y medidas están centralizadas en **variables CSS** dentro del archivo global de estilos de Tailwind.

- **Archivo a modificar:** `app/[locale]/globals.css` (o donde se encuentre `globals.css` dentro de `app/`).

**Instrucción para el otro agente:**
Reemplaza los valores Hex/RGB de las variables `:root` por los de la nueva marca. 
- `--color-bg-primary` y `--color-bg-secondary` para el fondo.
- `--color-text-primary` y `--color-text-secondary` para el texto base.
- `--color-accent` para el color primario de la marca (botones, links, highlights).
- Actualizar gradientes (ej: `--gradient-accent`).

---

## ✍️ 2. Cambio de Tipografía

La aplicación utiliza Google Fonts inyectadas a través de `next/font/google`. 

- **Archivo a modificar:** `app/[locale]/layout.tsx` (y opcionalmente `globals.css`).

**Instrucción para el otro agente:**
1. En `layout.tsx`, importa las nuevas fuentes deseadas desde `next/font/google`.
   ```tsx
   import { Nueva_Fuente_Primaria, Nueva_Fuente_Secundaria } from "next/font/google";
   ```
2. Configura las variables CSS correspondientes (ej. `--font-primaria`).
3. Actualiza el `className` de la etiqueta `<body>` con las nuevas variables.
4. En `globals.css`, actualiza la sección Typography:
   ```css
   --font-display: var(--font-primaria), sans-serif;
   --font-body: var(--font-secundaria), sans-serif;
   ```

---

## 🌍 3. Cambio de Textos y Contenido Principal (i18n)

La plataforma utiliza internacionalización para estructurar los textos. Esto significa que **NO debes buscar textos duros (hardcoded) en los archivos .tsx**.

- **Archivos a modificar:** `messages/en.json` y `messages/es.json` (o los idiomas que existan).

**Instrucción para el otro agente:**
Revisa y reemplaza el contenido estructurado en los JSON y ajusta la mensajería, nombres de menú, llamadas a la acción (CTAs) e información del footer para reflejar la nueva marca y su tono de voz. 

---

## 🖼 4. Cambio de Imágenes, Recursos y Logotipo

Los recursos visuales se encuentran dentro del directorio público.

- **Directorio a modificar:** `/public/`

**Instrucción para el otro agente:**
1. Reemplaza el logotipo de la marca existente (`/public/logo.png`, `/public/logo.svg`, etc.) por el de la nueva. Presta atención a las versiones clara/oscura si existen.
2. Actualiza el favicon (ej: `/app/[locale]/icon.png` o `/public/favicon.ico`).
3. Reemplaza las fotos o videos estáticos usados en la página (Hero, Galería, Eventos, Nosotros) por imágenes en alta resolución aptas para la nueva marca.

---

## ⚙️ 5. Metadatos SEO y OpenGraph

El SEO es configurado estáticamente a nivel de layout y páginas.

- **Archivo a modificar:** El objeto `metadata` exportado en `app/[locale]/layout.tsx` o en los `page.tsx` correspondientes.

**Instrucción para el otro agente:**
Actualiza el Título, Descripción, Keywords y metadata de OpenGraph (`openGraph.title`, `openGraph.description`) para hacer match con el nombre, ubicación y sector del nuevo sitio web (ej. si era un Restaurante, y ahora es una marca de Ropa, actualizar de acorde).

---

## ❗ Reglas Estrictas (Lo que NO debes modificar)

Para garantizar la misma funcionalidad, el agente implementador **DEBE RESPETAR**:

1. **Estructura de Carpetas App Router**: No alterar las rutas estáticas ni dinámicas (`[locale]`, `[slug]`, etc.).
2. **Lógica de React / Event Handlers**: No cambies los estados `useState`, llamadas a APIs, o hooks personalizados.
3. **Core Animation Stack**: Deja las clases como `animate-float`, `.foto-premium`, llamadas a `framer-motion` o `gsap`.
4. **Plantillas Componentizadas**: Los archivos en la carpeta `/components` como `Header.tsx`, `Footer.tsx` o `MenuPreview.tsx` pueden sufrir cambios _mínimos_ en su Tailwind markup, pero no debes alterar su estructura de HTML ni sus props fundamentales.
