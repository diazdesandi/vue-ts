import clientsApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import { useClientsStore } from "@/store/clients";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";

const getClients = async (page: number): Promise<Client[]> => {
  // await new Promise((resolve) => {
  //   setTimeout(() => resolve(true), 1500);
  // });

  const { data } = await clientsApi.get<Client[]>(`/clients?_page=${page}`);
  return data;
};

const useClients = () => {
  const store = useClientsStore();
  const { currentPage, clients, totalPages } = storeToRefs(store);

  const { isLoading, data } = useQuery(
    ["clients?page=", currentPage],
    () => getClients(currentPage.value)
    /*
    Usando staleTime evitamos que se realice la petición
    mientras esta en cache
    {
      staleTime: 1000 * 60,
    }
    */
  );

  // data es reactiva, entonces al existir un cambio,
  // se actualizan los cambios en la store.
  watch(
    data,
    (clients) => {
      if (clients) {
        store.setClients(clients);
      }
    },
    { immediate: true }
  );

  return {
    clients,
    currentPage,
    isLoading,
    totalPages,

    // Methods
    getPage(page: number) {
      store.setPage(page);
    },

    // Getters
    // Se crea un arreglo de 1 a 5
    // totalPageNumbers: computed(() =>
    //   [...new Array(totalPages.value)].map((value, index) => index + 1)
    // ),
  };
};

export default useClients;
