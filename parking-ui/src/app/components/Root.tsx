import { ApolloProvider } from "@apollo/client";
import client from "../../graphql/apolloClient";
import { CookiesProvider } from "react-cookie";
import { Outlet } from "react-router-dom";
import { RootLayout } from "./RootLayout";

export default function Root() {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <RootLayout>
          <Outlet />
        </RootLayout>
      </ApolloProvider>
    </CookiesProvider>
  );
}
