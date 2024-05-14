"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import useEpisodeStore from "@/utils/store/episodes/episodes";
import { NavArrow } from "../../../public/icons";
import Loader from "@/components/loader/Loader";
import DisplayCard from "@/components/DisplayCard";

let Episodes = () => {
  let { episodes, setEpisodes, page, setPage, totalPages, setTotalPages } =
    useEpisodeStore();
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [error, setError] = useState<string | undefined>(undefined);

  let fetchEpisodes = async (pageNum: number = page) => {
    setIsLoading(true);
    setError(undefined);

    let getEpisodes = async () => {
      let response = await axios.get(`/episode/?page=${pageNum}`);

      setEpisodes(response.data.results);
      setPage(pageNum);
      setTotalPages(response.data.info.pages);
    };

    try {
      await getEpisodes();
    } catch (error) {
      setError("An error occcured while fetching characters.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8 pb-6 md:pb-12 relative">
      <header className="font-bold w-full flex items-center justify-between">
        <h1 className="flex flex-col gap-1">
          <span className="text-3xl">Episodes</span>
          <em className="text-xs text-gray-400">
            Page {page}/{totalPages}
          </em>
        </h1>
        <div className="text-base flex gap-4">
          <button
            disabled={page === 1}
            onClick={() => fetchEpisodes(page - 1)}
            className="disabled:opacity-50"
          >
            <NavArrow className="" />
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => fetchEpisodes(page + 1)}
            className="disabled:opacity-50"
          >
            <NavArrow className="rotate-180" />
          </button>
        </div>
      </header>
      <section className="flex gap-8 flex-wrap justify-center md:justify-start items-center">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {episodes?.map(({ name, id, episode }) => (
              <DisplayCard
                key={id}
                name={name}
                alt={name}
                link={`/episodes/${id}`}
                image={"/images/rick_and_morty_cover.jpeg"}
                subtitle={episode}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Episodes;
