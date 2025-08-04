<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Garantia;
use Illuminate\Http\Request;

class GarantiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $garantia = Garantia::first();
        return inertia('auth/garantiaAdmin', [
            'garantia' => $garantia,
        ]);
    }

    public function indexInicio()
    {
        $garantia = Garantia::first();
        $banner = Banner::where('name', 'garantia')->first();
        return inertia('garantia', [
            'garantia' => $garantia,
            'banner' => $banner
        ]);
    }

    public function garantiaBanner()
    {
        $garantia = Banner::where('name', 'garantia')->first();
        return inertia('auth/garantiaBanner', [
            'garantia' => $garantia,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'text' => 'sometimes|string',
            'more_text' => 'sometimes|string',
            'image' => 'sometimes|file|max:2048',
            'banner' => 'sometimes|file|max:2048',
        ]);

        $garantia = Garantia::first();

        // Check if the Garantia entry exists
        if (!$garantia) {
            return redirect()->back()->with('error', 'Garantia not found.');
        }

        // Handle file upload if image exists
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($garantia->image) {
                $absolutePath = public_path('storage/' . $garantia->image);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            // Store the new image
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        // Handle file upload if banner exists
        if ($request->hasFile('banner')) {
            // Delete the old banner if it exists
            if ($garantia->banner) {
                $absolutePath = public_path('storage/' . $garantia->banner);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            // Store the new banner
            $data['banner'] = $request->file('banner')->store('images', 'public');
        }

        $garantia->update($data);

        return redirect()->back()->with('success', 'Garantia updated successfully.');
    }
}
