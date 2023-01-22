import "./App.css";
import { GET_VEHICLES_TYPES } from "./modules/vehicleType/services/queries";
import { useQuery } from "@apollo/client";
import { VehicleType } from "./modules/vehicleType/interfaces/vehicleType.interface";

function App() {
  const { data, error, loading } = useQuery(GET_VEHICLES_TYPES);

  return (
    <div className="h-screen flex flex-col justify-evenly text-center">
      <div>
        <div>
          <span className="text-3xl font-bold">Parking UI</span>
        </div>
        <div>Testing the parking-api with the parking-ui</div>
      </div>
      {loading && (
        <div>
          <span className="text-3xl font-bold">init config</span>
        </div>
      )}
      {error && (
        <div>
          <span className="text-3xl font-bold">error</span>
        </div>
      )}
      {data && (
        <div>
          {data.vehicleTypes.map((vehicleType: VehicleType) => (
            <div
              className="text-3xl font-bold"
              key={vehicleType._id}
            >
              <div>
                {vehicleType.type} {vehicleType.price}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
