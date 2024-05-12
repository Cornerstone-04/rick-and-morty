"use client";

import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { FC } from "react";

const Home: FC = () => {
  const route = useRouter();
  const handleClick = (): void => {
    route.push(
      "https://www.imdb.com/video/vi1423230745/?playlistId=tt2861424&ref_=ext_shr_lnk"
    );
  };
  return (
    <main className="min-h-screen flex flex-col justify-start gap-[7.5rem] w-full">
      <section className="px-[7.5rem] pt-10 ">
        <Navbar />
      </section>

      <section className="px-[7.5rem] w-full max-w-fit flex flex-col items-start justify-center gap-6">
        <h1 className="text-7xl font-bold w-full max-w-[29rem]">
          Rick and Morty
        </h1>
        <div>{/* IMDb details */}
        <p><span>IMDb</span></p>
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

      <section>{/* slide show here */}</section>
    </main>
  );
};

export default Home;
