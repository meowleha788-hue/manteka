<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255'],
            'modelo' => ['required', 'string', 'max:255'],
            'propietario' => ['required', 'string', 'max:255'],
            'f_ingreso' => ['required', 'string', 'max:255'],
            'f_entrega' => ['required', 'string', 'max:255'],
            'problema' => ['required', 'string', 'max:255'],
        ];
    }
}