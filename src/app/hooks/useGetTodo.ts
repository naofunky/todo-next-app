import useSWR from 'swr';
import { API_URL } from '../utils/url';

export const useGetTodo = () => {
  function fetcher(url: string) {
    return fetch(url).then((res) => res.json());
  }

  const { data, isLoading, error, mutate } = useSWR(`${API_URL}`, fetcher);

  return {
    todos: data,
    isLoading,
    error,
    mutate,
  };
};
