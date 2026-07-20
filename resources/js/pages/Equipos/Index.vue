<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import equiposRoutes from '@/routes/equipos';

interface Equipo {
    id: number;
    nombre: string;
    modelo: string;
    propietario: string;
    f_ingreso: string;
    f_entrega: string;
    f_problema: string;
}

defineProps<{
    equipos: Equipo[];
}>();

const deleteEquipo = (id: number) => {
    if (confirm('¿Está seguro de eliminar este equipo?')) {
        router.delete(equiposRoutes.destroy(id));
    }
};

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
    <Head title="Equipos" />

    <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">Equipos</h1>
            <Link :href="equiposRoutes.create()">
                <Button>Nuevo Equipo</Button>
            </Link>
        </div>

        <div class="relative rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-sidebar-border/70 dark:border-sidebar-border">
                        <th class="px-4 py-3 text-left font-medium">Nombre</th>
                        <th class="px-4 py-3 text-left font-medium">Modelo</th>
                        <th class="px-4 py-3 text-left font-medium">Propietario</th>
                        <th class="px-4 py-3 text-left font-medium">F. Ingreso</th>
                        <th class="px-4 py-3 text-left font-medium">F. Entrega</th>
                        <th class="px-4 py-3 text-left font-medium">Problema</th>
                        <th class="px-4 py-3 text-left font-medium">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="equipo in equipos" :key="equipo.id" class="border-b border-sidebar-border/70 dark:border-sidebar-border">
                        <td class="px-4 py-3">{{ equipo.nombre }}</td>
                        <td class="px-4 py-3">{{ equipo.modelo }}</td>
                        <td class="px-4 py-3">{{ equipo.propietario }}</td>
                        <td class="px-4 py-3">{{ equipo.f_ingreso }}</td>
                        <td class="px-4 py-3">{{ equipo.f_entrega }}</td>
                        <td class="px-4 py-3">{{ equipo.f_problema }}</td>
                        <td class="px-4 py-3 flex gap-3">
    <Link
        :href="equiposRoutes.edit(equipo.id)"
        class="text-blue-500 hover:underline"
    >
        Editar
    </Link>

    <button
        @click="deleteEquipo(equipo.id)"
        class="text-red-500 hover:underline"
    >
        Eliminar
    </button>
</td>
                   </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>