<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos = Producto::with('categoria')->get();

        $categorias = Categoria::all();

        return Inertia::render('Producto/Index', [
            'productos' => $productos,
            'categorias' => $categorias,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        Producto::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'stock' => $request->stock,
            'fecha_vencimiento' => $request->fecha_vencimiento,
            'categoria_id' => $request->categoria_id,
        ]);

        return redirect()->back();

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $producto = Producto::findOrFail($id);

        $producto->nombre = $request->nombre;
        $producto->descripcion = $request->descripcion;
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;
        $producto->fecha_vencimiento = $request->fecha_vencimiento;
        $producto->categoria_id = $request->categoria_id;

        $producto->save();

        return redirect()->back();

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $producto = Producto::findOrFail($id);
        $producto->delete();

        return redirect()->back();

    }

    public function generarPdf()
    {
        // Traer productos cargando su relación 'categoria' (Eager Loading)
        $productos = Producto::with('categoria')->get();
        // Cálculo de métricas
        $totalProductos = $productos->count();
        $precioPromedio = $productos->avg('precio');
        // Cargar vista Blade enviando datos
        $pdf = Pdf::loadView('pdf.productos', compact('productos', 'totalProductos',
            'precioPromedio'));

        // Descargar PDF
        return $pdf->download('reporte_productos_'.date('Y-m-d').'.pdf');
    }
}
