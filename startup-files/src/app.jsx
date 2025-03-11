import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Score } from './score/score';
import { Info } from './info/info';
import { AuthState } from './login/AuthState';

export default function App() {
    const [username, set_username] = React.useState(localStorage.getItem('username') || '');
    const curr_auth_state = username ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authstate, set_authstate] = React.useState(curr_auth_state);
    //make nav bar reactive to size
    return (
    <BrowserRouter>
        <div className="body">
            <header>
                <nav className="navbar bg-dark navbar-expand bg-body-tertiary" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Hang Cheese</a>
                        <div className="navbar-nav" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className='nav-link' to=''>
                                    Login
                                </NavLink>
                            </li>
                            {authstate === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className='nav-link' to='game'>
                                    Game
                                </NavLink>
                            </li>)}
                            {authstate === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className='nav-link' to='score'>
                                    Scoreboard
                                </NavLink>
                            </li>)}
                            <li className="nav-item">
                                <NavLink className='nav-link' to='info'>
                                    About
                                </NavLink>
                            </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
    
            <Routes>
                <Route 
                    path='/' 
                    element={
                        <Login 
                            username = {username}
                            authstate = {authstate}
                            on_auth_change = {(username, authstate) => {set_authstate(authstate), set_username(username)}}
                        />} 
                    exact 
                />
                <Route path='/game' element={<Game username = {username} />} />
                <Route path='/score' element={<Score />} />
                <Route path='/info' element={<Info />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
    
            <footer>
                <div className="footer_colors">Emily Chase <a href="https://github.com/emchase8/260_startup">Github</a></div>
            </footer>
        </div>
    </BrowserRouter>
    );
  }

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}