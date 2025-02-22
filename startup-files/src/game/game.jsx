import React, { use, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './game.css';
import '../app.css';
import {Players} from './players'

export function Game(props) {
  // choose random word in const[word, setWord] thing that can be reset on reset but SHOULD NOT change otherwise
  
  const [image, setImage] = useState("starting_image.png"); //image updator
  const [current_guess, setCurrentGuess] = useState('');
  const [right_guesses, setRightGuesses] = useState([]); //all guesses
  const [wrong_guesses, setWrongGuesses] = useState([]); //wrong guesses
  const [word, setWord] = useState([]) //the actual word, need to set that somehow
  const [display_word, setDisplayWord] = useState("__ __ __ __ __ __")

  function handleWrongGuess() {
    if (wrong_guesses.length == 1) {
      setImage("one_wrong.png");
    } else if (wrong_guesses.length == 2) {
      setImage("two_wrong.png");
    } else if (wrong_guesses.length == 3) {
      setImage("three_wrong.png");
    } else if (wrong_guesses.length == 4) {
      setImage("four_wrong.png");
    } else {
      setImage("last_guess.png");
    }
  }

  async function reset() {
    setImage("starting_image.png");
    setCurrentGuess('');
    setRightGuesses([]);
    setWrongGuesses([]);
    //call a new random word
    setDisplayWord("__ __ __ __ __ __");
  }

  async function handle_guess() {
    if (word.includes(current_guess)) {
      right_guesses.push(current_guess);
      //somehow print out updated word, check if word has been completed
    } else {
      wrong_guesses.push(current_guess);
      handleWrongGuess();
    }
  }
  
  // main game written by chat
  // async function handleGuess() {
  //   if (word.includes(currentGuess)) {
  //     // If the guess is correct, update right guesses
  //     setRightGuesses((prev) => [...prev, currentGuess]);

  //     // Update the displayed word (e.g., replace blanks with the correct letter)
  //     let newDisplayedWord = displayedWord.split(' ');
  //     for (let i = 0; i < word.length; i++) {
  //       if (word[i] === currentGuess) {
  //         newDisplayedWord[i] = currentGuess;
  //       }
  //     }
  //     setDisplayedWord(newDisplayedWord.join(' '));

  //     // Check if the word is complete
  //     if (newDisplayedWord.join('') === word) {
  //       console.log('You have completed the word!');
  //       // Optionally show a message or reset the game here
  //     }

  //   } else {
  //     // If the guess is incorrect, update wrong guesses and handle the wrong guess logic
  //     setWrongGuesses((prev) => [...prev, currentGuess]);
  //     handleWrongGuess();
  //   }

  //   setCurrentGuess(''); // Clear the input after the guess
  // }


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
                  {wrong_guesses.map((w_guess, index) => (<li key = {index}>{w_guess}</li>))}
              </ul>
          </div>
          <div className="guess">
              <div className="input-group mb-3">
                  <span className="input-group-text">Guess: </span>
                  <input className="form-control" type="text" onChange={(e) => setCurrentGuess(e.target.value)} placeholder="type your guess here" />
              </div>
              {/* follow same pattern as login to catch input and use it */}
              <Button className="btn btn-warning" type="submit" style={{marginBottom: '1em'}} onClick={() => handle_guess()}>Submit Guess</Button>
              {/* how the heck do i do this? probably just a function to reset everything to be above*/}
              <Button className="btn btn-secondary" type="submit" onClick={() => reset()} disabled={wrong_guesses.length = 0}>Restart Game</Button>
          </div>
          {/* function to update word will be above */}
          <div className="guess guesses">Word: <span className="word">{display_word}</span> (3rd party word generator will be used, if I can figure that out)</div>
      </div>
    </main>
  );
}