import { FC, ReactElement } from "react";
import { Landing } from "./Landing";
import { Navbar } from "./Navbar";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

interface RootLayoutProps {
  children: ReactElement;
}
export const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  const Children = () => children;
  const location = useLocation();
  const [cookies] = useCookies();

  const isLogged =
    (cookies.accessToken && cookies.accessToken !== "undefined") ?? false;
  return (
    <div className="min-h-screen flex flex-col justify-between text-sky-900 font-sans">
      <Navbar isLogged={isLogged} />
      <div className="flex flex-1 flex-col">
        {location.pathname === "/" && <Landing isLogged={isLogged} />}
        <Children />
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
