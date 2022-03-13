import useSWR from "swr";

export default function useSequence(id) {
  const {data, error, mutate} = useSWR(`/api/sequence/${id}`);
  return {
    sequence: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  }
}
