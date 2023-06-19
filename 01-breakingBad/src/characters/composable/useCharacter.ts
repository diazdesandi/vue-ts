import { computed, ref } from "vue";
import type { Character } from "../interfaces/character";
import rickMortyApi from "@/api/rickMortyApi";
import { useQuery } from "@tanstack/vue-query";

const characterSet = ref<{ [id: string]: Character }>({}); // Manejar characters.list de Store
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async (id: string): Promise<Character> => {
  if (characterSet.value[id]) return characterSet.value[id];

  try {
    const { data } = await rickMortyApi.get<Character>(`/characters/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }
};

const loadedCharacter = (character: Character) => {
  hasError.value = false;
  errorMessage.value = null;
  characterSet.value[character.id] = character;
};

const loadedWithError = (error: string) => {
  hasError.value = true;
  errorMessage.value = error;
};

const useCharacter = (id: string) => {
  const { isLoading } = useQuery(["characters", id], () => getCharacter(id), {
    onSuccess: loadedCharacter,
    onError: loadedWithError,
  });

  return {
    // Properties
    list: characterSet,
    hasError,
    isLoading,
    errorMessage,
    // Getters
    character: computed<Character | null>(() => characterSet.value[id]),
    // Methods
  };
};

export default useCharacter;
