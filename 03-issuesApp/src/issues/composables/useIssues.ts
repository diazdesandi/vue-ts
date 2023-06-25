import { useQuery } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Issue, State } from '../interfaces/issue';
import { useIssuesStore } from 'src/stores/issues';
import { storeToRefs } from 'pinia';

const getIssues = async (labels: string[], state: State): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length > 0) {
    // Se une cada label para formar un string
    const labelsString = labels.join(',');
    params.append('labels', labelsString);
  }

  params.append('per_page', '10');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });

  return data;
};

const useIssues = () => {
  const issuesStore = useIssuesStore();
  const { labels, state } = storeToRefs(issuesStore);

  const issuesQuery = useQuery(['issues', { labels, state }], () =>
    // Se envían los valores en lugar de la referencia reactiva
    getIssues(labels.value, state.value)
  );

  return {
    issuesQuery,
  };
};

export default useIssues;
