import { githubApi } from 'src/api/githubApi';
import { Issue } from '../interfaces/issue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

interface IssueArgs {
  title: string;
  labels?: string[];
  body?: string;
}

const addIssue = async ({
  title,
  body = '',
  labels = [],
}: IssueArgs): Promise<Issue> => {
  const newIssueData = { title, body, labels };

  const { data } = await githubApi.post<Issue>('/issues', newIssueData);

  return data;
};

const useIssueMutation = () => {
  const queryClient = useQueryClient();

  const issueMutation = useMutation(addIssue, {
    onSuccess: (issue) => {
      // Invalidar queries para que se vuelva a cambiar toda la información en cache
      queryClient.invalidateQueries({
        // Invalida cualquier query basada en el queryKey, es cualquiera porque exact esta el false.
        queryKey: ['issues'],
        exact: false,
      });

      // Se recrea la cache, es decir, se actualiza la cache eliminada con los nuevos datos.
      queryClient.refetchQueries(['issues'], {
        exact: false,
      });

      queryClient.setQueryData(['issue', issue.number], issue);
    },
    onSettled: () => {
      //
    },
  });

  return {
    issueMutation,
  };
};

export default useIssueMutation;
