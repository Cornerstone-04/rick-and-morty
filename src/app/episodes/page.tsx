"use client";

import axios from "@/api/axios";
import useEpisodeStore from "@/utils/store/episodes/episodesStore";
import { useEffect, useState } from "react";
import { NavArrow } from "../../../public/icons";
import Link from "next/link";

const Episodes = () => {
  const { episodes, setEpisodes, page, setPage, totalPages, setTotalPages } =
    useEpisodeStore();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEpisodes = async (pageNum: number = page): Promise<void> => {
    setIsloading(true);
    setError(null);
    try {
      const response = await axios.get(`/episode/?page=${pageNum}`);
      console.log(response);
      if (response.status === 200) {
        setEpisodes(response.data.results);
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
    if (episodes.length === 0) fetchEpisodes();
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
      <section className="flex gap-8 flex-wrap">
        {episodes?.map(({ name, id, episode }) => (
          <div
            key={id}
            className="w-[300px] h-[300px] character-image cursor-pointer hover:scale-[1.1] transition-all ease-linear relative"
          >
            <img src="/images/rick_and_morty_cover.jpeg" alt={episode.name} />
            <div className="w-full h-full image-overlay !opacity-100">
              <Link href={`/episodes/${id}`} className="image-name">
                <em className="text-sm text-mid-white">{episode}</em>
                <h2>{name}</h2>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Episodes;
