"use client";
import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { CharacterInterface } from "./interface";

interface CharacterProps {
  params: { character: number };
}

const Character = ({ params }: CharacterProps) => {
  const [character, setCharacter] = useState<CharacterInterface | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacter = async () => {
    setError(null);
    try {
      const response = await axios.get(`/character/${params.character}`);
      if (response.status === 200) {
        setCharacter(response.data);
      } else {
        setError("Failed to fetch character details.");
      }
    } catch (error) {
      setError("An error occured while fecthing character details.");
      throw error;
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
    <div className="flex flex-col items-start">
      <section className="flex gap-8 items-start">
        <div className="w-[300px] flex flex-col gap-2">
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
