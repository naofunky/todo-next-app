import useSWR from 'swr';
import { API_URL } from '../utils/url';

async function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

export const useGetTodo = () => {
  const { data, isLoading, error, mutate } = useSWR(`${API_URL}`, fetcher);

  return {
    todos: data,
    isLoading,
    error,
    mutate,
  };
};
