<script setup lang="ts">
import rickMortyApi from "@/api/rickMortyApi";
import CardList from "@/characters/components/CardList.vue";
import { useQuery } from "@tanstack/vue-query";
import type { Character, Results } from "../interfaces/character";
import characterStore from "@/store/characters.store";

const props = defineProps<{ title: string; visible: boolean }>();

const getCharacters = async (): Promise<Character[]> => {
  const { data } = await rickMortyApi.get<Results>("/character");
  const { results } = data;
  return results;
};

const { isLoading, data } = useQuery(["characters"], getCharacters,
// Accendiendo al Store
{
  onSuccess(data) {
    characterStore.loadCharacters(data);
  }
}
);
</script>
<template>
  <!-- <h1 v-if="isLoading">Loading...</h1> -->
  <h1 v-if="characterStore.characters.isLoading">Loading...</h1>
  <!-- 
  <template v-else>
    <h2>{{ props.title }}</h2>
    <CardList :characters="data!" />
  </template> -->
  <template v-else>
    <h2>{{ props.title }}</h2>
    <CardList :characters="characterStore.characters.list" />
  </template>
</template>

<style scoped></style>
