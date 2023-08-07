import React from "react";
import { gql, useQuery } from '@apollo/client';

const GET_MOVIES = gql`
  query GetUsers {
    movies {
      id
      title
      year
    }
  }
`;

export default function Movies (){
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return(
    <ul>
      {data.movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  )
}