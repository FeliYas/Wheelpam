<?php

namespace Database\Seeders;

use App\Models\Metadatos;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'pablo',
            'password' => bcrypt('pablopablo'),
        ]);

        Metadatos::factory()->createMany([
            [
                'title' => 'Inicio',
                'description' => 'Inicio',
                'keywords' => 'Inicio',
            ],
            [
                'title' => 'Nosotros',
                'description' => 'Nosotros',
                'keywords' => 'Nosotros',
            ],
            [
                'title' => 'Productos',
                'description' => 'Productos',
                'keywords' => 'Productos',
            ],
            [
                'title' => 'Servicios',
                'description' => 'Servicios',
                'keywords' => 'Servicios',
            ],
            [
                'title' => 'Garantia',
                'description' => 'Garantia',
                'keywords' => 'Garantia',
            ],
            [
                'title' => 'Novedades',
                'description' => 'Novedades',
                'keywords' => 'Novedades',
            ],
            [
                'title' => 'Solicitud de presupuesto',
                'description' => 'Solicitud de presupuesto',
                'keywords' => 'Solicitud de presupuesto',
            ],
            [
                'title' => 'Contacto',
                'description' => 'Contacto',
                'keywords' => 'Contacto',
            ],
            // Puedes agregar más registros aquí
        ]);
    }
}
