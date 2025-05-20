<?php

namespace App\Http\Controllers;

use App\Models\Valores;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ValoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $valores = Valores::first();
        return Inertia::render('auth/valores', [
            'valores' => $valores,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {


        $data = $request->validate([
            'first_title' => 'sometimes|string|max:255',
            'second_title' => 'sometimes|string|max:255',
            'third_title' => 'sometimes|string|max:255',
            'first_text' => 'sometimes|string',
            'second_text' => 'sometimes|string',
            'third_text' => 'sometimes|string',
            'video' => 'sometimes|file',
        ]);

        $valores = Valores::first();

        if ($request->hasFile('video')) {
            // Delete the old video if it exists
            if ($valores->video) {
                $absolutePath = public_path('storage/' . $valores->video);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            // Store the new video
            $data['video'] = $request->file('video')->store('videos', 'public');
        }


        $valores->update($data);

        return redirect()->back()->with('success', 'Valores updated successfully.');
    }
}
