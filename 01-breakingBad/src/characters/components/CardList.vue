<script setup lang="ts">
import rickMortyApi from "@/api/rickMortyApi";
import type { Character, Results } from "../interfaces/character";
import { ref } from "vue";

const { data } = await rickMortyApi.get<Results>("/character")
const { results } = data;
console.log(results)

// const characters = ref<Character[]>(data.results);
// const characters = ref<Character[]>([]);


/*
rickMortyApi.get<Results>("/character").then((resp) => {
    characters.value = resp.data.results;
});
*/
</script>
<template>
    <ul>
            <!-- <li v-for="{ id, name } of characters" :key="id">{{ name }}</li> -->
            <li v-for="{ id, name } of results" :key="id">{{ name }}</li>
    </ul>
</template>

<style scoped></style>
