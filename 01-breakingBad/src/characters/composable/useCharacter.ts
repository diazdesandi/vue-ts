import { computed, ref } from "vue";
import type { Character } from "../interfaces/character";
import rickMortyApi from "@/api/rickMortyApi";
import { useQuery } from "@tanstack/vue-query";

const characterSet = ref<{ [id: string]: Character }>({}); // Manejar characters.list de Store
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async (id: string): Promise<Character> => {
  if (characterSet.value[id]) return characterSet.value[id];

  const { data } = await rickMortyApi.get<Character>(`/character/${id}`);
  return data;
};

const loadedCharacter = (character: Character) => {
  hasError.value = false;
  errorMessage.value = null;
  characterSet.value[character.id] = character;
};

const useCharacter = (id: string) => {
  const { isLoading } = useQuery(["characters", id], () => getCharacter(id), {
    onSuccess: loadedCharacter,
    // TODO: manejar error
  });

  return {
    // Properties
    list: characterSet,
    hasError,
    errorMessage,
    // Getters
    character: computed<Character | null>(() => characterSet.value[id]),
    // Methods
  };
};

export default useCharacter;
