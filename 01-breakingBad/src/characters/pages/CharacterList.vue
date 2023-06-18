<script setup lang="ts">
import rickMortyApi from "@/api/rickMortyApi";
import CardList from "@/characters/components/CardList.vue";
import { useQuery } from "@tanstack/vue-query";
import type { Character, Results } from "../interfaces/character";

const props = defineProps<{ title: string; visible: boolean }>();

const getCharacters = async (): Promise<Character[]> => {
  const { data } = await rickMortyApi.get<Results>("/character");
  const { results } = data;
  return results;
};

const { isLoading, data } = useQuery(["characters"], getCharacters);
</script>
<template>
  <h1 v-if="isLoading">Loading...</h1>

  <template v-else>
    <h2>{{ props.title }}</h2>
    <CardList :characters="data!" />
  </template>
</template>

<style scoped></style>
