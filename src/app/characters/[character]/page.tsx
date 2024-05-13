"use client";
import React, { useEffect, useState } from "react";
import axios from "@/api/axios";

const Character = ({ params }: { params: { character: number } }) => {
  const [character, setCharacter] = useState<{}>({});

  const fetchCharacter = async () => {
    try {
      const response = await axios.get(`/character/${params.character}`);
      console.log(response);
      if (response.status === 200) {
        setCharacter(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  useEffect(() => {
    console.log(character);
  }, [character]);

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
