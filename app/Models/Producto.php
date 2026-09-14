<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Producto extends Model
{
    //

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'fecha_vencimiento',
        'categoria_id',
    ];
    // un producto pertenece a una categoria

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }
}
