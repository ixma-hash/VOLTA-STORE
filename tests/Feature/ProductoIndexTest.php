<?php

use App\Models\Categoria;
use App\Models\Producto;
use Inertia\Testing\AssertableInertia as Assert;

test('productos index renders the productos page with products', function () {
    $categoria = Categoria::create([
        'nombre' => 'Bebidas',
        'descripcion' => 'Bebidas refrescantes',
    ]);

    $producto = Producto::create([
        'nombre' => 'Gaseosa',
        'descripcion' => 'Bebida gaseosa 1L',
        'precio' => 1500,
        'stock' => 10,
        'fecha_vencimiento' => '2027-01-01',
        'categoria_id' => $categoria->id,
    ]);

    $this->get(route('productos.index'))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('Producto/Index')
                ->has('productos', 1)
                ->where('productos.0.nombre', $producto->nombre)
                ->where('productos.0.categoria_id', $categoria->id)
                ->where('productos.0.categoria.nombre', $categoria->nombre)
                ->has('categorias', 1)
                ->where('categorias.0.nombre', $categoria->nombre)
        );
});

test('productos pdf route generates a downloadable PDF', function () {
    $categoria = Categoria::create([
        'nombre' => 'Bebidas',
    ]);

    Producto::create([
        'nombre' => 'Gaseosa',
        'descripcion' => 'Bebida gaseosa 1L',
        'precio' => 1500,
        'stock' => 10,
        'fecha_vencimiento' => '2027-01-01',
        'categoria_id' => $categoria->id,
    ]);

    $this->get(route('productos.pdf'))
        ->assertOk()
        ->assertHeader('Content-Type', 'application/pdf');
});
