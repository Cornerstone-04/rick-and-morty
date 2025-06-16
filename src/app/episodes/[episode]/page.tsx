"use client";

import { useEffect, useState } from "react";
import { EpisodeType } from "./type";
import axios from "@/api/axios";
import Loader from "@/components/loader/Loader";
import DisplayCard from "@/components/DisplayCard";
import {
  Calendar,
  Play,
  Users,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  Tv,
} from "lucide-react";

interface EpisodeProp {
  params: { episode: number };
}

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
}

let Episode = ({ params }: EpisodeProp) => {
  let [episode, setEpisode] = useState<EpisodeType | null>(null);
  let [characters, setCharacters] = useState<Character[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [charactersLoading, setCharactersLoading] = useState<boolean>(false);
  let [currentSlide, setCurrentSlide] = useState(0);

  let fetchEpisode = async () => {
    setError(null);
    setIsLoading(true);

    try {
      let response = await axios.get(`/episode/${params.episode}`);
      setEpisode(response.data);

      // Fetch characters if episode has character URLs
      if (response.data.characters && response.data.characters.length > 0) {
        await fetchCharacters(response.data.characters);
      }
    } catch (error) {
      setError("An error occurred while fetching episode details.");
    } finally {
      setIsLoading(false);
    }
  };

  let fetchCharacters = async (characterUrls: string[]) => {
    setCharactersLoading(true);
    try {
      // Extract character IDs from URLs
      let characterIds = characterUrls
        .map((url) => url.split("/").pop())
        .join(",");
      let response = await axios.get(`/character/${characterIds}`);

      // Handle both single character and multiple characters response
      let charactersData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setCharacters(charactersData);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setCharactersLoading(false);
    }
  };

  let formatEpisodeCode = (episodeCode: string) => {
    if (!episodeCode) return "";
    let match = episodeCode.match(/S(\d+)E(\d+)/);
    if (match) {
      return `Season ${parseInt(match[1])} • Episode ${parseInt(match[2])}`;
    }
    return episodeCode;
  };

  let nextSlide = () => {
    setCurrentSlide((prev) => (prev >= characters.length - 4 ? 0 : prev + 1));
  };

  let prevSlide = () => {
    setCurrentSlide((prev) =>
      prev <= 0 ? Math.max(0, characters.length - 4) : prev - 1
    );
  };

  useEffect(() => {
    fetchEpisode();
  }, [params.episode]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 text-center border border-red-200 dark:border-red-800">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
          <button
            onClick={fetchEpisode}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Loading episode details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent !text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 mb-8 px-4 py-2 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Episodes</span>
        </button>

        {/* Hero Section */}
        <section className="rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-200 dark:border-slate-700 bg-transparent">
          <div className="flex flex-col lg:flex-row">
            {/* Episode Image */}
            <div className="lg:w-1/3 relative">
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative overflow-hidden">
                <img
                  src="/images/rick_and_morty_cover.jpeg"
                  alt={episode?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm rounded-full p-3">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Episode Details */}
            <div className="lg:w-2/3 p-8 lg:p-12">
              <div className="space-y-6">
                {/* Episode Badge */}
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full flex items-center gap-2">
                    <Tv className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {formatEpisodeCode(episode?.episode || "")}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  {episode?.name}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Aired:</span>
                    <span>{episode?.air_date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Characters:</span>
                    <span>{characters.length}</span>
                  </div>
                </div>

                {/* Episode Code */}
                <div className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Episode Code
                    </span>
                  </div>
                  <span className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
                    {episode?.episode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Characters Section */}
        {characters.length > 0 && (
          <section className="rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-slate-700 bg-transparent">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-xl">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Characters in this Episode
                </h2>
              </div>

              {/* Carousel Controls */}
              {characters.length > 4 && (
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {charactersLoading ? (
              <div className="flex justify-center py-12">
                <div className="text-center">
                  <Loader />
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    Loading characters...
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out gap-6"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / 4)}%)`,
                  }}
                >
                  {characters.map((character) => (
                    <div
                      key={character.id}
                      className="flex-none w-1/4 min-w-[250px]"
                    >
                      <div className="transform hover:scale-105 transition-transform duration-200">
                        <DisplayCard
                          key={character.id}
                          name={character.name}
                          alt={character.name}
                          link={`/characters/${character.id}`}
                          image={character.image}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Character Count */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Showing {Math.min(4, characters.length)} of {characters.length}{" "}
                characters
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Episode;
