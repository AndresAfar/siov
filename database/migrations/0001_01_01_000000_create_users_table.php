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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->nullable(); // uuid para apis y referencias externas

            $table->string('name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->boolean('is_active')->default(true);

            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->timestamp('last_login_at')->nullable();
            
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('avatar_url')->nullable();     // Imagen de perfil
            $table->string('language')->default('es');    // Idioma preferido
            $table->string('theme')->default('light');    // light, dark, system
            $table->json('preferences')->nullable();      // JSON de géneros favoritos, configuraciones de reproducción...
            $table->timestamps();
        });

        Schema::create('user_logins', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->timestamp('logged_in_at')->default(now()); // Cuándo inició sesión
            $table->string('ip_address')->nullable();          // IP del dispositivo
            $table->string('user_agent')->nullable();          // Navegador/dispositivo
            $table->string('platform')->nullable();            // Web, iOS, Android, etc.
            $table->string('location')->nullable();            // País o ciudad (opcional, si se usa GeoIP)

            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('user_settings');
        Schema::dropIfExists('user_logins');
    }
};
