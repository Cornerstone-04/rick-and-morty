"use client";
import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { CharacterType } from "./type";
import Loader from "@/components/loader/Loader";
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Globe, 
  Heart, 
  Skull, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Play,
  Calendar,
  Tv,
  AlertCircle
} from "lucide-react";

interface CharacterProps {
  params: { character: number };
}

interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  url: string;
}

let Character = ({ params }: CharacterProps) => {
  let [character, setCharacter] = useState<CharacterType | null>(null);
  let [episodes, setEpisodes] = useState<Episode[]>([]);
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [episodesLoading, setEpisodesLoading] = useState<boolean>(false);
  let [error, setError] = useState<string | undefined>(undefined);
  let [currentSlide, setCurrentSlide] = useState(0);

  let fetchCharacter = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      let response = await axios.get(`/character/${params.character}`);
      setCharacter(response.data);
      
      // Fetch episodes if character has episode URLs
      if (response.data.episode && response.data.episode.length > 0) {
        await fetchEpisodes(response.data.episode);
      }
    } catch (error) {
      setError("An error occurred while fetching character details.");
    } finally {
      setIsLoading(false);
    }
  };

  let fetchEpisodes = async (episodeUrls: string[]) => {
    setEpisodesLoading(true);
    try {
      // Extract episode IDs from URLs
      let episodeIds = episodeUrls.map(url => url.split('/').pop()).join(',');
      let response = await axios.get(`/episode/${episodeIds}`);
      
      // Handle both single episode and multiple episodes response
      let episodesData = Array.isArray(response.data) ? response.data : [response.data];
      setEpisodes(episodesData);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    } finally {
      setEpisodesLoading(false);
    }
  };

  let getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', icon: Heart };
      case 'dead':
        return { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', icon: Skull };
      default:
        return { color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-700/30', icon: HelpCircle };
    }
  };

  let formatEpisodeCode = (episodeCode: string) => {
    if (!episodeCode) return '';
    let match = episodeCode.match(/S(\d+)E(\d+)/);
    if (match) {
      return `S${match[1]} E${match[2]}`;
    }
    return episodeCode;
  };

  let nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= episodes.length - 3 ? 0 : prev + 1
    );
  };

  let prevSlide = () => {
    setCurrentSlide((prev) => 
      prev <= 0 ? Math.max(0, episodes.length - 3) : prev - 1
    );
  };

  useEffect(() => {
    fetchCharacter();
  }, [params.character]);

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
            Character Not Found
          </h2>
          <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
          <button
            onClick={fetchCharacter}
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
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading character details...</p>
        </div>
      </div>
    );
  }

  let statusConfig = getStatusConfig(character?.status || '');
  let StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 mb-8 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Characters</span>
        </button>

        {/* Character Profile Section */}
        <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className="flex flex-col lg:flex-row">
            {/* Character Image */}
            <div className="lg:w-2/5 relative">
              <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
                <img
                  src={character?.image}
                  alt={character?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`${statusConfig.bg} backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2`}>
                    <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                    <span className={`text-sm font-medium ${statusConfig.color}`}>
                      {character?.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Character Details */}
            <div className="lg:w-3/5 p-8 lg:p-12">
              <div className="space-y-8">
                {/* Name and Basic Info */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                    {character?.name}
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                      {character?.species}
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                      {character?.gender}
                    </span>
                  </div>
                </div>

                {/* Character Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Origin */}
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                        <Globe className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">Origin</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      {character?.origin?.name || 'Unknown'}
                    </p>
                  </div>

                  {/* Current Location */}
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">Location</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      {character?.location?.name || 'Unknown'}
                    </p>
                  </div>
                </div>

                {/* Episode Count */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                      <Tv className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">Featured in</span>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {episodes.length} {episodes.length === 1 ? 'Episode' : 'Episodes'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Episodes Section */}
        {episodes.length > 0 && (
          <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-xl">
                  <Play className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Featured Episodes
                </h2>
              </div>
              
              {/* Carousel Controls */}
              {episodes.length > 3 && (
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

            {episodesLoading ? (
              <div className="flex justify-center py-12">
                <div className="text-center">
                  <Loader />
                  <p className="mt-4 text-gray-500 dark:text-gray-400">Loading episodes...</p>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out gap-6"
                  style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
                >
                  {episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="flex-none w-1/3 min-w-[300px]"
                    >
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                            <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                              {formatEpisodeCode(episode.episode)}
                            </span>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg">
                              <Play className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2">
                          {episode.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{episode.air_date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Episode Count */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Showing {Math.min(3, episodes.length)} of {episodes.length} episodes
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Character;