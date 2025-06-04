<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'uuid' => (string) \Illuminate\Support\Str::uuid(), // Generacion UUID para el usuario
            'is_active' => true, // activo por defecto
            'email' => $request->email,
            'email_verified_at' => null, // no verificado al registrarse
            'password' => Hash::make($request->password),
        ]);

        // Crear configuración de usuario por defecto
        $user->settings()->create([
            'avatar_url' => null, // Imagen de perfil por defecto
            'language' => 'es', // Idioma por defecto
            'theme' => 'light', // Tema por defecto
            'preferences' => json_encode([]), // Preferencias vacías por defecto
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
