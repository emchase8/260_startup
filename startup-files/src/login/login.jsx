import React from 'react';
import '../app.css';

export function Login() {
  return (
    <main className="container-fluid text-center">
      <h1>Welcome to Hang Cheese</h1>
      <form method="get" action="game.html">
          <div className="input-group mb-3">
              <span className="input-group-text">Email:</span>
              <input className="form-control" type="text" placeholder="your@email.com"/>
          </div>
          <div className="input-group mb-3">
              <span className="input-group-text">Password:</span>
              <input className="form-control" type="password" placeholder="password"/>
          </div>
          <button className="btn btn-warning" type="submit">Login</button>
          <button className="btn btn-secondary" type="submit">Create</button>
      </form>
    </main>
  );
}