// import Image from "next/image";
import Link from "next/link";
import React from "react";

interface DisplayCardProps {
  key: number;
  image: string;
  alt: string;
  link: string;
  name: string;
  subtitle?: string;
}

const DisplayCard = ({
  key,
  image,
  alt,
  link,
  name,
  subtitle,
}: DisplayCardProps) => {
  return (
    <div
      key={key}
      className="w-full md:w-[300px] h-full md:h-[300px] character-image cursor-pointer hover:scale-[1.06] md:hover:scale-[1.1] transition-all ease-linear relative"
    >
      <img src={image} alt={alt} className="" />
      <div className="w-full h-full image-overlay">
        <Link href={link!} className="image-name">
          <em className="text-sm text-mid-white">{subtitle}</em>
          <h2>{name}</h2>
        </Link>
      </div>
    </div>
  );
};

export default DisplayCard;
