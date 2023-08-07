import React, { Fragment, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import User from './single_user/user';

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
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { users } = data;

  return (
    <Fragment>
      {!userId && (
        <ul>
          {users.map((user) => (
            <li key={user.id}><a onClick={() => setUserId(user.id)}>{user.firstName}</a></li>
          ))}
        </ul>
      )}
      
      {(userId && userId !== '') && (
        <Fragment>
          <button onClick={() => setUserId(null)}>Back</button>
          <User userId={userId} />
        </Fragment>
      )}
    </Fragment>
  );
}

export default UsersList;
