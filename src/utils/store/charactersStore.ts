import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Location {
  name: string;
  url: string;
}

interface Origin extends Location { }

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface CharactersState {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
}


const useCharacterStore = create<CharactersState>(
  persist(
    (set) => ({
      characters: [],
      setCharacters: (characters: Character[]): void => set({ characters }),
    }),
    { name: "rickAndMorty" }
  )
);

export default useCharacterStore;
