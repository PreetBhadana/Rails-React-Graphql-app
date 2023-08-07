import React, { Fragment } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      errors
    }
  }`

export default function CreateUser(props){
  const { backToList } = props
  const [ CreateUser, { loading, error, data } ] = useMutation(CREATE_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const input = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value
    }
    try {
      const response = await CreateUser({ variables: { input } });
      console.log(response.data.createUser);
      if(response.data?.createUser?.errors?.length == 0){
        backToList()
      }
    } catch (error) {
      console.error(error)
    }

  }

  return(
    <Fragment>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
         <input type="text" name="firstName" placeholder="First Name" />
         <input type="text" name="lastName" placeholder="Last Name" />
         <input type="email" name="email" placeholder="Email" />
         {/* Additional form fields */}
         <button type="submit" disabled={loading}>
           Create User
         </button>
         {error && <p>Error: {error.message}</p>}
       </form>
    </Fragment>
  )
}