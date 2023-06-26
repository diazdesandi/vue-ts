import { useQuery } from '@tanstack/vue-query';
import { useIssuesStore } from 'src/stores/issues';
import { githubApi } from 'src/api/githubApi';
import { Label } from '../interfaces/label';
import { computed } from 'vue';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>('labels?per_page=100');
  return data;
};

const useLabels = () => {
  const issuesStore = useIssuesStore();

  const labelsQuery = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60, // 1hr
  });

  return {
    labelsQuery,

    // Getters:
    selectedLabels: computed(() => issuesStore.labels),

    // Methods:
    toggleLabel: issuesStore.toggleLabbel,
  };
};

export default useLabels;
