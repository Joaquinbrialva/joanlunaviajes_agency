# 📚 Documentación de la API - Joan Luna Viajes Agency

## 🎯 Resumen General

Esta API maneja tres entidades principales:
- **Users** (Usuarios)
- **Trips** (Viajes) 
- **Requests** (Solicitudes de viaje)

Cada entidad tiene operaciones CRUD completas con autorización basada en roles.

---

## 🔐 Sistema de Autenticación y Autorización

### Roles Disponibles:
- **`admin`**: Acceso completo a todos los recursos
- **`agent`**: Puede modificar cualquier recurso (como admin)
- **`user`**: Solo puede modificar sus propios recursos

### Headers Requeridos:
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## 👥 USERS API

### 1. Registro de Usuario
```http
POST /users/register
```

**Body:**
```json
{
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan@email.com",
  "password": "password123",
  "phone": "+1234567890",
  "country": "España",
  "city": "Madrid",
  "role": "user"
}
```

**Respuesta:**
```json
{
  "message": "Usuario creado exitosamente.",
  "data": {
    "id": 1,
    "name": "Juan",
    "lastName": "Pérez",
    "email": "juan@email.com",
    "phone": "+1234567890",
    "country": "España",
    "city": "Madrid",
    "role": "user"
  }
}
```

### 2. Login
```http
POST /users/login
```

**Body:**
```json
{
  "email": "juan@email.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "message": "Sesión iniciada",
  "data": {
    "user": {
      "id": 1,
      "name": "Juan",
      "lastName": "Pérez",
      "email": "juan@email.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Obtener Todos los Usuarios
```http
GET /users?page=1&limit=10
```

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10)

**Respuesta:**
```json
{
  "message": "Datos obtenidos exitosamente.",
  "data": [
    {
      "id": 1,
      "name": "Juan",
      "lastName": "Pérez",
      "email": "juan@email.com",
      "role": "user"
    }
  ],
  "total": 25,
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

### 4. Obtener Usuario por ID
```http
GET /users/:id
```

**Respuesta:**
```json
{
  "message": "Datos obtenidos exitosamente.",
  "data": {
    "id": 1,
    "name": "Juan",
    "lastName": "Pérez",
    "email": "juan@email.com",
    "role": "user"
  }
}
```

### 5. Actualizar Usuario
```http
PUT /users/:id
```

**Autorización:** Solo el propio usuario, admin o agent

**Body:**
```json
{
  "name": "Juan Carlos",
  "phone": "+1234567891"
}
```

**Respuesta:**
```json
{
  "message": "Recurso actualizado exitosamente.",
  "data": {
    "id": 1,
    "name": "Juan Carlos",
    "lastName": "Pérez",
    "email": "juan@email.com",
    "phone": "+1234567891",
    "role": "user"
  }
}
```

### 6. Eliminar Usuario
```http
DELETE /users/:id
```

**Autorización:** Solo el propio usuario, admin o agent

**Respuesta:**
```json
{
  "message": "Recurso eliminado exitosamente.",
  "data": { "id": 1 }
}
```

---

## ✈️ TRIPS API

### 1. Crear Viaje
```http
POST /trips
```

**Body:**
```json
{
  "title": "Viaje a Barcelona",
  "origin": "Madrid",
  "destination": "Barcelona",
  "departureDate": "2024-02-15",
  "returnDate": "2024-02-20",
  "photos": ["url1.jpg", "url2.jpg"],
  "notes": "Viaje de negocios",
  "userId": 1
}
```

**Respuesta:**
```json
{
  "message": "Recurso creado exitosamente.",
  "data": {
    "id": 1,
    "title": "Viaje a Barcelona",
    "origin": "Madrid",
    "destination": "Barcelona",
    "departureDate": "2024-02-15",
    "returnDate": "2024-02-20",
    "photos": ["url1.jpg", "url2.jpg"],
    "notes": "Viaje de negocios",
    "userId": 1
  }
}
```

### 2. Obtener Todos los Viajes
```http
GET /trips?page=1&limit=10&includeUser=true&origin=Madrid&destination=Barcelona
```

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10)
- `includeUser` (opcional): Incluir datos del usuario (default: true)
- `origin` (opcional): Filtrar por origen
- `destination` (opcional): Filtrar por destino

