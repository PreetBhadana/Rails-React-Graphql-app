import React, { Fragment, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import Movie from './single_movie/movie';
import CreateMovie from "./create_movie/create_movie";

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
  const [ movieId, setMovieId ] = useState(null);
  const [ addMovie, setAddMovie ] = useState(false);
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { movies } = data;

  const backToList = () => {
    setMovieId(null);
    setAddMovie(false);
  }
  return(
    <Fragment>
      {(!movieId && !addMovie) && (
        <Fragment>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}><a onClick={() => setMovieId(movie.id)}>{movie.title}</a></li>
            ))}
          </ul>
          <button onClick={() => setAddMovie(true)}>+ Add Movie</button>
        </Fragment>
      )}
      {(addMovie && !movieId) && (
        <Fragment>
          <button onClick={() => setAddMovie(false)}>Cancle Adding user</button>
          <CreateMovie backToList={backToList}/>
        </Fragment>
      )}
      {(!addMovie && (movieId && movieId !== '')) && (
        <Fragment>
          <button onClick={() => setMovieId(null)}>Back</button>
          <Movie movieId={movieId} backToList={backToList}/>
        </Fragment>
      )}
    </Fragment>
  )
}