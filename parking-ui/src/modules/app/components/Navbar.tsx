import { FC } from "react";
import { useCookies } from "react-cookie";
import { Link, Navigate } from "react-router-dom";

export const Navbar: FC = () => {
  const [cookies, _, removeCookies] = useCookies();

  const isLogged = cookies.accessToken && cookies.accessToken !== "undefined";

  return (
    <header>
      <nav className="bg-gradient-to-br from-sky-500 to-teal-200 shadow-xl p-4 grid grid-cols-2 sm:px-16">
        <button
          className="text-xl flex text-sky-900 transition-all hover:text-white font-extrabold"
          onClick={() => {
            return (
              <Navigate
                to="/"
                replace
              />
            );
          }}
        >
          Parcking App
        </button>
        <div className="flex w-full justify-end gap-4 md:gap-16">
          {isLogged ? (
            <div className="block text-sky-700 font-semibold rounded md:border-0 hover:text-white ">
              <button
                onClick={() => {
                  removeCookies("accessToken");
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              {/* <div className="block text-sky-700 font-semibold rounded hover:bg-gray-100 hover:bg-transparent md:border-0 hover:text-white ">
                <Link to={"register"}>Register</Link>
              </div> */}
              <div className="block text-sky-700 font-semibold rounded hover:bg-gray-100 hover:bg-transparent md:border-0 hover:text-white ">
                <Link to={"login"}>Login</Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
