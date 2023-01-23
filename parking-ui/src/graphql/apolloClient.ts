import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_GRAPHQL_URL || 'http://localhost:4000/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});

export default client;
