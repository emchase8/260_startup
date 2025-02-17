import React from 'react';
import Button from 'react-bootstrap/Button';
import './game.css';
import '../app.css';

export function Game() {
  return (
    <main className="container-fluid text-center">
      <div className="section">
          <div className="data guesses">Player: <span> Insert Player Name Here</span>
              <ul>
                  <li>DB/WebSocket update 1</li>
                  <li>DB/WebSocket update 2</li>
                  <li>DB/WebSocket update 3</li>
              </ul>
          </div>
          <br />
          <img src="starting_image.png" alt="game image" className="responsive"></img>
      </div>
      <br />
      <div className="section">
          <div className="guess guesses">Wrong Guesses
              <ul>
                  <li>Wrong guess one</li>
                  <li>Wrong guess two</li>
                  <li>Wrong guess three</li>
                  <li>Wrong guess four</li>
              </ul>
          </div>
          <div className="guess">
              <div className="input-group mb-3">
                  <span className="input-group-text">Guess: </span>
                  <input className="form-control" type="text" placeholder="type your guess here" />
              </div>
              <Button className="btn btn-warning" type="submit" style={{marginBottom: '1em'}}>Submit Guess</Button>
              <Button className="btn btn-secondary" type="submit">Restart Game</Button>
          </div>
          <div className="guess guesses">Word: <span className="word">__ __ __ __ __ __</span> (3rd party word generator will be used, if I can figure that out)</div>
      </div>
    </main>
  );
}