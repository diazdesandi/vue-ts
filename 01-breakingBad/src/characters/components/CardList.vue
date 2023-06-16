<script setup lang="ts">
import rickMortyApi from '@/api/rickMortyApi';
import type { Results } from '../interfaces/character';


rickMortyApi.get<Results>('/character').then(resp => {
    const name = resp.data.results
    console.log(name)
})

</script>
<template>
    <ul>
        <li>Hola</li>
    </ul>
</template>


<style scoped></style>