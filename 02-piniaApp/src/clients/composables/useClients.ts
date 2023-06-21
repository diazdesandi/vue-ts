import clientsApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";
import { useQuery } from "@tanstack/vue-query";

const getClients = async (): Promise<Client[]> => {
  const { data } = await clientsApi.get<Client[]>("/clients?_page=1");
  return data;
};

const useClients = () => {
  const { isLoading, data } = useQuery(["clients?page=", 1], () =>
    getClients()
  );

  return {
    isLoading,
    data,
  };
};

export default useClients;
