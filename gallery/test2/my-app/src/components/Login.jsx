import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === 'admin' && password === 'password123') {
      alert('Login successful!');
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form className='box' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='back-btn' type="submit">Login</button>
          </form>
          <p>one of the built tools we are using is vite npm create veet to initiale a new react aplication that coms witha pre build template vite is the bes tif u used another tools
              we talked about json package json node it s run tim eveironemt for js script so we can run js script outisde of the browesett
              acge jason has
          </p>
          <p>spas 
              single page Application 
              webb consisten of 1 html document 
              and to really how can i brnach out of this topic
              what happening in <main className="jsx">when we get a elemant and past it to a alement creat root in react library then i call root . render 
                  \what happening here what the run of createroot ? 
                  
              </main>
      </p>
      <p></p>
    </div>
  );
}

export default Login;
