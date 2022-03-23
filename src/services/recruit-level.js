import useSWR from "swr";

export default function useRecruitLevel() {
  const {data, error} = useSWR("/api/recruit-level");
  return {
    recruitLevels: data,
    isLoading: !error && !data,
    isError: error
  }
}
