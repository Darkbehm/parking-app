import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export const Landing: FC<{ isLogged: boolean }> = ({
  isLogged,
}: {
  isLogged: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center">
      {isLogged ? (
        <div className="flex flex-col min-w-[310px] md:w-1/2 px-64 justify-between gap-8">
          <Button
            type={"primary"}
            onClick={(event) => {
              event.preventDefault();
              navigate("/home");
            }}
          >
            Dashboard
          </Button>
        </div>
      ) : (
        <div className="flex flex-col min-w-[310px] md:w-1/2 px-64 justify-between gap-8">
          <Button
            type={"primary"}
            onClick={(event) => {
              event.preventDefault();
              navigate("/login");
            }}
          >
            Login
          </Button>
          <div className="text-center flex flex-col gap-2">
            <span className="text-gray-500">Don't have an account?</span>
            <Button
              type={"normal"}
              onClick={(event) => {
                event.preventDefault();
                // go to register page
                return navigate("/register");
              }}
            >
              Register
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
