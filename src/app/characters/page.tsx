"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import useCharacterStore from "@/utils/store/characters/characters";
import { NavArrow } from "../../../public/icons";
import Loader from "@/components/loader/Loader";
import DisplayCard from "@/components/DisplayCard";

let Characters = () => {
  let { characters, setCharacters, page, setPage, totalPages, setTotalPages } =
    useCharacterStore();
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [error, setError] = useState<string | undefined>(undefined);

  let fetchCharacters = async (pageNum: number = page): Promise<void> => {
    setIsLoading(true);
    setError(undefined);

    let getCharacters = async () => {
      let response = await axios.get(`/character/?page=${pageNum}`);

      setCharacters(response.data.results);
      setPage(pageNum);
      setTotalPages(response.data.info.pages);
    };

    try {
      await getCharacters();
    } catch (error) {
      setError("An error occcured while fetching characters.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8 pb-12 relative">
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
      <section className="w-full flex gap-8 flex-wrap justify-center md:justify-start items-center">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {characters?.map(({ name, id, image }) => (
              <DisplayCard
                key={id}
                name={name}
                alt={name}
                link={`/characters/${id}`}
                image={image}
              />
            ))}
          </>
        )}
      </section>
      {characters.length > 0 ? (
        <section className="w-full flex justify-between absolute bottom-0">
          <button
            onClick={() => fetchCharacters(1)}
            disabled={page === 1}
            className="bottom-nav"
          >
            &lt;&lt; First Page
          </button>
          <button
            onClick={() => fetchCharacters(totalPages)}
            disabled={page >= totalPages}
            className="bottom-nav"
          >
            Last Page&gt;&gt;
          </button>
        </section>
      ) : null}
    </div>
  );
};

export default Characters;
