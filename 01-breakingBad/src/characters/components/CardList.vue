<script setup lang="ts">
import type { Character } from "../interfaces/character";
import CharacterCard from "./CharacterCard.vue";
// import rickMortyApi from "@/api/rickMortyApi";
// import { ref } from "vue";
// import { useQuery } from "@tanstack/vue-query";
// import { useCharacters } from "../composable/useCharacters";
// import rickMortyApi from "@/api/rickMortyApi";
// import type { Character, Results } from "../interfaces/character";

// 1.- Normal Suspense
// const { data } = await rickMortyApi.get<Results>("/character");
// const { results } = data;
// console.log(results);

// const characters = ref<Character[]>(data.results);

// 2.- Composable functions
// const { isLoading, characters, hasError, errorMessage } = useCharacters();

// 3.- TanStack Query
/*
const getCharactersSlow = async (): Promise<Character[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { data } = await rickMortyApi.get<Results>("/character");
      // console.log(data.results)
      const { results } = data;
      resolve(results);
    }, 1000);
  });

  //   const { data } = await rickMortyApi.get<Results>("/character");
  //   return data.results;
};

const { isLoading, isError, data, error } = useQuery(
  // Elemento que se quiere mantener en cache:
  ["characters"],
  // Función para obtener los datos
  getCharactersSlow,
  // Tiempo de permanencia de la información en la cache.
  // Nota 2: Se creo instancia global en main.ts
  // {
  //   cacheTime: 1000 * 60,
  //   refetchOnReconnect: "always",
  // }
);
*/

// Reutilización de componente

interface Props {
  characters: Character[]
}

const props = defineProps<Props>();
</script>
<template>
  <!-- <h1 v-if="isLoading">Loading...</h1> -->
  <!-- <h1 v-if="isError">{{ error }}</h1> -->
  <div class="card-list">
    <CharacterCard
      v-for="character of props.characters"
      :key="character.id"
      :character="character"
    />
  </div>
  <!-- <ul>
    <li v-for="{ id, name } of data" :key="id">{{ name }}</li> -->
  <!-- <li v-for="{ id, name } of results" :key="id">{{ name }}</li> -->
  <!-- </ul> -->
</template>

<style scoped>
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
