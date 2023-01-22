import "./App.css";
import { GET_VEHICLES_TYPES } from "./modules/vehicleType/services/queries";
import { useQuery } from "@apollo/client";
import { VehicleType } from "./modules/vehicleType/interfaces/vehicleType.interface";
import { useCookies } from "react-cookie/";
import { Login } from "./modules/app/components/login";
import { useEffect } from 'react';

function App() {
  const { data, error, loading } = useQuery(GET_VEHICLES_TYPES);

  useEffect(() => {
    data && console.log(data);
  }, [data]);
  return (
    <>
      <Login />
    </>
  );
}

export default App;
