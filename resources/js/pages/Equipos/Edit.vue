<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { Form } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        problema: string;
    };
}>();
</script>

<template>
    <Head title="Editar Equipo" />

    <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <h1 class="text-2xl font-bold">Editar Equipo</h1>

        <Form
            :action="equiposRoutes.update(equipo.id)"
            method="put"
            #default="{ errors, processing }"
            class="max-w-xl"
        >
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="nombre">Nombre</Label>
                    <Input id="nombre" name="nombre" v-model="equipo.nombre" placeholder="Nombre del equipo" />
                    <div v-if="errors.nombre" class="text-sm text-red-500">{{ errors.nombre }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="modelo">Modelo</Label>
                    <Input id="modelo" name="modelo" v-model="equipo.modelo" placeholder="Modelo" />
                    <div v-if="errors.modelo" class="text-sm text-red-500">{{ errors.modelo }}</div>
                </div>               
                <div class="grid gap-2">
                    <Label for="propietario">Propietario</Label>
                    <Input id="propietario" name="propietario" v-model="equipo.propietario" placeholder="Propietario" />
                    <div v-if="errors.propietario" class="text-sm text-red-500">{{ errors.propietario }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="f_ingreso">Fecha de Ingreso</Label>
                    <Input id="f_ingreso" name="f_ingreso" v-model="equipo.f_ingreso" placeholder="DD/MM/AAAA" />
                    <div v-if="errors.f_ingreso" class="text-sm text-red-500">{{ errors.f_ingreso }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="f_entrega">Fecha de Entrega</Label>
                    <Input id="f_entrega" name="f_entrega" v-model="equipo.f_entrega" placeholder="DD/MM/AAAA" />
                    <div v-if="errors.f_entrega" class="text-sm text-red-500">{{ errors.f_entrega }}</div>
                </div>
                <div class="grid gap-2">
                    <Label for="problema">Fecha del Problema</Label>
                    <Input id="problema" name="f_problema" v-model="equipo.problema" placeholder="DD/MM/AAAA" />
                    <div v-if="errors.problema" class="text-sm text-red-500">{{ errors.f_problema }}</div>
                </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-4">
                <Button type="button" variant="outline" @click="router.visit(equiposRoutes.index())">
                    Cancelar
                </Button>
                <Button type="submit" >
                    Guardar
                </Button>
            </div>
        </Form>
    </div>
</template>