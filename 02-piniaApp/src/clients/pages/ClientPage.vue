<script setup lang="ts">
import LoadingModal from "@/shared/components/LoadingModal.vue";
import useClient from "@/clients/composables/useClient";
import { useRoute } from "vue-router";
import { useMutation } from "@tanstack/vue-query";
import type { Client } from "../interfaces/client";
import clientsApi from "@/api/clients-api";
import { watch } from "vue";

const route = useRoute();

const { isLoading, client } = useClient(+route.params.id);

// Actualizando cliente
const updateClient = async (client: Client): Promise<Client> => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1500);
  });

  const { id, ...rest } = client;

  const { data } = await clientsApi.patch<Client>(`/clients/${id}`, rest);
  return data;
};

const clientMutation = useMutation(updateClient);

// Eliminar anuncio "Guardado! y "Guardando..."

watch(clientMutation.isSuccess, () => {
  setTimeout(() => {
    clientMutation.reset();
  }, 2000);
});
</script>
<template>
  <h3 v-if="clientMutation.isLoading.value">Guardando...</h3>
  <h3 v-if="clientMutation.isSuccess.value">Guardado!</h3>

  <LoadingModal v-if="isLoading" />

  <div v-if="client">
    <h1>{{ client.name }}</h1>
    <form @submit.prevent="clientMutation.mutate(client)">
      <input type="text" placeholder="Nombre" v-model="client.name" />
      <br />
      <input type="text" placeholder="Dirección" v-model="client.address" />
      <br />
      <button :disabled="clientMutation.isLoading.value" type="submit">
        Guardar
      </button>
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
