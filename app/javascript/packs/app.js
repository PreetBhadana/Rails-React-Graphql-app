import React, { useState } from 'react';
import UsersList from '../components/Users'; // Import your component that uses GraphQL
import Movies from './../components/Movies';

function App() {
  const [ loadPage, setLoadPage ] = useState('Users');
  return (
    <div className="App">
      <h1>Welcome to My GraphQL App</h1>
      <button className='cursor-pointer' onClick={() => setLoadPage('Users')}>Users</button> <button className='cursor-pointer'  onClick={() => setLoadPage('Movies')}>Movies</button>
      {loadPage == 'Users' && <UsersList />}
      {loadPage == 'Movies' && <Movies />}
    </div>
  );
}

export default App;
