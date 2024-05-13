import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative w-full min-h-screen overflow-y-auto bg-image bg-image-2">
      <div className="min-h-screen flex flex-col justify-start gap-[5rem] w-full bg-backdrop bg-opacity-60 bg:bg-opacity-40 backdrop-blur-[0.7px]">
        <section className="px-6 md:px-[7.5rem] pt-10 w-full">
          <Navbar />
        </section>
        <section className="px-6 md:px-[7.5rem] w-full max-w-fit flex flex-col items-start justify-center gap-6">
          {children}
        </section>
      </div>
    </main>
  );
};

export default Layout;
