import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <h1>Rick and Morty</h1>
      {children}
    </div>
  );
};

export default Layout;
