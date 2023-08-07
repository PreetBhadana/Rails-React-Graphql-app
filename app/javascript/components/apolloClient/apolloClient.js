import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const csrfToken = document.querySelector('meta[name=csrf-token]').content;
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Replace with your GraphQL server endpoint
  link: new HttpLink({
    credentials: 'same-origin',
    headers: {
      'X-CSRF-Token': csrfToken,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;