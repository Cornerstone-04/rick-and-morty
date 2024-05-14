"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Labels from "@/components/Labels";

let Home = () => {
  let [videoIsActive, setVideoIsActive] = useState<boolean>(false);

  let handleClick = () => {
    setVideoIsActive((prev) => !prev);
  };

  return (
    <main className="relative w-full min-h-screen overflow-y-auto bg-image">
      <div className="min-h-screen flex flex-col justify-start gap-[7.5rem] w-full bg-backdrop bg-opacity-60 md:bg-opacity-40 backdrop-blur-[1px] px-6 md:px-[7.5rem] pt-10 pb-5">
        <Navbar />
        <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-start gap-4">
          <section className="w-full max-w-fit flex flex-col items-start justify-center gap-6">
            <h1 className="text-7xl font-bold w-full max-w-[29rem]">
              Rick and Morty
            </h1>
            <div>
              <Labels />
            </div>
            <p className="text-sm leading-[160%] w-full max-w-[26rem]">
              The fractured domestic lives of a nihilistic mad scientist and his
              anxious grandson are further complicated by their
              inter-dimensional misadventures.
            </p>
            <div className="flex gap-4">
              <Button
                type="primary"
                label="Watch Trailer"
                action={handleClick}
              />
            </div>
          </section>
          {videoIsActive && (
            <section className="w-full md:w-fit">
              <iframe
                src="https://www.youtube.com/embed/PkZtVBNkmso"
                title="Rick and Morty Season 7 Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen={true}
                className="!w-full md:!w-[500px] xl:!w-[1000px] !h-[250px] md:!h-[285px] xl:!h-[565px]"
              ></iframe>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
