import React, { Fragment } from 'react';
import { gql, useMutation } from '@apollo/client';

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      errors
    }
  }`

export default function EditUser(props){
  const { user, backToList } = props
  const [ UpdateUser, { loading, error, data } ] = useMutation(UPDATE_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const input = {
      id: user.id,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value
    }
    try {
      const response = await UpdateUser({ variables: { input } });
      console.log(response.data.updateUser);
      if(response.data?.updateUser?.errors?.length == 0){
        backToList()
      }
    } catch (error) {
      console.error(error)
    }

  }

  return(
    <Fragment>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
         <input type="text" name="firstName" placeholder="First Name" defaultValue={user.firstName}/>
         <input type="text" name="lastName" placeholder="Last Name" defaultValue={user.lastName}/>
         <input type="email" name="email" placeholder="Email" defaultValue={user.email}/>
         {/* Additional form fields */}
         <button type="submit" disabled={loading}>
           Update User
         </button>
         {error && <p>Error: {error.message}</p>}
       </form>
    </Fragment>
  )
}
