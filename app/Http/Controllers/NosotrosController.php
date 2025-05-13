<?php

namespace App\Http\Controllers;

use App\Models\Nosotros;
use Illuminate\Http\Request;

class NosotrosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return inertia('nosotros');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Nosotros $nosotros)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Nosotros $nosotros)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nosotros $nosotros)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nosotros $nosotros)
    {
        //
    }
}
