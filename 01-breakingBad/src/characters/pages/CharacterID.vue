<script setup lang="ts">
import { useRoute } from "vue-router";
import useCharacter from "../composable/useCharacter";

const route = useRoute();

const { id } = route.params as { id: string };

const { character, hasError, errorMessage } = useCharacter(id);
</script>
<template>
  <h1 v-if="!character">Loading...</h1>
  <h1 v-else-if="hasError">{{ errorMessage }}</h1>
  <div v-else>
    <h1>{{ character.name }} #{{ id }}</h1>
    <div class="character-container">
      <img :src="character.image" :alt="character.name" />
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
