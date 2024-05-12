"use client";

import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { BgOne } from "../../public/images";

const Home: FC = () => {
  const route = useRouter();
  const handleClick = (): void => {
    route.push(
      "https://www.imdb.com/video/vi1423230745/?playlistId=tt2861424&ref_=ext_shr_lnk"
    );
  };
  return (
    <main className="relative w-full min-h-screen overflow-y-auto bg-image">
      {/* <Image
        src={BgOne}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        alt="background"
        style={{
          backdropFilter: "10px",
        }}
      /> */}
      <div className="min-h-screen  flex flex-col justify-start gap-[7.5rem] w-full bg-bg-rm bg-[#16161D] bg-opacity-40">
        <section className="px-[7.5rem] pt-10 ">
          <Navbar />
        </section>

        <section className="px-[7.5rem] w-full max-w-fit flex flex-col items-start justify-center gap-6">
          <h1 className="text-7xl font-bold w-full max-w-[29rem]">
            Rick and Morty
          </h1>
          <div>
            <p className="text-xs flex gap-2 items-center text-mid-white">
              <span className="bg-yellow-500 p-1 rounded font-bold text-black">
                IMDb
              </span>{" "}
              <span>9.1 (603k)</span>
              <span>|</span>
              <span>2013</span>
              <span>|</span>
              <span>Animation</span>
            </p>
          </div>
          <p className="text-sm leading-[160%] w-full max-w-[26rem]">
            The fractured domestic lives of a nihilistic mad scientist and his
            anxious grandson are further complicated by their inter-dimensional
            misadventures.
          </p>
          <div className="flex gap-4">
            <Button type="primary" label="Watch Trailer" action={handleClick} />
          </div>
        </section>

        {/* <section>slide show here
        something
        </section> */}
      </div>
    </main>
  );
};

export default Home;
