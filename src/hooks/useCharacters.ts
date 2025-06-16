import { useEffect, useCallback, useState } from "react";
import axios from "@/api/axios";
import useCharacterStore from "@/utils/store/characters/characters";

const useCharacters = () => {
  const {
    characters,
    setCharacters,
    page,
    setPage,
    totalPages,
    setTotalPages,
  } = useCharacterStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchCharacters = useCallback(
    async (pageNum: number) => {
      if (pageNum < 1 || (totalPages && pageNum > totalPages)) return;

      setIsLoading(true);
      setError(undefined);

      try {
        const response = await axios.get(`/character/?page=${pageNum}`);
        const data = response.data;

        setCharacters(data.results);
        if (page !== pageNum) setPage(pageNum);
        if (totalPages !== data.info.pages) setTotalPages(data.info.pages);
      } catch (err) {
        setError("An error occurred while fetching characters.");
      } finally {
        setIsLoading(false);
      }
    },
    [page, setCharacters, setPage, totalPages, setTotalPages]
  );

  useEffect(() => {
    fetchCharacters(page);
  }, [fetchCharacters, page]);

  return {
    characters,
    page,
    totalPages,
    isLoading,
    error,
    fetchCharacters,
  };
};

export default useCharacters;
