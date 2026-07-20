<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { Form } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import equiposRoutes from '@/routes/equipos';

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
            {
                title: 'Crear',
                href: '/equipos/create',
            },
        ],
    },
});
</script>

<template>
    <Head title="Crear Equipo" />

    <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <h1 class="text-2xl font-bold">Crear Equipo</h1>

        <Form
            :action="equiposRoutes.store()"
            method="post"
            #default="{ errors, processing }"
            class="max-w-xl"
        >
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="nombre">Nombre</Label>
                    <Input id="nombre" name="nombre" placeholder="Nombre del equipo" />
                    <div v-if="errors.nombre" class="text-sm text-red-500">{{ errors.nombre }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="modelo">Modelo</Label>
                    <Input id="modelo" name="modelo" placeholder="Modelo" />
                    <div v-if="errors.modelo" class="text-sm text-red-500">{{ errors.modelo }}</div>
                </div>               
                <div class="grid gap-2">
                    <Label for="propietario">Propietario</Label>
                    <Input id="propietario" name="propietario" placeholder="Propietario" />
                    <div v-if="errors.propietario" class="text-sm text-red-500">{{ errors.propietario }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="f_ingreso">Fecha de Ingreso</Label>
                    <Input id="f_ingreso" name="f_ingreso" placeholder="DD/MM/AAAA" />
                    <div v-if="errors.f_ingreso" class="text-sm text-red-500">{{ errors.f_ingreso }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="f_entrega">Fecha de Entrega</Label>
                    <Input id="f_entrega" name="f_entrega" placeholder="DD/MM/AAAA" />
                    <div v-if="errors.f_entrega" class="text-sm text-red-500">{{ errors.f_entrega }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="f_problema">Problema</Label>
                    <Input id="f_problema" name="f_problema" placeholder="Descripción del problema" />
                    <div v-if="errors.problema" class="text-sm text-red-500">{{ errors.problema }}</div>
                </div>
                <div class="flex gap-2">
                    <Button type="submit" :disabled="processing">
                        {{ processing ? 'Guardando...' : 'Guardar' }}
                    </Button>
                    <Button type="button" variant="outline" @click="router.visit(equiposRoutes.index())">
                        Cancelar
                    </Button>
                </div>
            </div>
        </Form>
    </div>
</template>