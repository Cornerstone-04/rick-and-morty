"use client";
import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { CharacterType } from "./type";
import Loader from "@/components/loader/Loader";

interface CharacterProps {
  params: { character: number };
}

let Character = ({ params }: CharacterProps) => {
  let [character, setCharacter] = useState<CharacterType | null>(null);
  let [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);
  let [error, setError] = useState<string | undefined>(undefined);

  let fetchCharacter = async () => {
    setIsLoading(true);
    setError(undefined);

    let getCharacter = async () => {
      let response = await axios.get(`/character/${params.character}`);
      setCharacter(response.data);
    };

    try {
      await getCharacter();
    } catch (error) {
      setError("An error occured while fecthing character details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [params.character]);

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Error: {error}</h1>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-start">
      <section className="flex flex-col md:flex-row gap-8 items-start w-full">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="w-full md:w-[300px] flex flex-col gap-2">
              <img src={character?.image} alt={character?.name} />
              <h1 className="text-xl font-bold">{character?.name}</h1>
            </div>
            <div className="flex flex-col gap-2 text-lg">
              <p>Status: {character?.status}</p>
              <p>Species: {character?.species}</p>
              <p>Gender: {character?.gender}</p>
              <p>Origin: {character?.origin?.name}</p>
              <p>Location: {character?.location?.name}</p>
            </div>
          </>
        )}
      </section>
      <section>{/* TODO: carousel */}</section>
    </div>
  );
};

export default Character;
