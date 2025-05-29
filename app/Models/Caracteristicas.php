<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Caracteristicas extends Model
{
    protected $guarded = [];

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    public function getImageAttribute($value)
    {
        return asset("storage/" . $value);
    }
}
