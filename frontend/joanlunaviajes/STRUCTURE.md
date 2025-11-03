# Estructura del Proyecto Joanlunaviajes

## 📁 Organización por Features

El proyecto está organizado por funcionalidades para facilitar el mantenimiento y la escalabilidad.

### 🧩 Components
```
src/components/
├── cards/                    # Componentes de tarjetas
│   ├── OfferCard.jsx        # Tarjeta de ofertas
│   ├── DestinationCard.jsx  # Tarjeta de destinos
│   └── index.js             # Exportaciones de cards
├── navigation/              # Componentes de navegación
│   ├── Navbar.jsx           # Barra de navegación
│   └── index.js             # Exportaciones de navegación
├── layout/                  # Componentes de layout
│   ├── HeroSection.jsx      # Sección hero
│   └── index.js             # Exportaciones de layout
├── ui/                      # Componentes de interfaz
│   ├── SectionTitle.jsx     # Título de sección
│   ├── ViewAllArrow.jsx     # Flecha "Ver todo"
│   └── index.js             # Exportaciones de UI
└── index.js                 # Exportaciones principales
```

### 🎨 Styles
```
src/styles/
├── cards/                   # Estilos de tarjetas
│   ├── OfferCard.css       # Estilos de ofertas
│   ├── DestinationCard.css # Estilos de destinos
│   └── index.js            # Exportaciones de estilos
├── navigation/             # Estilos de navegación
│   ├── Navbar.css          # Estilos de navbar
│   └── index.js            # Exportaciones de estilos
├── layout/                 # Estilos de layout
│   ├── HeroSection.css     # Estilos de hero
│   ├── Homepage.css        # Estilos de homepage
│   └── index.js            # Exportaciones de estilos
└── ui/                     # Estilos de UI (futuro)
    └── index.js            # Exportaciones de estilos
```

## 🚀 Ventajas de esta Estructura

1. **Organización Clara**: Cada feature tiene su propia carpeta
2. **Fácil Mantenimiento**: Los archivos relacionados están juntos
3. **Escalabilidad**: Fácil agregar nuevas features
4. **Imports Limpios**: Uso de archivos index.js para exportaciones
5. **Separación de Responsabilidades**: CSS y JS organizados por funcionalidad

## 📦 Imports

### Importación Simple
```jsx
import { OfferCard, DestinationCard } from '../components';
```

### Importación Específica
```jsx
import OfferCard from '../components/cards/OfferCard';
```

## 🔄 Próximos Pasos

- [ ] Agregar más componentes UI (botones, inputs, etc.)
- [ ] Crear sistema de temas
- [ ] Implementar Storybook para documentación de componentes
- [ ] Agregar tests unitarios por feature
