# Plan de Desarrollo de la Página Web de la Agencia de Viajes

Este documento describe las funcionalidades clave a implementar, organizadas en fases para facilitar el desarrollo.

## Fase 1: Producto Mínimo Viable (MVP)

El objetivo es tener una base funcional y robusta para iteraciones futuras.

- **Autenticación de Usuario:**

  - **Registro de Usuario:** Formulario de `signup` con email, contraseña y nombre. La contraseña debe estar encriptada (usando bcrypt).
  - **Inicio de Sesión:** Formulario de `login` que autentica al usuario. Genera un **JWT (JSON Web Token)** para la sesión.
  - **Rutas Protegidas:** Configura las rutas del backend para que solo los usuarios autenticados puedan acceder a ciertas funcionalidades.

- **Visualización de Vuelos:**
  - **Vuelos en Oferta:** `Endpoint` en el backend para listar los vuelos en oferta.
  - **Filtros Básicos:** Implementa filtros en el frontend para buscar vuelos por **destino** y **fechas**.
  - **Detalle del Vuelo:** Una página individual para mostrar información detallada de cada vuelo (aerolínea, horarios, escalas, etc.).

---

## Fase 2: Expansión de Funcionalidades

Una vez que el MVP esté operativo, se pueden agregar más características que mejoren la experiencia del usuario.

- **Perfil de Usuario:**

  - **Historial de Búsquedas:** Guarda y muestra las búsquedas de vuelos realizadas por el usuario.
  - **Listas de Deseos:** Permite al usuario "guardar" vuelos que le interesan en una lista personal.

- **Mejoras en la Búsqueda:**

  - **Filtros Avanzados:** Añade filtros por **precio**, **aerolínea** y **número de escalas**.
  - **Recomendaciones:** Muestra una sección de "Destinos Populares" o "Último Minuto" en la página principal.

- **Sección de Contenido:**
  - **Blog de Viajes:** Crea las rutas y componentes para mostrar artículos de un blog. El backend debe poder gestionar el CRUD (Crear, Leer, Actualizar, Borrar) de estos artículos.
  - **Galería de Imágenes:** Una sección para mostrar fotos y videos de destinos, organizada por categorías.

---

## Fase 3: Integración y Características Adicionales

En esta fase, el enfoque es añadir valor a través de integraciones y funciones más complejas.

- **Autenticación Externa:**

  - Implementa el `login` con **Google OAuth** para ofrecer una opción de inicio de sesión más rápida.

- **Alertas y Notificaciones:**

  - **Alertas de Precio:** Los usuarios pueden configurar alertas por email para recibir notificaciones cuando el precio de un vuelo baje. Esto requerirá la integración de un servicio de envío de correos (como SendGrid o Nodemailer).

- **Interacción Social:**
  - **Reseñas de Usuarios:** Permite que los usuarios dejen comentarios y reseñas en los artículos del blog o sobre los destinos. Esto crea una sensación de comunidad y confianza.

---

## Herramientas y Tecnologías

- **Frontend:** React, React Router, MUI (Material UI) o Chakra UI.
- **Backend:** Node.js, Express, PostgreSQL, Sequelize.
- **Autenticación:** JWT, bcrypt.
- **Servicios Externos:** Google OAuth, Nodemailer (o similar).
