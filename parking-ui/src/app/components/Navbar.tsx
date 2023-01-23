import { FC } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

export const Navbar: FC<{ isLogged: boolean }> = ({
  isLogged,
}: {
  isLogged: boolean;
}) => {
  const removeCookies = useCookies()[2];
  return (
    <header className="z-10">
      <nav className="bg-gradient-to-br from-sky-500 to-teal-200 shadow-xl p-4 grid grid-cols-2 sm:px-16">
        <div className="flex items-center">
          <Link to={'/'}>
            <img
              src="/icon.svg"
              alt="logo"
              className="h-10 w-10 hover:scale-125 duration-500 cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex w-full justify-end gap-4 md:gap-16 items-center">
          {isLogged ? (
            <div className="block text-sky-700 font-semibold rounded md:border-0 hover:text-white ">
              <button
                onClick={() => {
                  console.log('logout');
                  removeCookies('accessToken');
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
                <Link to={'login'}>Login</Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
