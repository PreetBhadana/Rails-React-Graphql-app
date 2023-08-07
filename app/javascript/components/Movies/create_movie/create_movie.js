import React, { Fragment } from 'react';
import { gql, useMutation } from '@apollo/client';
const CREATE_MOVIE = gql`
  mutation CreateMovie($input: CreateMovieInput!) {
    createMovie(input: $input) {
      errors
    }
  }
`;

export default function CreateMovie(props){
  const { backToList } = props
  const [createMovie, { loading, error, data }] = useMutation(CREATE_MOVIE);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const input = {
      title: event.target.title.value,
      genre: event.target.genre.value,
      year: parseInt(event.target.year.value),
      userId: parseInt(event.target.user_id.value)
    };

    try {
      const response = await createMovie({ variables: { input } });
      console.log(response.data.createMovie);
      if(response.data?.createMovie?.errors?.length == 0){
        backToList()
      } // Access the created movie data
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <Fragment>
      <h1>Create Movie</h1>
      <form onSubmit={handleSubmit}>
         <input type="text" name="title" placeholder="Title" />
         <input type="text" name="genre" placeholder="Genre" />
         <input type="number" name="year" placeholder="Year" />
         <input type="number" name="user_id" placeholder="User id" />
         {/* Additional form fields */}
         <button type="submit" disabled={loading}>
           Create Movie
         </button>
         {error && <p>Error: {error.message}</p>}
       </form>
    </Fragment>
  )
}