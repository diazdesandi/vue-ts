import rickMortyApi from "@/api/rickMortyApi";
import type { Character, Results } from "@/characters/interfaces/character";
import { reactive } from "vue";

interface Store {
  characters: {
    count: number;
    errorMessage: string | null;
    hasError: boolean;
    isLoading: boolean;
    list: Character[];
  };

  ids: {
    errorMessage: string | null;
    hasError: boolean;
    isLoading: boolean;
    list: {
      [id: string]: Character;
    };
  };

  // Métodos de Characters
  startLoadingCharacters: () => void;
  loadCharacters: (data: Character[]) => void;
  loadCharactersFailed: (error: string) => void;

  // Métodos de Characters por ID
  startLoadingCharacter: () => void;
  loadedCharacter: (character: Character) => void;
  checkIdStore: (id: string) => boolean; // Getter
}

// Initial State | Estado Inicial de la store
const characterStore = reactive<Store>({
  characters: {
    count: 0,
    errorMessage: null,
    hasError: false,
    isLoading: true,
    list: [],
  },

  ids: {
    errorMessage: null,
    hasError: false,
    isLoading: false,
    list: {},
  },

  // Métodos
  async startLoadingCharacters() {
    // console.log("StartLoadingCharacters");
    const { data } = await rickMortyApi.get<Results>("/character");
    this.loadCharacters(data.results);
  },
  loadCharacters(data: Character[]) {
    if (typeof data === "string") {
      return this.loadCharactersFailed(
        "Respuesta no es un arreglo de personajes"
      );
    }

    this.characters = {
      count: data.length,
      errorMessage: null,
      hasError: false,
      isLoading: false,
      list: data,
    };
  },
  loadCharactersFailed(error: string) {
    this.characters = {
      count: 0,
      errorMessage: error,
      hasError: true,
      isLoading: false,
      list: [],
    };
  },

  // Métodos por ID
  startLoadingCharacter() {
    this.ids = {
      ...this.ids,
      isLoading: true,
      hasError: false,
      errorMessage: null,
    };
  },
  loadedCharacter(character: Character) {
    (this.ids.isLoading = false), (this.ids.list[character.id] = character);
  },
  checkIdStore(id: string) {
    return !!this.ids.list[id];
  },
});

characterStore.startLoadingCharacters();

export default characterStore;
