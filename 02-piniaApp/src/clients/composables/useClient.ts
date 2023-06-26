import clientsApi from "@/api/clients-api";
import type { Client } from "@/clients/interfaces/client";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";

const getClient = async (id: number) => {
  const { data } = await clientsApi.get<Client>(`/clients/${id}`);
  return data;
};

// Actualizando cliente
const updateClient = async (client: Client): Promise<Client> => {
  // await new Promise((resolve) => {
  //   setTimeout(() => resolve(true), 1500);
  // });

  const { id, ...rest } = client;

  const { data } = await clientsApi.patch<Client>(`/clients/${id}`, rest);

  /*
  const queries = queryClient
    .getQueryCache()
    .findAll(["clients?page="], { exact: false });

  // Basado en la query que se utiliza, se elimina la cache y esto
  // realiza la petición de nuevo
  queries.forEach((query) => query.fetch());
*/
  return data;
};

const useCounter = (id: number) => {
  const client = ref<Client>();

  const { isLoading, data, isError } = useQuery(
    ["client", id],
    () => getClient(id),
    {
      retry: false,
      // onError(error: any) {
      //   console.log(error.message);
      // },
    }
  );

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

  const clientMutation = useMutation(updateClient);

  // Eliminar anuncio "Guardado! y "Guardando..."

  return {
    client,
    clientMutation,
    isError,
    isLoading,

    // Methods
    updateClient: clientMutation.mutate,
    isUpdating: computed(() => clientMutation.isLoading.value),
    isErrorUpdating: computed(() => clientMutation.isError.value),
    isUpdatingSuccess: computed(() => clientMutation.isSuccess.value),
  };
};

export default useCounter;
