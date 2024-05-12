import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <Link href={"/"} className="logo">
        <div className="w-fit p-2 bg-primary rounded">Rick</div>
        <div className="w-fit p-2 text-white">Morty</div>
      </Link>
      <div className="flex gap-16">
        <Link href={"/characters"} className="nav-link">Characters</Link>
        <Link href={"/episodes"} className="nav-link">Episodes</Link>
      </div>
    </nav>
  );
};

export default Navbar;
