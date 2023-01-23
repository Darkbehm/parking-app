import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import validator from "validator";

import { LOGIN } from "../services/mutations/login";
import Button from "./Button";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["accessToken"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [makeLogin, { error, loading }] = useMutation(LOGIN, {
    variables: {
      input: {
        email,
        password,
      },
    },
  });

  const [inputErrors, setInputErrors] = useState({
    email: "",
    password: "",
    quantity: 0,
  });

  const validateInputs = () => {
    const errors = {
      email: "",
      password: "",
      quantity: 0,
    };

    if (email.length === 0) {
      errors.email = "Email is required";
      errors.quantity++;
    } else if (!validator.isEmail(email)) {
      errors.email = "Email is not valid";
      errors.quantity++;
    }

    if (password.length === 0) {
      errors.password = "Password is required";
      errors.quantity++;
    }

    setInputErrors(errors);

    return errors.quantity === 0;
  };

  const handleSubmit = async () => {
    const response = await makeLogin();

    console.log(response);
    if (response.data) {
      setCookie("accessToken", response.data.login, {
        path: "/",
        maxAge: 3600,
      });
    }
  };

  useEffect(() => {
    if (email || password) {
      validateInputs();
    }
  }, [email, password]);

  return (
    <>
      {cookie.accessToken && cookie.accessToken !== "undefined" && (
        <Navigate
          to="/home"
          replace
        />
      )}
      {loading && (
        <div className="flex flex-col space-y-8 justify-center items-center md:mb-16">
          <h1 className="text-4xl p-1 text-center font-black bg-gradient-to-r from-sky-500 to-teal-300 text-transparent bg-clip-text pointer-events-none select-none py-16">
            Loading...
          </h1>
        </div>
      )}
      {!loading && (
        <div className="flex flex-col space-y-8 justify-center items-center md:mb-16">
          <h1 className="text-4xl p-1 text-center font-black bg-gradient-to-r from-sky-500 to-teal-300 text-transparent bg-clip-text pointer-events-none select-none py-16">
            Login
          </h1>
          <form className="flex flex-col min-w-[310px] md:w-1/2 gap-4">
            <div className="flex gap-4 items-center justify-between">
              <label
                htmlFor="email"
                className="font-semibold bg-gradient-to-r from-sky-500 to-teal-300 text-transparent bg-clip-text select-none text-xl"
              >
                Email:
              </label>
              <input
                className="w-[200px] md:w-3/4  border-2 border-gray-300 p-2 rounded-md shadow-md focus:outline-sky-500 focus:shadow-lg hover:shadow-lg hover:outline-sky-500 "
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateInputs();
                }}
              />
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label
                htmlFor="password"
                className="font-semibold bg-gradient-to-r from-sky-500 to-teal-300 text-transparent bg-clip-text select-none text-xl"
              >
                Password:
              </label>
              <input
                className="w-[200px] md:w-3/4 border-2 border-gray-300 p-2 rounded-md shadow-md focus:outline-sky-500 focus:shadow-lg hover:shadow-lg hover:outline-sky-500 "
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
          <div className="text-center">
            {inputErrors.quantity !== 0 &&
              Object.keys(inputErrors).map((key) => {
                // @ts-ignore
                if (key !== "quantity" && inputErrors[key]) {
                  return (
                    <p
                      className="text-red-500"
                      key={key}
                    >
                      {/* @ts-ignore */}
                      {inputErrors[key]}
                    </p>
                  );
                }
              })}
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
          <div className="flex flex-col min-w-[310px] md:w-1/2 px-64 justify-between gap-8">
            <Button
              type={"primary"}
              onClick={(event) => {
                event.preventDefault();
                handleSubmit();
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
                  return navigate("/register");
                }}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
