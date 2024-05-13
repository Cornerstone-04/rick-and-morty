"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import useCharacterStore from "@/utils/store/characters/charactersStore";
import Link from "next/link";
import { NavArrow } from "../../../public/icons";

const Characters = () => {
  const {
    characters,
    setCharacters,
    page,
    setPage,
    totalPages,
    setTotalPages,
  } = useCharacterStore();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async (pageNum: number = page): Promise<void> => {
    setIsloading(true);
    setError(null);
    try {
      const response = await axios.get(`/character/?page=${pageNum}`);
      if (response.status === 200) {
        setCharacters(response.data.results);
        setPage(pageNum);
        setTotalPages(response.data.info.pages);
      } else {
        setError("Failed to fetch characters");
      }
    } catch (error) {
      setError("An error occcured while fetching characters.");
      throw error;
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (characters.length === 0) fetchCharacters();
  }, [page]);

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }
  
  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8 pb-12">
      <header className="font-bold w-full flex items-center justify-between">
        <h1 className="flex flex-col gap-1">
          <span className="text-3xl">Characters</span>
          <em className="text-xs text-gray-400">
            Page {page}/{totalPages}
          </em>
        </h1>
        <div className="text-base flex gap-4">
          <button
            disabled={page === 1}
            onClick={() => fetchCharacters(page - 1)}
            className="disabled:opacity-50"
          >
            <NavArrow className="" />
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => fetchCharacters(page + 1)}
            className="disabled:opacity-50"
          >
            <NavArrow className="rotate-180" />
          </button>
        </div>
      </header>
      <section className="flex gap-8 flex-wrap">
        {characters?.map(({ name, id, image }) => (
          <div
            key={id}
            className="w-[300px] h-[300px] character-image cursor-pointer hover:scale-[1.1] transition-all ease-linear relative"
          >
            <img src={image} alt={name} className="" />
            <div className="w-full h-full image-overlay">
              <Link href={`/characters/${id}`} className="image-name">
                {name}
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Characters;