**Respuesta:**
```json
{
  "message": "Datos obtenidos exitosamente.",
  "data": [
    {
      "id": 1,
      "title": "Viaje a Barcelona",
      "origin": "Madrid",
      "destination": "Barcelona",
      "departureDate": "2024-02-15",
      "returnDate": "2024-02-20",
      "user": {
        "id": 1,
        "name": "Juan",
        "lastName": "Pérez",
        "email": "juan@email.com"
      }
    }
  ],
  "total": 15,
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}
```

### 3. Obtener Viaje por ID
```http
GET /trips/:id?includeUser=true
```

**Query Parameters:**
- `includeUser` (opcional): Incluir datos del usuario (default: true)

**Respuesta:**
```json
{
  "message": "Datos obtenidos exitosamente.",
  "data": {
    "id": 1,
    "title": "Viaje a Barcelona",
    "origin": "Madrid",
    "destination": "Barcelona",
    "departureDate": "2024-02-15",
    "returnDate": "2024-02-20",
    "user": {
      "id": 1,
      "name": "Juan",
      "lastName": "Pérez",
      "email": "juan@email.com"
    }
  }
}
```

### 4. Actualizar Viaje
```http
PUT /trips/:id
```

**Autorización:** Solo el creador del viaje, admin o agent

**Body:**
```json
{
  "title": "Viaje a Barcelona - Actualizado",
  "notes": "Viaje de negocios actualizado"
}
```

**Respuesta:**
```json
{
  "message": "Recurso actualizado exitosamente.",
  "data": {
    "id": 1,
    "title": "Viaje a Barcelona - Actualizado",
    "origin": "Madrid",
    "destination": "Barcelona",
    "departureDate": "2024-02-15",
    "returnDate": "2024-02-20",
    "notes": "Viaje de negocios actualizado"
  }
}
```

### 5. Eliminar Viaje
```http
DELETE /trips/:id
```

**Autorización:** Solo el creador del viaje, admin o agent

**Respuesta:**
```json
{
  "message": "Recurso eliminado exitosamente.",
  "data": { "id": 1 }
}
```

---

## 📋 REQUESTS API

### 1. Crear Solicitud
```http
POST /requests
```

**Body:**
```json
{
  "origin": "Madrid",
  "destination": "Barcelona",
  "departureDate": "2024-03-01",
  "returnDate": "2024-03-05",
  "isRoundTrip": true,
  "passengers": 2,
  "notes": "Viaje familiar",
  "userId": 1
}
```

**Respuesta:**
```json
{
  "message": "Recurso creado exitosamente.",
  "data": {
    "id": 1,
    "origin": "Madrid",
    "destination": "Barcelona",
    "departureDate": "2024-03-01",
    "returnDate": "2024-03-05",
    "isRoundTrip": true,
    "passengers": 2,
    "notes": "Viaje familiar",
    "userId": 1
  }
}
```

### 2. Obtener Todas las Solicitudes (Admin/Agent)
```http
GET /requests?page=1&limit=10&includeUser=true&origin=Madrid&destination=Barcelona
```

**Autorización:** Solo admin o agent

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10)
- `includeUser` (opcional): Incluir datos del usuario (default: true)
- `origin` (opcional): Filtrar por origen
- `destination` (opcional): Filtrar por destino

