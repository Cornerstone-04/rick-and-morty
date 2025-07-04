"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Users,
  AlertCircle,
} from "lucide-react";
import DisplayCard from "@/components/DisplayCard";
import useCharacters from "@/hooks/useCharacters";
import { CardSkeleton } from "@/components/ui/card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Characters = () => {
  const { characters, page, totalPages, isLoading, error, fetchCharacters } =
    useCharacters();

  if (error) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200">
              Something went wrong
            </h2>
          </div>
          <p className="text-red-600 dark:text-red-300">{error}</p>
          <button
            onClick={() => fetchCharacters(page)}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Characters
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>
                Page {page} of {totalPages}
              </span>
              <span>•</span>
              <span>{characters.length} characters</span>
            </div>
          </div>

          {/* Top Pagination */}
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1 || isLoading}
              onClick={() => fetchCharacters(page - 1)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              disabled={page >= totalPages || isLoading}
              onClick={() => fetchCharacters(page + 1)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Characters */}
      <section className="min-h-[60vh] relative">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton className="w-full md:w-[300px] h-full md:h-[300px]" key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {characters.map(({ name, id, image }) => (
              <div
                key={id}
                className="transform hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md rounded-xl"
              >
                <DisplayCard
                  key={id}
                  name={name}
                  alt={name}
                  link={`/characters/${id}`}
                  image={image}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Pagination */}
      {characters.length > 0 && !isLoading && (
        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing page {page} of {totalPages}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchCharacters(1)}
                disabled={page === 1 || isLoading}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronsLeft className="w-4 h-4" />
                <span className="hidden sm:inline">First</span>
              </button>

              <button
                onClick={() => fetchCharacters(page - 1)}
                disabled={page === 1 || isLoading}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-medium">
                {page}
              </div>

              <button
                onClick={() => fetchCharacters(page + 1)}
                disabled={page >= totalPages || isLoading}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => fetchCharacters(totalPages)}
                disabled={page >= totalPages || isLoading}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span className="hidden sm:inline">Last</span>
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Characters;
