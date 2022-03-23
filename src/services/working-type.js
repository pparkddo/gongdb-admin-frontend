import useSWR from "swr";

export default function useWorkingType() {
  const {data, error} = useSWR("/api/working-type");
  return {
    workingTypes: data,
    isLoading: !error && !data,
    isError: error
  }
}
