<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContenidoInicio extends Model
{
    protected $guarded = [];

    public function getNosotrosImageAttribute($value)
    {
        return $value ? asset('storage/' . $value) : null;
    }
    public function getGarantiaImageAttribute($value)
    {
        return $value ? asset('storage/' . $value) : null;
    }
    public function getGarantiaBgAttribute($value)
    {
        return $value ? asset('storage/' . $value) : null;
    }
}
