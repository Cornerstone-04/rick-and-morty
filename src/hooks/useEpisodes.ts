import { useCallback, useEffect, useState } from "react";
import axios from "@/api/axios";
import useEpisodeStore from "@/utils/store/episodes/episodes";

const useEpisodes = () => {
  const { episodes, setEpisodes, page, setPage, totalPages, setTotalPages } =
    useEpisodeStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const fetchEpisodes = useCallback(
    async (pageNum: number) => {
      if (pageNum < 1 || (totalPages && pageNum > totalPages)) return;

      setIsLoading(true);
      setError(undefined);

      try {
        const response = await axios.get(`/episode/?page=${pageNum}`);
        const data = response.data;

        setEpisodes(data.results);
        if (page !== pageNum) setPage(pageNum);
        if (totalPages !== data.info.pages) setTotalPages(data.info.pages);
      } catch {
        setError("An error occurred while fetching episodes.");
      } finally {
        setIsLoading(false);
      }
    },
    [page, totalPages, setEpisodes, setPage, setTotalPages]
  );

  useEffect(() => {
    fetchEpisodes(page);
  }, [fetchEpisodes, page]);

  return {
    episodes,
    page,
    totalPages,
    isLoading,
    error,
    fetchEpisodes,
  };
};

export default useEpisodes;
