import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col justify-start gap-[7.5rem] w-full bg-bg-rm">
      <section className="px-[7.5rem] pt-10 ">
        <Navbar />
      </section>
      <section className="px-[7.5rem] w-full max-w-fit flex flex-col items-start justify-center gap-6">
        {children}
      </section>
    </main>
  );
};

export default Layout;
