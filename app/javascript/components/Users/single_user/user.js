import React, { Fragment, useState } from "react";
import { gql, useQuery, useMutation } from '@apollo/client';
import EditUser from './../editUser/editUser';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      movies {
        id
        title
        year
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      errors
    }
  }`

export default function User(props) {
  const { userId, backToList, userUpdated } = props
  const [ editUser, setEditUser ] = useState(false);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });
  const [deleteUser, {}] = useMutation(DELETE_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;
  
  const handleBackToList = () => {
    setEditUser(false);
    userUpdated()
  }

  const processDeleteUser = async (e) => {
    e.preventDefault();
    setEditUser(false);
    try {
      const response = await deleteUser({ variables: { input: { id: userId } } });
      console.log(response.data.deleteUser);
      if(response.data?.deleteUser?.errors?.length == 0){
        userUpdated()
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Fragment>
      {(!editUser) && (
        <Fragment>
          <ul>
            <li>Id: {user.id}</li>
            <li>Fist Name: {user.firstName}</li>
            <li>Last Name: {user.lastName}</li>
            <li>Email: {user.email}</li>
            {user?.movies?.length > 0 &&
              <li>Movies:
                <ol>
                  {user.movies.map((movie) => (
                    <li key={movie.id}>Id: {movie.id},Title: {movie.title}, Year: {movie.year}</li>
                  ))}
                </ol>
              </li>
            }
          </ul>
          <button onClick={() => setEditUser(true)}>Edit</button>
          <button onClick={(e) => processDeleteUser(e)}>Delete</button>
        </Fragment>
      )}
      {(editUser) && (
        <Fragment>
          <button onClick={() => setEditUser(false)}>Cancel Editing User</button>
          <EditUser user={user} backToList={handleBackToList}/>
        </Fragment>
      )}
    </Fragment>
  )
}