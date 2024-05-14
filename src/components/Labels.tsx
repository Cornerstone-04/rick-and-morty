import Link from "next/link";
import React from "react";

let Labels = () => {
  return (
    <div className="text-xs flex gap-2 items-center text-mid-white cursor-pointer">
      <Link
        href="https://www.imdb.com/title/tt2861424/"
        className="bg-yellow-500 p-1 rounded font-black text-black transition-all ease-linear hover:scale-[1.05] focus:scale-[1.05]"
      >
        IMDb
      </Link>{" "}
      <span>9.1 (603k)</span>
      <span>|</span>
      <span>2013</span>
      <span>|</span>
      <span>Animation</span>
      <span>|</span>
      <Link
        href="https://www.imdb.com/title/tt2861424/episodes/"
        className="transition-all ease-linear hover:text-white focus:text-white hover:scale-[1.05]"
      >
        7 Seasons
      </Link>
    </div>
  );
};

export default Labels;
