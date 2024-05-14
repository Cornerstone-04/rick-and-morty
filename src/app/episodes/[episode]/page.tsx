"use client";

import { useEffect, useState } from "react";
import { EpisodeType } from "./type";
import axios from "@/api/axios";
import Loader from "@/components/loader/Loader";

interface EpisodeProp {
  params: { episode: number };
}

let Episode = ({ params }: EpisodeProp) => {
  let [episode, setEpisode] = useState<EpisodeType | null>(null);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setIsLoading] = useState<boolean>(false);

  let fetchEpisode = async () => {
    setError(null);
    setIsLoading(true);

    let getEpisode = async () => {
      let response = await axios.get(`/episode/${params.episode}`);
      setEpisode(response.data);
    };

    try {
      await getEpisode();
    } catch (error) {
      setError("An error occured while fecthing episode details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisode();
  }, [params.episode]);

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <section className="flex flex-col-reverse md:flex-row gap-8 items-start">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="w-fit md:w-[300px] flex items-center justify-center">
              <img
                src={"/images/rick_and_morty_cover.jpeg"}
                alt={episode?.name}
              />
            </div>
            <div className="flex flex-col gap-2 text-lg">
              <h1 className="text-xl font-bold">{episode?.name}</h1>
              <p>Episode: {episode?.episode}</p>
              <p>Aired: {episode?.air_date}</p>
            </div>
          </>
        )}
      </section>
      <section>{/* TODO: carousel */}</section>
    </div>
  );
};

export default Episode;
