import React, { use, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './game.css';
import '../app.css';
import {Players} from './players'

export function Game(props) {
  // choose random word in const[word, setWord] thing that can be reset on reset but SHOULD NOT change otherwise
  
  const [image, setImage] = useState("starting_image.png"); //image updator
  const [guess, setGuess] = useState([]); //all guesses
  const [wrong_guess, setWrongGuess] = useState([]); //wrong guesses

  const handleStepUp = (event) => [
    setImage(image++)  //have js to also update wrong_guesses and if statement to change image?
  ]
  

  return (
    <main className="container-fluid text-center">
      <div className="section">
          <Players username={props.username}/>
          <br />
          {/* image now reactive */}
          <img src={{image}} alt="game image" className="responsive"></img> 
      </div>
      <br />
      <div className="section">
          {/* function to update wrong list to be above */}
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
              {/* follow same pattern as login to catch input and use it */}
              <Button className="btn btn-warning" type="submit" style={{marginBottom: '1em'}}>Submit Guess</Button>
              {/* how the heck do i do this? probably just a function to reset everything to be above*/}
              <Button className="btn btn-secondary" type="submit">Restart Game</Button>
          </div>
          {/* function to update word will be above */}
          <div className="guess guesses">Word: <span className="word">__ __ __ __ __ __</span> (3rd party word generator will be used, if I can figure that out)</div>
      </div>
    </main>
  );
}