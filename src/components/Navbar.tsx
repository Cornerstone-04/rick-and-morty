"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Navigation {
  name: string;
  href: string;
}

let Navbar = () => {
  let pathName: string = usePathname();
  let navLinks: Navigation[] = [
    { name: "Characters", href: "/characters" },
    { name: "Episodes", href: "/episodes" },
  ];

  let isActive = (pathname: string): boolean => pathName.startsWith(pathname);

  return (
    <nav className="flex justify-between items-center">
      <header>
        <Link href="/" className="logo">
          <div className="w-fit p-2 bg-primary rounded">Rick</div>
          <div className="w-fit p-2 text-white">Morty</div>
        </Link>
      </header>
      <div className="flex gap-4 md:gap-16 items-center">
        {navLinks.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={`nav-link ${isActive(href) ? "active" : ""}`}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
