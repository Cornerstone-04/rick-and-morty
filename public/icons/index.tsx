import Arrow from "./arrow-left.svg";

type NavProps = {
  className: string;
};

const NavArrow = ({ className }: NavProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 48 48"
      fill="none"
      className={`${className} hover:opacity-75 hover:scale-[1.1] cursor-pointer transition-all ease-linear`}
    >
      <circle
        cx="24"
        cy="24"
        r="23.5"
        transform="rotate(-90 24 24)"
        stroke="#FFFFFF"
        
      />
      <path
        d="M38.3999 24L10.0799 24M10.0799 24C13.9199 24 21.5999 21.696 21.5999 12.48M10.0799 24C13.9199 24.16 21.5999 26.688 21.5999 35.52"
        stroke="#FFFFFF"
        strokeWidth="3"
      />
    </svg>
  );
};

export { Arrow, NavArrow };
