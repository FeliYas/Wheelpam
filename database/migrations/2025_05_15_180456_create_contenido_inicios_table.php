<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contenido_inicios', function (Blueprint $table) {
            $table->id();
            $table->string('nosotros_image')->nullable();
            $table->longText('nosotros_text')->nullable();
            $table->string('nosotros_title')->nullable();
            $table->string('garantia_image')->nullable();
            $table->longText('garantia_text')->nullable();
            $table->string('garantia_title')->nullable();
            $table->string('garantia_bg')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contenido_inicios');
    }
};
