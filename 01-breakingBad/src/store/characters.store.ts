import type { Character } from "@/characters/interfaces/character";
import { reactive } from "vue";

interface Store {
  characters: {
    count: number;
    errorMessage: string | null;
    hasError: boolean;
    isLoading: boolean;
    list: Character[];
  };

  // Métodos
  startLoadingCharacters: () => void;
  loadCharacters: (data: Character[]) => void;
  loadCharactersFailed: (error: string) => void;
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
  // Métodos
  startLoadingCharacters() {
    // console.log("StartLoadingCharacters");
  },
  loadCharacters(data: Character[]) {
    // this.characters.count = data.length;
    this.characters = {
      count: data.length,
      errorMessage: null,
      hasError: false,
      isLoading: false,
      list: data,
    };
  },
  loadCharactersFailed(error: string) {},
});

characterStore.startLoadingCharacters();

export default characterStore;
