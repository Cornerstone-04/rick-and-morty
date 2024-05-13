"use client";

import axios from "@/api/axios";
import { EpisodeInterface } from "@/utils/store/episodes/episodesInterface";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    }finally{
      setIsloading(false)
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
      <section className="flex gap-8 items-start">
        <div className="w-[300px] flex flex-col gap-2">
          <img src={"/images/rick_and_morty_cover.jpeg"} alt={episode.name} />
          <h1 className="text-xl font-bold">{episode.name}</h1>
        </div>
        <div className="flex flex-col gap-2 text-lg">
          <h1 className="text-xl font-bold">{episode.name}</h1>
          <p>Episode: {episode.episode}</p>
          <p>Aired: {episode.air_date}</p>
          {/* <p>
            Characters:
            <ul>
              {episode.characters.map((character) => (
                <li key={character}><Link href={character}>{character}</Link></li>
              ))}
            </ul>{" "}
          </p> */}

          {/*<p>Species: {episode.species}</p>
          <p>Gender: {episode.gender}</p>
          <p>Origin: {episode.origin?.name}</p>
          <p>Location: {episode.location?.name}</p> */}
        </div>
      </section>
      <section>{/* carousel */}</section>
    </div>
  );
};

export default Episode;
