<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Character } from "../interfaces/character";
import characterStore from "@/store/characters.store";
import rickMortyApi from "@/api/rickMortyApi";
import { useQuery } from "@tanstack/vue-query";

const route = useRoute();

const { id } = route.params as { id: string };

const getCharacterCache = async (characterID: string): Promise<Character> => {
  if (characterStore.checkIdStore(characterID)) {
    return characterStore.ids.list[characterID];
  }

  const { data } = await rickMortyApi.get<Character>(
    `/character/${characterID}`
  );
  console.log(data);
  return data;
};

const { isLoading, data: character } = useQuery(
  ["characters", id],
  () => getCharacterCache(id),
  {
    onSuccess(character) {
      characterStore.loadedCharacter(character);
    },
  }
);
</script>
<template>
  <h1 v-if="isLoading || !character">Loading...</h1>
  <div v-else>
    <h1>{{ character.name }} #{{ id }}</h1>
    <div class="character-container">
      <img :src="character.image" :alt="character.name">
      <ul>
        <li>Estatus: {{ character.status }}</li>
        <li>Especie: {{ character.species }}</li>
        <li>Género: {{ character.gender }}</li>
        <li>Ubicación: {{ character.location.name }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.character-container {
  display: flex;
  flex-direction: row;
}

img {
  width: 150px;
  border-radius: 5px;
}

</style>
