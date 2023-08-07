import React, { Fragment, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import EditMovie from './../edit_movie/edit_movie';
const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      id
      title
      year
      genre
      userId
    }
  }
`; 

const DELETE_MOVIE = gql`
  mutation DeleteMovie($input: DeleteMovieInput!) {
    deleteMovie(input: $input) {
      errors
    }
  }`

export default function Movie(props){
  const { movieId, backToList } = props
  const [ editMovie, setEditMovie ] = useState(false);
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: movieId },
  });
  const [deleteMovie, {}] = useMutation(DELETE_MOVIE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  const movie = data.movie

  const processDeleteMovie = async (e) => {
    e.preventDefault();
    setEditMovie(false);
    try {
      const response = await deleteMovie({ variables: { input: { id: movieId } } });
      console.log(response.data.deleteMovie);
      if(response.data?.deleteMovie?.errors?.length == 0){
        backToList()
      } // Access the updated movie data
    } catch (error) {
      console.error(error);
    }
  }
  return(
    <Fragment>
      {editMovie && (
        <Fragment>
          <button onClick={() => setEditMovie(false)}>Cancel Editing</button>
          <EditMovie movie={movie} backToList={() => setEditMovie(false)}/>
        </Fragment>
      )}
      {!editMovie && (
        <Fragment>
          <ul>
            <li>{movie.id}</li>
            <li>{movie.title}</li>
            <li>{movie.year}</li>
          </ul>
          <button onClick={() => setEditMovie(true)}>Edit</button>
          <button onClick={(e) => processDeleteMovie(e)}>Delete</button>
        </Fragment>
      )}
    </Fragment>
  )
}