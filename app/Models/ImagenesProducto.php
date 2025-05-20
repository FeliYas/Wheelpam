<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImagenesProducto extends Model
{
    protected $guarded = [];

    public function getImageAttribute($value)
    {
        return asset("storage/" . $value);
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }
}
