<script setup lang="ts">
import { toRef, ref, watch } from "vue";
import useClients from "../composables/useClients";

interface Props {
  currentPage: number;
  totalPages: number;
}

interface Emits {
  (e: "pageChanged", page: number): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const currentPage = toRef(props, "currentPage");
const totalPages = toRef(props, "totalPages");

const totalPageNumbers = ref<number[]>([]);

watch(
  totalPages,
  () => {
    totalPageNumbers.value = [...new Array(totalPages.value)].map(
      (value, index) => index + 1
    );
  },
  { immediate: true }
);

// Para utilizar getPage


// const { currentPage, getPage, totalPages, totalPageNumbers } = useClients();
</script>
<template>
  <div>
    <button :disabled="currentPage == 1" @click="emits('pageChanged', currentPage -1)">
      Anterior
    </button>
    <button
      v-for="number of totalPageNumbers"
      :key="number"
      :class="{ active: currentPage === number }"
      @click="emits('pageChanged', number)"
    >
      {{ number }}
    </button>
    <button
      :disabled="currentPage == totalPages"
      @click="emits('pageChanged', currentPage -1)"
    >
      Siguiente
    </button>
  </div>
</template>
<style scoped>
div {
  margin-top: 10px;
}
button {
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  margin-right: 5px;
  padding: 10px;
  transition: all 0.5s;
}

button:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
  transition: all 0.5s;
}

button:disabled {
  cursor: not-allowed;
}

.active {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>
