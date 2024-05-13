import { create } from "zustand";
import { persist } from "zustand/middleware";

const useEpisodeStore = create(
  persist(
    (set) => ({
      characters: [],
      setCharacters: (characters: any[]): void => set({ characters }),
      episodes: [],
      setEpisodes: (episodes: any[]): void => set({ episodes }),
    }),
    { name: "rickAndMorty" }
  )
);

export default useEpisodeStore;
