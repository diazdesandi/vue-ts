import { computed, ref } from "vue";
import type { Character, Results } from "../interfaces/character";
import rickMortyApi from "@/api/rickMortyApi";
import { useQuery } from "@tanstack/vue-query";

const characters = ref<Character[]>([]); // Manejar characters.list de Store
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

// Obteniendo personajes primero desde la cache
const getCharacters = async (): Promise<Character[]> => {
  // Revisar si primero existen personajes en la store.
  if (characters.value.length > 0) {
    return characters.value;
  }

  const { data } = await rickMortyApi.get<Results>("/character");
  const { results } = data;
  return results;
};

const loadedCharacters = (data: Character[]) => {
  hasError.value = false;
  errorMessage.value = null;
  characters.value = data;
};

const useCharacters = () => {
  const { isLoading } = useQuery(
    ["characters"],
    getCharacters,
    // Accendiendo al Store
    {
      //   onSuccess(data) {
      //     loadedCharacters(data);
      //   },
      // Igual ^ v
      onSuccess: loadedCharacters,
    }
  );

  return {
    // Properties
    characters,
    errorMessage,
    hasError,
    isLoading,

    // Getters
    count: computed(() => characters.value.length),

    // Methods
  };
};

export default useCharacters;
