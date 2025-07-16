<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nosotros extends Model
{
    protected $guarded = [];

    public function getBannerAttribute($value)
    {
        return asset('storage/' . $value);
    }

    public function getImageAttribute($value)
    {
        return asset('storage/' . $value);
    }

    public function getVideoAttribute($value)
    {
        return asset('storage/' . $value);
    }
}
