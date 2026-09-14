<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasFactory;

class Categoria extends Model
{
    //
    protected $fillable = ['nombre' ,'descripcion'];
    //una categoria tiene muchos productos
    public function productos()
    {
        return $this->hasMany(Producto::class);
    }
}