**Respuesta:**
```json
{
  "message": "Datos obtenidos exitosamente.",
  "data": [
    {
      "id": 1,
      "origin": "Madrid",
      "destination": "Barcelona",
      "departureDate": "2024-03-01",
      "returnDate": "2024-03-05",
      "isRoundTrip": true,
      "passengers": 2,
      "notes": "Viaje familiar",
      "userId": 1,
      "user": {
        "id": 1,
        "name": "Juan",
        "lastName": "Pérez",
        "email": "juan@email.com"
      }
    }
  ],
  "total": 8,
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 3. Obtener Mis Solicitudes
```http
GET /requests/my?page=1&limit=10&includeUser=true&origin=Madrid&destination=Barcelona
```

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10)
- `includeUser` (opcional): Incluir datos del usuario (default: true)
- `origin` (opcional): Filtrar por origen
- `destination` (opcional): Filtrar por destino

**Respuesta:** Igual que el endpoint anterior, pero solo muestra las solicitudes del usuario autenticado.

### 4. Obtener Solicitud por ID
```http
GET /requests/:id
```

**Autorización:** Solo el creador de la solicitud, admin o agent

**Respuesta:**
```json
{
  "message": "Datos obtenidos exitosamente.",
  "data": {
    "id": 1,
    "origin": "Madrid",
    "destination": "Barcelona",
    "departureDate": "2024-03-01",
    "returnDate": "2024-03-05",
    "isRoundTrip": true,
    "passengers": 2,
    "notes": "Viaje familiar",
    "userId": 1,
    "user": {
      "id": 1,
      "name": "Juan",
      "lastName": "Pérez",
      "email": "juan@email.com"
    }
  }
}
```

### 5. Actualizar Solicitud
```http
PUT /requests/:id
```

**Autorización:** Solo el creador de la solicitud, admin o agent

**Body:**
```json
{
  "passengers": 3,
  "notes": "Viaje familiar actualizado"
}
```

**Respuesta:**
```json
{
  "message": "Recurso actualizado exitosamente.",
  "data": {
    "id": 1,
    "origin": "Madrid",
    "destination": "Barcelona",
    "departureDate": "2024-03-01",
    "returnDate": "2024-03-05",
    "isRoundTrip": true,
    "passengers": 3,
    "notes": "Viaje familiar actualizado",
    "userId": 1
  }
}
```

### 6. Eliminar Solicitud
```http
DELETE /requests/:id
```

**Autorización:** Solo el creador de la solicitud, admin o agent

**Respuesta:**
```json
{
  "message": "Recurso eliminado exitosamente.",
  "data": { "id": 1 }
}
```

---

## 🚨 Códigos de Error Comunes

### 400 - Bad Request
```json
{
  "error": "Los datos proporcionados no son válidos.",
  "statusCode": 400
}
```

### 401 - Unauthorized
```json
{
  "error": "No autorizado.",
  "statusCode": 401
}
```

### 403 - Forbidden
```json
{
  "error": "Acceso prohibido. No tienes permisos para realizar esta acción.",
  "statusCode": 403
}
```

### 404 - Not Found
```json
{
  "error": "Recurso no encontrado.",
  "statusCode": 404
}
```

### 500 - Internal Server Error
```json
{
  "error": "Error interno del servidor. Por favor, inténtalo de nuevo más tarde.",
  "statusCode": 500
}
```

---

## 🔧 Características Técnicas

### Paginación
Todos los endpoints de listado soportan paginación:
- `page`: Número de página (empezando en 1)
- `limit`: Elementos por página (máximo recomendado: 50)

### Filtros
Los endpoints de listado soportan filtros específicos:
- **Trips**: `origin`, `destination`
- **Requests**: `origin`, `destination`

### Optimización de Consultas
- `includeUser=false`: Excluye datos del usuario para consultas más rápidas
- Solo incluye campos necesarios en las respuestas

### Autorización
- **Admin/Agent**: Acceso completo a todos los recursos
- **User**: Solo puede modificar sus propios recursos
- Verificación automática en todos los endpoints protegidos

---

## 📝 Ejemplos de Uso Completos

### Flujo Completo de Usuario:
1. **Registro**: `POST /users/register`
2. **Login**: `POST /users/login`
3. **Crear solicitud**: `POST /requests`
4. **Ver mis solicitudes**: `GET /requests/my`
5. **Actualizar solicitud**: `PUT /requests/:id`

### Flujo Completo de Admin:
1. **Login**: `POST /users/login`
2. **Ver todas las solicitudes**: `GET /requests`
3. **Ver todos los usuarios**: `GET /users`
4. **Ver todos los viajes**: `GET /trips`
5. **Modificar cualquier recurso**: `PUT/DELETE` en cualquier endpoint

---

## 🎯 Notas Importantes

- Todos los endpoints requieren autenticación excepto `POST /users/register` y `POST /users/login`
- Los tokens JWT expiran en 15 minutos
- Las contraseñas se almacenan hasheadas con bcrypt
- Los campos `password` nunca se devuelven en las respuestas
- La paginación es obligatoria para evitar sobrecarga del servidor
- Los filtros son opcionales y se pueden combinar

---

*Documentación generada para Joan Luna Viajes Agency API v1.0*
