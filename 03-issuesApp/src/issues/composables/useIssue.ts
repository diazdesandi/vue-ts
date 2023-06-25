import { githubApi } from 'src/api/githubApi';
import { Issue } from '../interfaces/issue';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';

const getIssue = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};

const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(
    ['issue', issueNumber],
    () => getIssue(issueNumber),
    {
      staleTime: 1000 * 60,
    }
  );

  const issueCommentsQuery = useQuery(
    ['issue', issueNumber, 'comments'],
    () => getIssueComments(issueNumber),
    // () => getIssueComments(issueQuery.data.value?.number || 0),
    {
      staleTime: 1000 * 60,
      // Cambiar cuando exista un valor
      // enabled: computed(() => !!issueQuery.data.value),
    }
  );

  return {
    issueQuery,
    issueCommentsQuery,
  };
};

export default useIssue;
