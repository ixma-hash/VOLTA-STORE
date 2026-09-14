<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorias = Categoria::all();
        return Inertia::render('Categoria/Index', [
            'categorias' => $categorias
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
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
        ]);

        Categoria::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
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

{
    $categoria = Categoria::findOrFail($id);

    $categoria->nombre = $request->nombre;
    $categoria->descripcion = $request->descripcion;

    $categoria->save();

    return redirect()->back();
}
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
{
    $categoria = Categoria::findOrFail($id);
    $categoria->delete();

    return redirect()->back();
}
    }

    public function generarPdf()
    {
        // Traer productos cargando su relación 'categoria' (Eager Loading)
        $categoria = Categoria::with('categoria')->get();
        // Cálculo de métricas
        $totalProductos = $categoria->count();
        $precioPromedio = $categoria->avg('precio');
        // Cargar vista Blade enviando datos
        $pdf = Pdf::loadView('pdf.categoria', compact('categoria', 'totalCategorias', 'precioPromedio'));
        // Descargar PDF
        return $pdf->download('reporte_categorias_' . date('Y-m-d') . '.pdf');
    }
}
