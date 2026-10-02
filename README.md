# TeenGames - Tienda de Videojuegos 🎮

Este proyecto es una aplicación web interactiva (SPA) desarrollada para la asignatura **Desarrollo Frontend I (PFY2201)**, correspondiente a la **Semana 8: Mejorando funcionalidades clave en el eCommerce con React**.

El sitio evoluciona la tienda de videojuegos *TeenGames* optimizando la arquitectura modular basada en **React y Vite**. Se implementan componentes funcionales reutilizables, gestión avanzada de estados locales y globales con Hooks (`useState`, `useEffect`), y renderizado condicional para mejorar la experiencia de usuario (UX).


## 🚀 Características Principales

- **Arquitectura Modular y Principio DRY:** Interfaz dividida en bloques funcionales independientes (`Header`, `Carousel`, `Main`, `ProductList`, `ProductCard`, `Carrito`, `CartTotal`, `Toast`, `Footer`) y extracción de lógica compartida (formateo de moneda y validaciones) hacia módulos utilitarios, facilitando el mantenimiento y escalabilidad.

- **Gestión Centralizada de Estados (`useState`):** Manejo global del estado del carrito y las notificaciones (`Toast`) desde el componente raíz (`App`), compartiendo datos y funciones a través de *props* hacia los componentes hijos para mantener la sincronía de la interfaz.

- **Catálogo Dinámico y Validación de Esquema (Fetch API + `useEffect`):** 
  - Carga asíncrona de productos desde `public/data/productos.json`.
  - Validación estricta de estructura, propiedades requeridas y tipos de datos antes del renderizado.
  - Manejo de errores con opción de **reintento de carga** sin necesidad de recargar la página completa.

- **Carrito de Compras Interactivo y Persistente:**
  - Agrupación inteligente de productos repetidos mediante un campo `cantidad` e identificadores únicos (`id`).
  - Controles para incrementar (`+`), disminuir (`-`) o eliminar productos individuales del carrito.
  - Contador global de unidades en la barra de navegación y cálculo automático de subtotales y total general mediante `.reduce()` en pesos chilenos (CLP).
  - Sincronización automática con **`localStorage`** mediante `useEffect`.

- **Renderizado Condicional Avanzado:**
  - **Interactividad en Tarjetas:** El botón de cada producto evalúa el estado del carrito en tiempo real; si el juego ya fue agregado, cambia su estilo CSS y texto dinámicamente a `"Agregar otro (X en carrito)"`.
  - Visualización dinámica según el estado de la aplicación: *Spinner* de carga, alerta de error con botón de reintento, mensaje de búsqueda sin coincidencias, estado de carrito vacío vs. con productos, notificaciones globales flotantes (`Toast` de Bootstrap) y alerta de envío exitoso en el formulario.

- **Buscador con Debounce y Navegación Fluida:**
  - Filtrado por nombre o descripción aplicando **Debounce (300ms)** para evitar renderizados innecesarios mientras la persona usuaria escribe rápidamente.
  - Desplazamiento automático (`scrollIntoView`) hacia el catálogo al buscar y restauración completa al volver a *Inicio*.
  
- **Formulario de Contacto Controlado:**
  - Gestión de inputs en tiempo real mediante `onChange` y `onSubmit`, validando longitudes y formato de correo electrónico (RegEx) con retroalimentación visual inmediata.


## 🛠️ Tecnologías Utilizadas

* **React 19:** Biblioteca principal para la construcción de la interfaz mediante componentes funcionales, JSX y Virtual DOM.

* **Vite:** Empaquetador y servidor de desarrollo ultrarrápido con Hot Module Replacement (HMR).

* **Bootstrap 5 (v5.3.8):** Framework CSS/JS integrado vía npm para diseño responsivo (Grid System, Navbar, Carousel, Cards y Modal).

* **CSS3:** Variables personalizadas (`:root`), transiciones suaves y paleta de colores personalizada (*Serenity* y *Rose Quartz*).

* **JavaScript (ES6+):** Hooks (`useState`, `useEffect`), Fetch API, `localStorage`, métodos de arrays (`map`, `filter`, `reduce`, `find`) y programación modular.


## 📂 Estructura del Proyecto
```
proyecto-videojuegos/
├── public/
│   ├── assets/
│   │   └── img/             # Imágenes optimizadas en formato .webp
│   └── data/
│       └── productos.json   # Simulación de API / Base de datos
├── src/
│   ├── components/
│   │   ├── Carousel.jsx     # Carrusel de promociones destacadas
│   │   ├── Carrito.jsx      # Modal del carrito de compras y controles de cantidad
│   │   ├── CartTotal.jsx    # Cálculo y visualización del monto total
│   │   ├── Footer.jsx       # Pie de página y formulario de contacto controlado
│   │   ├── Header.jsx       # Barra de navegación, buscador con debounce y contador
│   │   ├── Main.jsx         # Contenedor principal de la tienda
│   │   ├── ProductCard.jsx  # Tarjeta individual con renderizado condicional
│   │   ├── ProductList.jsx  # Fetch API y renderizado de la grilla
│   │   └── Toast.jsx        # Componente global de notificaciones
│   ├── utils/
│   │   ├── formatters.js    # Utilidad compartida para formateo a pesos chilenos
│   │   └── validators.js    # Lógica centralizada de validación (JSON y formulario)
│   ├── App.jsx              # Componente raíz y gestión del estado global del carrito
│   ├── index.css            # Estilos globales y variables personalizadas
│   └── main.jsx             # Punto de entrada de React e importación de Bootstrap
├── index.html               # Plantilla base HTML5
├── package.json             # Dependencias y scripts de configuración
├── vite.config.js           # Configuración de Vite
└── README.md                # Documentación del proyecto
```


## ⚙️ Instrucciones de Ejecución Local

Para clonar y ejecutar este proyecto en tu entorno de desarrollo local:

1. Clonar el repositorio.
```bash
git clone [https://github.com/jennifergonzalezt/proyecto-videojuegos-3.git](https://github.com/jennifergonzalezt/proyecto-videojuegos-3.git)
```

2. Entrar a la carpeta del proyecto:
```bash
cd proyecto-videojuegos
```

3. Instalar las dependencias necesarias:
```bash
npm install
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

5. Abrir en el navegador el enlace indicado en la terminal (por defecto http://localhost:5173).


## 🔗 Enlaces del Proyecto

* **Repositorio en GitHub:** https://github.com/jennifergonzalezt/proyecto-videojuegos-3.git

* **Sitio Web Publicado (GitHub Pages):** https://jennifergonzalezt.github.io/proyecto-videojuegos-3/
