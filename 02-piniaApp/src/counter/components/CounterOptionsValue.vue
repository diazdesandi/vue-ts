<script setup lang="ts">
import { useCounterOptionsStore } from '@/store/counter-options';

const counterStore = useCounterOptionsStore();


</script>
<template>
    <h1>Valor es: {{ counterStore.count }}</h1>
    <h4>Ultimo cambio: {{ counterStore.lastChanged }}</h4>
</template>

<style scoped></style>
