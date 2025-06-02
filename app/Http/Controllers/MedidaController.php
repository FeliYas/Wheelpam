<?php

namespace App\Http\Controllers;

use App\Models\Medida;
use Illuminate\Http\Request;

class MedidaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medidas = Medida::orderBy('order', 'asc')->get();
        return inertia('auth/medidasAdmin', [
            'medidas' => $medidas,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'order' => 'sometimes|string',
            'name' => 'required|string',
        ]);


        Medida::create($data);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'order' => 'sometimes|string',
            'name' => 'required|string',
        ]);

        Medida::where('id', $request->id)->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $medida = Medida::find($request->id);

        if ($medida) {
            $medida->delete();
        }
    }
}
