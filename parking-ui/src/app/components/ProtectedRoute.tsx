import { useCookies } from "react-cookie/";
import { Navigate } from "react-router-dom";
import { ReactElement } from "react";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const [cookies] = useCookies();

  return !cookies.accessToken || cookies.accessToken === "undefined" ? (
    <Navigate
      to="/login"
      replace
    /> 
  ) : (
    children
  );
};
