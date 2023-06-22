import clientsApi from "@/api/clients-api";
import type { Client } from "@/clients/interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";

const getClient = async (id: number) => {
  const { data } = await clientsApi.get<Client>(`/clients/${id}`);
  return data;
};

const useCounter = (id: number) => {
  const client = ref<Client>();

  const { isLoading, data } = useQuery(["client", id], () => getClient(id), {});

  watch(
    data,
    () => {
      /*
      client.value = data.value asigna la referncia de data a client,
      como data es readonly, client tambien lo es
      if (data.value) client.value = data.value;
      */
      // Usamos desestructuración para cortar la referencia
      if (data.value) client.value = { ...data.value };
    },
    { immediate: true }
  );

  return {
    isLoading,
    client,
  };
};

export default useCounter;
