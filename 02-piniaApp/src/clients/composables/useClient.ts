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

  const { isLoading, data } = useQuery(["client", id], () => getClient(id));

  watch(
    data,
    () => {
      if (data.value) client.value = data.value;
    },
    { immediate: true }
  );

  return {
    isLoading,
    client,
  };
};

export default useCounter;
