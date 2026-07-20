<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import clientesRoutes from '@/routes/clientes';

interface Cliente {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    MetodoPago: string;
}

defineProps<{
    clientes: Cliente[];
}>();

const deleteCliente = (id: number) => {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
        router.delete(clientesRoutes.destroy(id));
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
                title: 'Clientes',
                href: '/clientes',
            },
        ],
    },
});
</script>

<template>
    <Head title="Clientes" />

    <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">Clientes</h1>
            <Link :href="clientesRoutes.create()">
                <Button>Nuevo Cliente</Button>
            </Link>
        </div>

        <div class="relative rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-sidebar-border/70 dark:border-sidebar-border">
                        <th class="px-4 py-3 text-left font-medium">Nombre</th>
                        <th class="px-4 py-3 text-left font-medium">Email</th>
                        <th class="px-4 py-3 text-left font-medium">Teléfono</th>
                        <th class="px-4 py-3 text-left font-medium">Dirección</th>
                        <th class="px-4 py-3 text-left font-medium">Ciudad</th>
                        <th class="px-4 py-3 text-left font-medium">Método de Pago</th>
                        <th class="px-4 py-3 text-left font-medium">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in clientes" :key="cliente.id" class="border-b border-sidebar-border/70 dark:border-sidebar-border">
                        <td class="px-4 py-3">{{ cliente.nombre }}</td>
                        <td class="px-4 py-3">{{ cliente.email }}</td>
                        <td class="px-4 py-3">{{ cliente.telefono }}</td>
                        <td class="px-4 py-3">{{ cliente.direccion }}</td>
                        <td class="px-4 py-3">{{ cliente.ciudad }}</td>
                        <td class="px-4 py-3">{{ cliente.MetodoPago }}</td>
                        <td class="px-4 py-3 flex gap-3">
    <Link
        :href="clientesRoutes.edit(cliente.id)"
        class="text-blue-500 hover:underline"
    >
        Editar
    </Link>

    <button
        @click="deleteCliente(cliente.id)"
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