<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { Form } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import clientesRoutes from '@/routes/clientes';

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
            {
                title: 'Crear',
                href: '/clientes/create',
            },
        ],
    },
});
</script>

<template>
    <Head title="Crear Cliente" />

    <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <h1 class="text-2xl font-bold">Crear Cliente</h1>

        <Form
            :action="clientesRoutes.store()"
            method="post"
            #default="{ errors, processing }"
            class="max-w-xl"
        >
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="nombre">Nombre</Label>
                    <Input id="nombre" name="nombre" placeholder="Nombre del cliente" />
                    <div v-if="errors.nombre" class="text-sm text-red-500">{{ errors.nombre }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" name="email" placeholder="correo@ejemplo.com" />
                    <div v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="telefono">Telefono</Label>
                    <Input id="telefono" name="telefono" placeholder="Telefono" />
                    <div v-if="errors.telefono" class="text-sm text-red-500">{{ errors.telefono }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="direccion">Direccion</Label>
                    <Input id="direccion" name="direccion" placeholder="Direccion" />
                    <div v-if="errors.direccion" class="text-sm text-red-500">{{ errors.direccion }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="ciudad">Ciudad</Label>
                    <Input id="ciudad" name="ciudad" placeholder="Ciudad" />
                    <div v-if="errors.ciudad" class="text-sm text-red-500">{{ errors.ciudad }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="MetodoPago">Metodo de Pago</Label>
                    <Input id="MetodoPago" name="MetodoPago" placeholder="Metodo de pago" />
                    <div v-if="errors.MetodoPago" class="text-sm text-red-500">{{ errors.MetodoPago }}</div>
                </div>
                <div class="flex gap-2">
                    <Button type="submit" :disabled="processing">
                        {{ processing ? 'Guardando...' : 'Guardar' }}
                    </Button>
                    <Button type="button" variant="outline" @click="router.visit(clientesRoutes.index())">
                        Cancelar
                    </Button>
                </div>
            </div>
        </Form>
    </div>
</template>