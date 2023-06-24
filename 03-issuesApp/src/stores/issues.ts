import { defineStore } from 'pinia';
import { ref } from 'vue';

enum State {
  all,
  open,
  closed,
}

export const useIssuesStore = defineStore('issues', () => {
  const state = ref(''); // all,open,closed
  const labels = ref<string[]>([]);

  return {
    // State Props
    state,
    labels,
    // Getters
    // Actions
    toggleLabbel(labelName: string) {
      if (labels.value.includes(labelName)) {
        labels.value = labels.value.filter((label) => label !== labelName);
        return;
      }
      labels.value.push(labelName);
    },
    // Reset
  };
});
