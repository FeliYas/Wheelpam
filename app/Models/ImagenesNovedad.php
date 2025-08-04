<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImagenesNovedad extends Model
{
    protected $guarded = [];

    public function novedad()
    {
        return $this->belongsTo(Novedad::class);
    }

    public function getImageAttribute($value)
    {
        return asset('storage/' . $value);
    }
}
