"use client";
import React, { useEffect, useState } from "react";
import axios from "@/api/axios"
import { CharacterType } from "./type";

interface CharacterProps {
  params: { character: number };
}

let Character = ({ params }: CharacterProps) => {
  let [character, setCharacter] = useState<CharacterType | null>(null);
  let [error, setError] = useState<string | null>(null);

  let fetchCharacter = async () => {
    setError(null);

    let getCharacter = async () => {
      let response = await axios.get(`/character/${params.character}`);
      setCharacter(response.data);
    };

    try {
      await getCharacter();
    } catch (error) {
      setError("An error occured while fecthing character details.");
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [params.character]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!character) {
    return <div>Loading character details...</div>;
  }

  return (
    <div className="w-full flex flex-col items-start">
      <section className="flex flex-col md:flex-row gap-8 items-start w-full">
        <div className="w-full md:w-[300px] flex flex-col gap-2">
          <img src={character.image} alt={character.name} />
          <h1 className="text-xl font-bold">{character.name}</h1>
        </div>
        <div className="flex flex-col gap-2 text-lg">
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin?.name}</p>
          <p>Location: {character.location?.name}</p>
        </div>
      </section>
      <section>{/* carousel */}</section>
    </div>
  );
};

export default Character;
