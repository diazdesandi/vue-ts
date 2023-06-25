import { useQuery } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Issue } from '../interfaces/issue';

const getIssues = async (): Promise<Issue[]> => {
  const params = new URLSearchParams();
  params.append('per_page', '10');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });

  return data;
};

const useIssues = () => {
  const issuesQuery = useQuery(['issues'], getIssues);

  return {
    issuesQuery,
  };
};

export default useIssues;
