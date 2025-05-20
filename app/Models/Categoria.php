<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $guarded = [];

    public function getImageAttribute($value)
    {
        return asset("storage/" . $value);
    }

    public function subcategorias()
    {
        return $this->hasMany(SubCategoria::class);
    }
}
