<script setup lang="ts">
import LoadingModal from "@/shared/components/LoadingModal.vue";
import useClient from "@/clients/composables/useClient";
import { useRoute } from "vue-router";

const route = useRoute();

const { isLoading, client } = useClient(+route.params.id);
</script>
<template>
  <LoadingModal v-if="isLoading" />

  <div v-if="client">
    <h1>{{ client.name }}</h1>
    <form>
      <input type="text" placeholder="Nombre" :value="client.name" />
      <br />
      <input type="text" placeholder="Dirección" :value="client.address" />
      <br />
      <button type="submit">Guardar</button>
    </form>
  </div>
  <code> {{ client }} </code>
</template>

<style scoped>
input {
  width: 50%;
  padding: 5px 10px;
  margin-bottom: 10px;
}
button {
  margin-bottom: 10px;
}
</style>
