# AR Viewer Demo

Visualizador de modelos 3D con soporte para Realidad Aumentada (AR) usando model-viewer.

## 📋 Tabla de Contenidos

- [Instalación y Configuración Inicial](#instalación-y-configuración-inicial)
- [Uso del Proyecto](#uso-del-proyecto)
- [Agregar Modelos 3D](#agregar-modelos-3d)
- [Eliminar Modelos](#eliminar-modelos)
- [Modificar Configuración](#modificar-configuración)
- [Comandos Disponibles](#comandos-disponibles)
- [Tutorial para Principiantes](#tutorial-para-principiantes)

## 🚀 Instalación y Configuración Inicial

### Requisitos Previos

- Node.js (versión 18 o superior)
- npm (viene incluido con Node.js)

### Instalación

1. Abre una terminal en la carpeta del proyecto
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en la URL que aparece en la terminal (generalmente `http://localhost:5173`)

## 💻 Uso del Proyecto

### Ver Modelos en el Navegador

1. Inicia el servidor de desarrollo con `npm run dev`
2. Navega a la URL mostrada en la terminal
3. Verás un carrusel de modelos en la parte inferior
4. Haz clic en cualquier miniatura para cargar el modelo
5. Usa el mouse para rotar, hacer zoom y mover el modelo 3D

### Ver Modelos en AR

1. Asegúrate de estar usando un dispositivo móvil o navegador compatible con AR
2. Haz clic en el botón "Velo en AR" en la esquina inferior derecha
3. Sigue las instrucciones en pantalla para activar la cámara AR

### Construir para Producción

1. Genera la versión optimizada del proyecto:
   ```bash
   npm run build
   ```
2. Los archivos se generarán en la carpeta `dist/`
3. Sube el contenido de `dist/` a tu servidor web

## 📁 Agregar Modelos 3D

### Paso 1: Preparar los Archivos

1. Crea una carpeta dentro de `public/models/` con el nombre de tu modelo

   - Ejemplo: `public/models/mi-producto/`

2. Coloca los archivos necesarios:
   - **Archivo 3D**: `.glb` o `.gltf` (requerido)
   - **Archivo iOS AR**: `.usdz` (opcional, solo para iPhone/iPad)
   - **Miniatura**: Imagen `.webp`, `.jpg` o `.png` (recomendado `.webp`)

### Paso 2: Estructura de Carpetas

Puedes organizar los modelos de dos formas:

**Opción A: En una subcarpeta (recomendado)**

```
public/
  models/
    mi-producto/
      mi-producto.glb          # Modelo 3D principal
      mi-producto.usdz         # Modelo para iOS (opcional)
      poster.webp              # Miniatura del modelo
      textures/                # Texturas (opcional)
        textura1.jpg
        textura2.jpg
```

**Opción B: Directamente en models/**

```
public/
  models/
    mi-producto.glb
    poster-mi-producto.webp
```

**Nota**: Si usas texturas, colócalas en una subcarpeta `textures/` dentro de la carpeta del modelo. Las texturas se referencian en el archivo del modelo (`.glb`), no en el config.

### Paso 3: Actualizar la Configuración

Edita el archivo `src/config.js` y agrega un nuevo objeto al array `models`:

**Ejemplo con subcarpeta:**

```javascript
export const models = [
  // ... modelos existentes ...
  {
    name: "mi-producto",
    path: "/models/mi-producto/mi-producto.glb",
    poster: "/models/mi-producto/poster.webp",
    url: "https://ejemplo.com/producto",
    usdz: "/models/mi-producto/mi-producto.usdz", // Opcional
  },
];
```

**Ejemplo sin subcarpeta:**

```javascript
export const models = [
  // ... modelos existentes ...
  {
    name: "boombox",
    path: "/models/BoomBox.glb",
    poster: "/models/posterBocina.webp",
    url: "https://ejemplo.com/boombox",
  },
];
```

### Propiedades del Modelo

- **`name`**: Nombre identificador del modelo (sin espacios, usar guiones)
- **`path`**: Ruta al archivo `.glb` o `.gltf` (debe empezar con `/models/`)
  - Ejemplo con subcarpeta: `/models/mi-producto/mi-producto.glb`
  - Ejemplo sin subcarpeta: `/models/mi-producto.glb`
- **`poster`**: Ruta a la imagen miniatura (debe empezar con `/models/`)
  - Misma estructura que `path`
- **`url`**: URL del producto o página relacionada
- **`usdz`**: (Opcional) Ruta al archivo `.usdz` para iOS AR
  - Solo necesario si quieres soporte AR en dispositivos iOS

### Paso 4: Verificar

1. Guarda el archivo `src/config.js`
2. El servidor de desarrollo se recargará automáticamente
3. Verifica que el nuevo modelo aparezca en el carrusel

## 🗑️ Eliminar Modelos

### Opción 1: Ocultar Temporalmente

Edita `src/config.js` y comenta o elimina el objeto del modelo del array:

```javascript
export const models = [
  // {
  //   name: "modelo-a-eliminar",
  //   path: "/models/modelo-a-eliminar/modelo.glb",
  //   poster: "/models/modelo-a-eliminar/poster.webp",
  //   url: "https://ejemplo.com",
  // },
  // ... otros modelos ...
];
```

### Opción 2: Eliminar Completamente

1. Elimina el objeto del modelo en `src/config.js`
2. Elimina la carpeta del modelo en `public/models/`
   - Ejemplo: elimina `public/models/modelo-a-eliminar/`

## ⚙️ Modificar Configuración

### Archivo de Configuración

El archivo principal es `src/config.js`. Este archivo exporta un array de objetos que definen los modelos disponibles.

### Estructura del Config

```javascript
export const models = [
  {
    name: "nombre-del-modelo",
    path: "/models/carpeta/modelo.glb",
    poster: "/models/carpeta/poster.webp",
    url: "https://url-del-producto.com",
    usdz: "/models/carpeta/modelo.usdz", // Opcional
  },
  // Más modelos...
];
```

### Orden de los Modelos

El primer modelo en el array será el que se muestre por defecto al cargar la página. Puedes reorganizar el array para cambiar el orden de aparición en el carrusel.

### Actualizar URLs de Productos

Para cambiar la URL de un producto existente, simplemente modifica la propiedad `url` en el objeto del modelo:

```javascript
{
  name: "tennis",
  path: "/models/tennis/tennis.glb",
  poster: "/models/tennis/poster.webp",
  url: "https://nueva-url.com/producto", // ← Cambia aquí
}
```

## 📝 Comandos Disponibles

### Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo. El proyecto se recargará automáticamente al hacer cambios.

### Construcción

```bash
npm run build
```

Genera la versión optimizada del proyecto en la carpeta `dist/`.

### Vista Previa

```bash
npm run preview
```

Previsualiza la versión construida antes de subirla a producción.

## 🎓 Tutorial para Principiantes

### ¿Qué es npm?

**npm** (Node Package Manager) es el gestor de paquetes de Node.js. Se usa para instalar y gestionar las librerías que tu proyecto necesita.

### ¿Qué es Vite?

**Vite** es una herramienta de construcción que hace que el desarrollo web sea más rápido. Transforma tu código y sirve los archivos en el navegador.

### Instalación de Node.js y npm

1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión LTS (recomendada)
3. Instala el paquete siguiendo las instrucciones
4. Verifica la instalación abriendo una terminal y escribiendo:
   ```bash
   node --version
   npm --version
   ```

### Primera Vez Usando el Proyecto

#### Paso 1: Abrir la Terminal

- **Windows**: Presiona `Win + R`, escribe `cmd` y presiona Enter
- **Mac**: Presiona `Cmd + Espacio`, escribe "Terminal" y presiona Enter
- **Linux**: Presiona `Ctrl + Alt + T`

#### Paso 2: Navegar a la Carpeta del Proyecto

```bash
cd ruta/a/tu/proyecto/ar-viewer-demo
```

**Tip**: Puedes arrastrar la carpeta del proyecto a la terminal para obtener la ruta automáticamente.

#### Paso 3: Instalar Dependencias

```bash
npm install
```

Este comando lee el archivo `package.json` y descarga todas las librerías necesarias (como Vite) en la carpeta `node_modules/`.

**Tiempo estimado**: 1-2 minutos

#### Paso 4: Iniciar el Servidor

```bash
npm run dev
```

Verás un mensaje como:

```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

#### Paso 5: Abrir en el Navegador

1. Copia la URL que aparece (ej: `http://localhost:5173/`)
2. Pégalo en tu navegador
3. ¡Deberías ver el proyecto funcionando!

### Conceptos Importantes

#### node_modules/

Esta carpeta contiene todas las librerías instaladas. **No la modifiques manualmente**. Se regenera automáticamente con `npm install`.

#### package.json

Archivo que define:

- Nombre del proyecto
- Versión
- Scripts disponibles (`dev`, `build`, `preview`)
- Dependencias necesarias

#### package-lock.json

Archivo que asegura que todos usen las mismas versiones de las librerías. **No lo modifiques manualmente**.

### Comandos Básicos de npm

```bash
# Instalar dependencias
npm install

# Ejecutar un script definido en package.json
npm run nombre-del-script

# Ver información del proyecto
npm list
```

### Flujo de Trabajo con Vite

1. **Desarrollo**:

   - Ejecuta `npm run dev`
   - Haz cambios en tus archivos
   - El navegador se actualiza automáticamente

2. **Producción**:
   - Ejecuta `npm run build`
   - Vite optimiza y compila todo
   - Los archivos listos están en `dist/`

### Solución de Problemas Comunes

#### Error: "npm no se reconoce como comando"

- **Solución**: Node.js no está instalado o no está en el PATH. Reinstala Node.js.

#### Error: "Cannot find module"

- **Solución**: Ejecuta `npm install` para instalar las dependencias.

#### El servidor no inicia

- **Solución**: Verifica que el puerto 5173 no esté en uso. Vite intentará usar otro puerto automáticamente.

#### Los cambios no se reflejan

- **Solución**: Guarda el archivo (Ctrl+S / Cmd+S) y verifica que el servidor esté corriendo.

### Próximos Pasos

1. Familiarízate con la estructura de carpetas
2. Prueba agregar un modelo siguiendo la sección [Agregar Modelos 3D](#agregar-modelos-3d)
3. Experimenta modificando `src/config.js`
4. Revisa la documentación de [model-viewer](https://modelviewer.dev/) para opciones avanzadas

## 📚 Recursos Adicionales

- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de model-viewer](https://modelviewer.dev/)
- [Guía de npm](https://docs.npmjs.com/)

## 🆘 Soporte

Si tienes problemas:

1. Verifica que Node.js esté instalado correctamente
2. Asegúrate de haber ejecutado `npm install`
3. Revisa los mensajes de error en la terminal
4. Verifica que los archivos estén en las rutas correctas

---

**Nota**: Los archivos en `public/` se sirven directamente. Los archivos en `src/` son procesados por Vite antes de ser servidos.
