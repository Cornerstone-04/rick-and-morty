"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <header>
        <Link href="/" className="logo">
          <div className="w-fit p-2 bg-primary rounded">Rick</div>
          <div className="w-fit p-2 text-white">Morty</div>
        </Link>
      </header>
      <div className="flex gap-4 md:gap-16 items-center">
        <Link href="/characters" className="nav-link">
          Characters
        </Link>
        <Link href="/episodes" className="nav-link">
          Episodes
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
