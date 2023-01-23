import { useQuery } from "@apollo/client";
import { LayoutWithOptions } from "../components/LayoutWithOptions";
import { IS_ADMIN } from "../services/queries/getUser";

export const Dashboard = () => {
  const { data, error, loading } = useQuery(IS_ADMIN, {
    // for disabling cache
    fetchPolicy: "network-only",
  });
  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl p-1 text-center font-black bg-gradient-to-r from-sky-500 to-teal-300 text-transparent bg-clip-text pointer-events-none select-none py-16">
            Loading...
          </h1>
        </div>
      ) : (
        !error && <LayoutWithOptions role={data?.me?.isAdmin && "admin"} />
      )}
      {error && (
        <div className="flex flex-col space-y-8 justify-center items-center md:mb-16">
          <h2 className="text-4xl p-1 text-center font-black bg-gradient-to-r from-sky-500 to-teal-300 text-transparent bg-clip-text pointer-events-none select-none py-16">
            Error
          </h2>
        </div>
      )}
    </>
  );
};
