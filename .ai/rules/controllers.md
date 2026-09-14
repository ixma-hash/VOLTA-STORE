---
paths:
  - app/Http/Controllers/ProductoController.php
---

# Controllers

## ProductoController::index must render Producto/Index
index() must eager-load 'categoria' and render the 'Producto/Index' Inertia page with a `productos` prop. A prior bug rendered 'Categoria/Index' instead. Producto model $fillable must include descripcion, stock, fecha_vencimiento so create() persists them.
