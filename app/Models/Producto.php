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
        return $this->hasMany(ImagenesProducto::class)->orderBy('order', 'asc');
    }

    public function caracteristicas()
    {
        return $this->hasMany(Caracteristicas::class)->orderBy('order', 'asc');
    }

    public function medidas()
    {
        return $this->belongsTo(Medida::class);
    }
}
