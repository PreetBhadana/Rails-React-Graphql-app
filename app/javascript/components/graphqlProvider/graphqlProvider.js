import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export const withProvider = (WrappedComponent) => {
  return (
    <ApolloProvider client={client}>
      <WrappedComponent />
    </ApolloProvider>
  )
}