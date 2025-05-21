<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $guarded = [];

    public function sub_categoria()
    {
        return $this->belongsTo(SubCategoria::class);
    }

    public function imagenes()
    {
        return $this->hasMany(ImagenesProducto::class);
    }
}
