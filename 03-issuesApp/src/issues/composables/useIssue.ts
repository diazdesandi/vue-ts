import { githubApi } from 'src/api/githubApi';
import { Issue } from '../interfaces/issue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
// import { computed } from 'vue';

interface Options {
  // Autoload Issue and comments
  autoload?: boolean;
}

const sleep = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

const getIssue = async (issueNumber: number): Promise<Issue> => {
  await sleep();

  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep();

  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};

const useIssue = (issueNumber: number, options?: Options) => {
  const { autoload = true } = options || {};

  const queryClient = useQueryClient();

  const issueQuery = useQuery(
    ['issue', issueNumber],
    () => getIssue(issueNumber),
    {
      staleTime: 1000 * 60,
      enabled: autoload,
    }
  );

  const issueCommentsQuery = useQuery(
    ['issue', issueNumber, 'comments'],
    () => getIssueComments(issueNumber),
    // () => getIssueComments(issueQuery.data.value?.number || 0),
    {
      staleTime: 1000 * 60,
      enabled: autoload,
      // Cambiar cuando exista un valor
      // enabled: computed(() => !!issueQuery.data.value),
    }
  );

  const prefetchIssue = (issueNumber: number) => {
    queryClient.prefetchQuery(
      ['issue', issueNumber],
      () => getIssue(issueNumber),
      {
        staleTime: 1000 * 60,
      }
    );
    queryClient.prefetchQuery(
      ['issue', issueNumber, 'comments'],
      () => getIssueComments(issueNumber),
      {
        staleTime: 1000 * 60,
      }
    );
  };

  const setIssueCacheData = (issue: Issue) => {
    queryClient.setQueryData(['issue', issue.number], issue);
  };

  return {
    issueQuery,
    issueCommentsQuery,

    // Methods
    prefetchIssue,
    setIssueCacheData,
  };
};

export default useIssue;
