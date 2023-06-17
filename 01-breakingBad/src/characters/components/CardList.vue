<script setup lang="ts">
// import rickMortyApi from "@/api/rickMortyApi";
// import type { Character, Results } from "../interfaces/character";
// import { ref } from "vue";
import { useCharacters } from "../composable/useCharacters";

// const { data } = await rickMortyApi.get<Results>("/character");
// const { results } = data;
// console.log(results);

// const characters = ref<Character[]>(data.results);

const { isLoading, characters, hasError, errorMessage } = useCharacters();
</script>
<template>
        <h1 v-if="isLoading">Loading...</h1>
        <h1 v-if="hasError">{{ errorMessage }}</h1>
        <ul>
            <li v-for="{ id, name } of characters" :key="id">{{ name }}</li>
            <!-- <li v-for="{ id, name } of results" :key="id">{{ name }}</li> -->
    </ul>
</template>

<style scoped></style>
