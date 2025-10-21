# Simulador de Ecommerce

**Por Ignacio Irusquieta**  
Proyecto Final - JavaScript CoderHouse

## ¿Qué es esto?

Es una tienda online simple donde puedes ver productos, agregarlos al carrito y simular una compra. Todo funciona con JavaScript puro y guarda tu carrito aunque cierres el navegador.

## ¿Cómo funciona?

1. Abrí el archivo `index.html` en tu navegador
2. Vas a ver 3 productos de audio
3. Hacé click en "Agregar al Carrito" en los que te gusten
4. Bajá a la sección del carrito para ver lo que elegiste
5. Podés eliminar productos o vaciar todo el carrito
6. Cuando estés listo, dale a "Finalizar Compra"

## Lo que podés hacer

- Ver los productos con sus precios
- Agregar productos al carrito
- Eliminar productos que no querés
- Vaciar todo el carrito de una
- Ver el total de tu compra
- Finalizar la compra (simula el proceso)
- Tu carrito se guarda automáticamente, así que si cerrás el navegador y volvés, sigue ahí

## Tecnologías que usé

- HTML, CSS y JavaScript
- Los productos se cargan desde un archivo JSON
- SweetAlert2 para las alertas lindas
- LocalStorage para guardar el carrito

## Estructura del proyecto

```
📁 jsfinalirusquieta/
├── index.html          → La página principal
├── README.md           → Este archivo
├── 📁 css/
│   └── styles.css      → Los estilos
├── 📁 js/
│   ├── script.js       → La lógica del carrito
│   └── data.js         → Carga los productos
├── 📁 data/
│   └── products.json   → Los productos de la tienda
└── 📁 assets/
    └── (imágenes)      → Fotos de los productos
```

## Nota importante

Este es un proyecto académico para CoderHouse. Cumple con todos los requisitos pedidos: usa DOM, eventos, fetch, localStorage, manejo de errores, y una librería externa (SweetAlert2).
