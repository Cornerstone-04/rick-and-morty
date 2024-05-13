"use client";

import axios from "@/api/axios";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EpisodeInterface } from "./interface";

interface EpisodeProp {
  params: { episode: number };
}

const Episode = ({ params }: EpisodeProp) => {
  const [episode, setEpisode] = useState<EpisodeInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const fetchEpisode = async () => {
    setError(null);
    setIsloading(true);

    try {
      const response = await axios.get(`/episode/${params.episode}`);
      if (response.status === 200) {
        setEpisode(response.data);
      } else {
        setError("Failed to fetch episode details.");
      }
    } catch (error) {
      setError("An error occured while fecthing episode details.");
      throw error;
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchEpisode();
  }, [params.episode]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!episode || isLoading) {
    return <div>Loading episode details...</div>;
  }

  return (
    <div className="flex flex-col items-start">
      <section className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-fit md:w-[300px] flex items-center justify-center">
          <img src={"/images/rick_and_morty_cover.jpeg"} alt={episode.name} />
        </div>
        <div className="flex flex-col gap-2 text-lg">
          <h1 className="text-xl font-bold">{episode.name}</h1>
          <p>Episode: {episode.episode}</p>
          <p>Aired: {episode.air_date}</p>
        </div>
      </section>
      <section>{/* carousel */}</section>
    </div>
  );
};

export default Episode;
