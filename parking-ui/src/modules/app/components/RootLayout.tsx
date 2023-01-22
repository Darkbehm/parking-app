import { FC, ReactElement } from "react";
import { Navbar } from "./Navbar";

interface RootLayoutProps {
  children: ReactElement;
}
export const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-cyan-100 text-sky-900 font-sans">
      <Navbar />
      <div className="flex flex-col flex-1 space-y-4 md:flex-row md:space-x-4 md:space-y-0 items-center justify-center">
        <main className="md:w-3/4 lg:w-5/6 px-5">{children}</main>
      </div>

      <footer className="bg-gradient-to-tl from-sky-500 to-teal-200 shadow-[0_0_60px_-5px_rgba(0,0,0,0.5)] mt-auto flex p-5 items-center justify-center">
        <div className="text-l">
          <span>Coded by </span>
          <a
            href="https://github.com/Darkbehm"
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:text-white duration-75"
          >
            Billy Enrique Herculano Madrid
          </a>
        </div>
      </footer>
    </div>
  );
};
