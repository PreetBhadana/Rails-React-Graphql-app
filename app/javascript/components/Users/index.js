import React, { Fragment, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import User from './single_user/user';
import CreateUser from './createUser/createUser';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      email
    }
  }
`;

function UsersList() {
  const [ userId, setUserId ] = useState(null);
  const [ addUser, setAddUser ] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { users } = data;

  const handleRefresh = () => {
    refetch(); // Call the refetch function to execute the query again
  };

  const backToList = () => {
    setUserId(null);
    setAddUser(false);
  }

  const userUpdated = () => {
    setUserId(null);
    handleRefresh()
  }

  const userAdded = () => {
    setAddUser(false);
    handleRefresh()
  }

  return (
    <Fragment>
      {(!addUser && !userId) && (
        <Fragment>
          <ul>
            {users.map((user) => (
              <li key={user.id}><a onClick={() => setUserId(user.id)}>{user.firstName}</a></li>
            ))}
          </ul>
          <button onClick={() => setAddUser(true)}>+ Add User</button>
        </Fragment>
      )}
      {(addUser && !userId) && (
        <Fragment>
          <button onClick={() => setAddUser(false)}>Cancel Adding User</button>
          <CreateUser backToList={userAdded}/>
        </Fragment>
      )}
      {(!addUser &&(userId && userId !== '')) && (
        <Fragment>
          <button onClick={() => setUserId(null)}>Back</button>
          <User userId={userId} backToList={backToList} userUpdated={userUpdated}/>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UsersList;
