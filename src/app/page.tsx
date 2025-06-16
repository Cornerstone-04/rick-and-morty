"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Labels from "@/components/Labels";
import { useRouter } from "next/navigation";
import TrailerDialog from "@/components/trailer-dialog";

let Home = () => {
  let [isLoaded, setIsLoaded] = useState<boolean>(false);
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/characters");
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="relative w-full min-h-screen overflow-y-auto bg-image">
      <div className="min-h-screen flex flex-col justify-start gap-[7.5rem] w-full bg-backdrop bg-opacity-60 md:bg-opacity-40 backdrop-blur-[1px] px-6 md:px-[7.5rem] pt-10 pb-5">
        <Navbar />
        <div className="flex flex-col items-center justify-center text-center gap-8 w-full max-w-4xl mx-auto">
          <section
            className={`flex flex-col items-center justify-center gap-6 transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold relative z-10 bg-gradient-to-r from-white via-blue-100 to-green-200 bg-clip-text text-transparent animate-pulse-subtle">
                Rick and Morty
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-lg blur-lg opacity-20 animate-glow"></div>
            </div>

            <div className="transform hover:scale-105 transition-transform duration-300">
              <Labels />
            </div>

            <p className="text-sm md:text-base leading-[160%] max-w-2xl text-gray-200 hover:text-white transition-colors duration-300">
              The fractured domestic lives of a nihilistic mad scientist and his
              anxious grandson are further complicated by their
              inter-dimensional misadventures.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group">
                <TrailerDialog />
              </div>

              <div className="relative group">
                <Button
                  type="secondary"
                  label="Explore Characters"
                  action={handleNavigate}
                />
              </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500 rounded-full opacity-10 animate-float"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-500 rounded-full opacity-10 animate-float-delayed"></div>
          </section>
        </div>

        {/* Portal-like effect at the bottom */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse-slow"></div>
        </div>
      </div>
    </main>
  );
};

export default Home;
