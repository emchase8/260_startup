import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Score } from './score/scoreboard';
import { Info } from './info/info';

export default function App() {
    return (
    <BrowserRouter>
        <div>
            <header>
                <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand">Hang Cheese</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="index.html">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="game.html">Game</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="scoreboard.html">Scoreboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="info.html">About</a>
                            </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
    
            <main>App components go here</main>
    
            <footer>
                <div className="footer_colors">Emily Chase <a href="https://github.com/emchase8/260_startup">Github</a></div>
            </footer>
        </div>
    </BrowserRouter>
    );
  }

export default function App() {
    return (
      <div>
        <header>
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Hang Cheese</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                          <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="index.html">Home</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="game.html">Game</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="scoreboard.html">Scoreboard</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="info.html">About</a>
                          </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
  
        <main>App components go here</main>
  
        <footer>
            <div className="footer_colors">Emily Chase <a href="https://github.com/emchase8/260_startup">Github</a></div>
        </footer>
      </div>
    );
  }