"use client";

import { useEffect } from "react";
import axios from "@/api/axios";
import useCharacterStore from "@/utils/store/charactersStore";
import Link from "next/link";

const Characters = () => {
  const { characters, setCharacters } = useCharacterStore();

  const fetchCharacters = async () => {
    try {
      const response = await axios.get("/character");
      if (response.status === 200) {
        setCharacters(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  useEffect(() => {
    if (!characters) fetchCharacters();
  }, []);

  useEffect(() => {
    console.log(characters);
  }, [characters]);
  return (
    <div className="flex flex-col gap-8 pb-12">
      <h1 className="text-3xl font-bold w-full flex items-center justify-between">
        <span>Characters</span>
        <div className="text-base flex gap-4">
          <button>Prev</button>
          <button>Next</button>
        </div>
      </h1>
      <section className="flex justify-between gap-8 flex-wrap">
        {characters?.map((character) => (
          <div
            key={character.id}
            className="w-[300px] h-[300px] character-image cursor-pointer hover:scale-[1.1] transition-all ease-linear relative"
          >
            <img src={character.image} alt={character.name} className="" />
            <div className="w-full h-full image-overlay">
              <Link href={`/characters/${character.id}`} className="image-name">
                {character.name}
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Characters;
