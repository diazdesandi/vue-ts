import { onMounted, ref } from "vue";
import type { Character, Results } from "../interfaces/character";
import rickMortyApi from "@/api/rickMortyApi";
import axios from "axios";

// Al ponerlo fuera de la función se generan en el scope global.
const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>();

export const useCharactersOld = () => {
  onMounted(async () => {
    loadCharacters();
  });

  const loadCharacters = async () => {
    if (characters.value.length > 0) return;
    isLoading.value = true;
    try {
      const { data } = await rickMortyApi.get<Results>("/character");
      characters.value = data.results;
      isLoading.value = false;
    } catch (error) {
      hasError.value = true;
      isLoading.value = false;

      if (axios.isAxiosError(error)) {
        return (errorMessage.value = error.message);
      }
      errorMessage.value = JSON.stringify(error);
    }
  };

  return {
    characters,
    isLoading,
    hasError,
    errorMessage,
  };
};
