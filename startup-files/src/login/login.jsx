import React from 'react';
import '../app.css';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './AuthState';

export function Login({ username, authstate, on_auth_change }) {
  return (
    <main className="container-fluid text-center">
      <div>
        {authstate !== AuthState.Unknown && <h1>Welcome to Hang Cheese</h1>}
        {authstate === AuthState.Authenticated && (
          <Authenticated username={username} onLogout={() => on_auth_change(username, AuthState.Unauthenticated)}/>)}
        {authstate === AuthState.Unauthenticated && (
          <Unauthenticated username={username} onLogin={(login_username) => {on_auth_change(login_username, AuthState.Authenticated)}}/>)}
      </div>
    </main>
  );
}