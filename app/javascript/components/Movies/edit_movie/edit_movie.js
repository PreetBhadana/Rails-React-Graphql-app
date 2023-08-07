import React, { Fragment } from 'react';
import { gql, useMutation } from '@apollo/client';
const CREATE_USER = gql`
  mutation UpdateMovie($input: UpdateMovieInput!) {
    updateMovie(input: $input) {
      errors
    }
  }
`;

export default function EditMovie(props){
  const { movie, backToList } = props
  const [updateMovie, { loading, error, data }] = useMutation(CREATE_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const input = {
      id: movie.id,
      title: event.target.title.value,
      genre: event.target.genre.value,
      year: parseInt(event.target.year.value),
      userId: parseInt(event.target.user_id.value)
    };

    try {
      const response = await updateMovie({ variables: { input } });
      console.log(response.data.updateMovie);
      if(response.data?.updateMovie?.errors?.length == 0){
        backToList()
      } // Access the updated movie data
    } catch (error) {
      console.error(error);
    }
  };


  return(
    <Fragment>
      <h1>Edit Movie</h1>
      <form onSubmit={handleSubmit}>
         <input type="text" name="title" placeholder="Title" defaultValue={movie.title} />
         <input type="text" name="genre" placeholder="Genre" defaultValue={movie.genre}/>
         <input type="number" name="year" placeholder="Year" defaultValue={movie.year}/>
         <input type="number" name="user_id" placeholder="User id" defaultValue={movie.userId}/>
         {/* Additional form fields */}
         <button type="submit" disabled={loading}>
           Update Movie
         </button>
         {error && <p>Error: {error.message}</p>}
       </form>
    </Fragment>
  )
}