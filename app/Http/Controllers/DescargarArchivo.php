<?php

namespace App\Http\Controllers;


class DescargarArchivo extends Controller
{
    public function descargarArchivo($filename)
    {
        $path = storage_path("app/public/images/" . $filename); // Ruta correcta

        if (file_exists($path)) {
            return response()->download($path);
        }

        return response()->json(['message' => 'Archivo no encontrado'], 404);
    }
    public function descargarFicha($filename)
    {
        $path = storage_path("app/public/images/" . $filename);

        if (file_exists($path)) {
            return response()->download($path);
        }

        return response()->json(['message' => 'Ficha no encontrada'], 404);
    }
}
