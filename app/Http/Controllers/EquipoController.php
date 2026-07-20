<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Http\Requests\StoreEquipoRequest;
use App\Http\Requests\UpdateEquipoRequest;
use Inertia\Inertia;

class EquipoController extends Controller
{
    public function index()
    {
        return Inertia::render('Equipos/Index', [
            'equipos' => Equipo::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Equipos/Create');
    }

    public function store(StoreEquipoRequest $request)
    {
        Equipo::create($request->validated());

        return redirect()->route('equipos.index');
    }

    public function show(Equipo $equipo)
    {
        return Inertia::render('Equipos/Show', [
            'equipo' => $equipo,
        ]);
    }

    public function edit(Equipo $equipo)
    {
        return Inertia::render('Equipos/Edit', [
            'equipo' => $equipo,
        ]);
    }

    public function update(UpdateEquipoRequest $request, Equipo $equipo)
    {
        $equipo->update($request->validated());

        return redirect()->route('equipos.index');
    }

    public function destroy(Equipo $equipo)
    {
        $equipo->delete();

        return redirect()->route('equipos.index');
    }
}