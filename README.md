# App Diagrama de Pasos

Aplicación web para crear, visualizar y editar diagramas de pasos (diagramas de flujo de instrucciones o procesos) de forma visual e interactiva. Permite agregar, conectar y editar diferentes tipos de pasos (simples, condicionales, ir a) para modelar procesos o flujos lógicos.

## Características principales
- Edición visual de diagramas de pasos.
- Soporte para pasos simples, condicionales (brunch) y de salto (goto).
- Interfaz intuitiva basada en Vue 3 y Quasar Framework.
- Uso de Vue Flow para la manipulación gráfica de nodos y conexiones.

## Requisitos previos
- Node.js >= 18 (recomendado 18, 20, 22, 24, 26 o 28)
- Yarn >= 1.21.1 **o** npm >= 6.13.4

## Instalación
1. Clona el repositorio o descarga el código fuente.
2. Instala las dependencias:

```bash
yarn
# o
npm install
```

## Uso en desarrollo
Para iniciar la aplicación en modo desarrollo (con recarga en caliente):

```bash
yarn dev
# o
npm run dev
# o
quasar dev
```

La aplicación se abrirá automáticamente en tu navegador.

## Comandos útiles
- **Lint:**
  ```bash
  yarn lint
  # o
  npm run lint
  ```
- **Formatear código:**
  ```bash
  yarn format
  # o
  npm run format
  ```
- **Build para producción:**
  ```bash
  yarn build
  # o
  npm run build
  # o
  quasar build
  ```

## Estructura principal del proyecto
- `src/modules/diagrama/` — Componentes y lógica del editor de diagramas.
- `src/pages/IndexPage.vue` — Página principal que muestra el editor.
- `src/css/FlowCanvas.scss` — Estilos personalizados para el canvas de diagramas.

## Créditos y tecnologías
- [Vue 3](https://vuejs.org/)
- [Quasar Framework](https://quasar.dev/)
- [Vue Flow](https://vue-flow.dev/)
- [@dagrejs/dagre](https://github.com/dagrejs/dagre) (auto-layout de nodos)

---

> Proyecto desarrollado por Fabricio Bencomo. Para dudas o sugerencias, contacta a fabricio@leadboxhq.com
