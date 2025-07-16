<?php

namespace App\Http\Controllers;

use App\Models\Valores;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ValoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $valores = Valores::orderBy('order')->get();
        return Inertia::render('auth/valores', [
            'valores' => $valores,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'order' => 'nullable|sometimes|string|max:255',
            'title' => 'nullable|string|max:255',
            'text' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
        ]);


        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('valores', 'public');
        }

        Valores::create($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {


        $data = $request->validate([
            'order' => 'nullable|sometimes|string|max:255',
            'title' => 'nullable|string|max:255',
            'text' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $valores = Valores::findOrFail($request->id);

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($valores->image) {
                Storage::delete($valores->image);
            }
            $data['image'] = $request->file('image')->store('valores', 'public');
        }


        $valores->update($data);

        return redirect()->back()->with('success', 'Valores updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $valores = Valores::findOrFail($request->id);
        $valores->delete();
    }
};
