<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import equiposRoutes from '@/routes/equipos';

defineProps<{
    equipo: {
        id: number;
        nombre: string;
        modelo: string;
        propietario: string;
        f_ingreso: string;
        f_entrega: string;
        f_problema: string;
    };
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Dashboard',
                href: dashboard(),
            },
            {
                title: 'Equipos',
                href: '/equipos',
            },
        ],
    },
});
</script>

<template>
    <Head title="Detalle Equipo" />

    <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <h1 class="text-2xl font-bold">Detalle del Equipo</h1>

        <div class="max-w-xl space-y-3 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
            <div><span class="font-medium">Nombre:</span> {{ equipo.nombre }}</div>
            <div><span class="font-medium">Modelo:</span> {{ equipo.modelo }}</div>
            <div><span class="font-medium">Propietario:</span> {{ equipo.propietario }}</div>
            <div><span class="font-medium">Fecha de Ingreso:</span> {{ equipo.f_ingreso }}</div>
            <div><span class="font-medium">Fecha de Entrega:</span> {{ equipo.f_entrega }}</div>
            <div><span class="font-medium">Problema:</span> {{ equipo.f_problema }}</div>
        </div>

        <div class="flex gap-2">
            <Link :href="equiposRoutes.edit(equipo.id)">
                <Button variant="outline">Editar</Button>
            </Link>
            <Link :href="equiposRoutes.index()">
                <Button variant="outline">Volver</Button>
            </Link>
        </div>
    </div>
</template>