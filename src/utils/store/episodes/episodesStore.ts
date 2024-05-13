import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Episodes } from "./episodesInterface";

interface EpisodesState {
  episodes: Episodes[];
  setEpisodes: (episodes: Episodes[]) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
}

const useEpisodeStore = create<EpisodesState>()(
  persist(
    (set) => ({
      episodes: [],
      setEpisodes: (episodes: Episodes[]): void => set({ episodes }),
      page: 1,
      setPage: (page: number) => set({ page }),
      totalPages: 0,
      setTotalPages: (totalPages: number) => set({ totalPages }),
    }),
    {
      name: "rickAndMorty",
      partialize: (state) => ({
        episodes: state.episodes,
      }),
    }
  )
);

export default useEpisodeStore;
