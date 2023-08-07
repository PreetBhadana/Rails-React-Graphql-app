import React from "react";
import { gql, useQuery } from '@apollo/client';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      firstName
      email
    }
  }
`;

export default function User(props) {
  const { userId } = props
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;
  return (
    <ul>
      <li>{user.id}</li>
      <li>{user.firstName}</li>
      <li>{user.email}</li>
    </ul>
  )
}