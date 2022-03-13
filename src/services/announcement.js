import useSWR from "swr";

export default function usePagedAnnouncement(page) {
  const {data, error} = useSWR(`/api/announcement?page=${page}`);
  return {
    announcements: data?.content,
    isLoading: !error && !data,
    isError: error,
  }
}
