import React, { use, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './game.css';
import '../app.css';
import {Players} from './players';
import {GameEvent, GameNotify} from './GameNotify';

export function Game(props) {
  const word_choices = ['ACCEPT', 'BRIDGE', 'CHANCE', 'DURING', 'EITHER', 'FABRIC', 'GAINED', 'HACKED', 'IGLOOS', 'JABBED', 'KABALA', 'LABELS', 'MACAWS', 'NACHOS', 'OBLIGE', 'PACIFY', 'QUAILS', 'RAFTER', 'SABBAT', 'TABLES', 'UGLIER', 'VACANT', 'WACKOS', 'XENIAL', 'YACHTS', 'ZAFFER']
  
  function choose_word(word_choices) {
    const i = Math.floor(Math.random() * word_choices.length);
    const choosen_word = word_choices[i];
    const letter_list = [];
    for (let j = 0; j < choosen_word.length; j++) {
      letter_list.push(choosen_word[j])
    }
    return letter_list
  }

  const [image, setImage] = useState("new_starting_image.png"); 
  const [current_guess, setCurrentGuess] = useState('');
  const [right_guesses, setRightGuesses] = useState([]); 
  const [wrong_guesses, setWrongGuesses] = useState([]); 
  const [word, setWord] = useState(choose_word(word_choices)) 
  const [display_word, setDisplayWord] = useState("__ __ __ __ __ __")
  const [updated_word, setUpdatedWord] = useState(display_word);
  //SCORES WOMAN, FIGURE OUT HOW THOSE WORK

  async function reset() {
    setImage("new_starting_image.png");
    setCurrentGuess('');
    setRightGuesses([]);
    setWrongGuesses([]);
    setWord(choose_word(word_choices));
    setDisplayWord("__ __ __ __ __ __");
  }

  async function handle_guess() {
    if (word.includes(current_guess.toUpperCase())) {
      setRightGuesses((prev) => [...prev, current_guess.toUpperCase()]);
      let new_display_word = display_word.split(' ')
      for (let i = 0; i < word.length; i++) {
        if (word[i] === current_guess.toUpperCase()) {
          new_display_word[i] = current_guess.toUpperCase();
        }
      }
      const updated_word = new_display_word.join(' ');
      setDisplayWord(updated_word);
      setUpdatedWord(updated_word);
      if (!updated_word.includes('__')) {
        console.log('you won!');
        setImage('you_won.png');
      }
    } else if (current_guess != '') {
      setWrongGuesses((prev) => 
        {const temp_guesses = [...prev, current_guess.toUpperCase()]; 
          handleWrongGuess(temp_guesses); 
          return temp_guesses});
    }
    setCurrentGuess('');
  }

  async function handleWrongGuess(wrong_guesses) {
    console.log(wrong_guesses.length);
    if (wrong_guesses.length === 1) {
      setImage("one_wrong.png");
    } else if (wrong_guesses.length === 2) {
      setImage("two_wrong.png");
    } else if (wrong_guesses.length === 3) {
      setImage("three_wrong.png");
    } else if (wrong_guesses.length === 4) {
      setImage("four_wrong.png");
    } else if (wrong_guesses.length > 4) {
      setImage("last_guess.png");
    }
  }

  return (
    <main className="container-fluid text-center">
      <div className="section">
          <Players username={props.username}/>
          <br />
          <img src={image} alt="game image" className="responsive"></img>
      </div>
      <br />
      <div className="section">
          <div className="guess guesses">Wrong Guesses
              <ul>
                  {wrong_guesses.map((w_guess, index) => (<li key = {index}>{w_guess}</li>))}
              </ul>
          </div>
          <div className="guess">
              <div className="input-group mb-3">
                  <span className="input-group-text">Guess: </span>
                  <input className="form-control" type="text" value={current_guess} onChange={(e) => setCurrentGuess(e.target.value)} placeholder="type your guess here" />
              </div>
              <Button className="btn btn-warning" type="submit" style={{marginBottom: '1em'}} onClick={() => handle_guess()} disabled={!updated_word.includes('__')}>Submit Guess</Button>
              <Button className="btn btn-secondary" type="submit" onClick={() => reset()} disabled={!wrong_guesses.length || !right_guesses.length}>Restart Game</Button>
          </div>
          <div className="guess guesses">Word: <span className="word">{display_word}</span> (3rd party word generator will be used, if I can figure that out)</div>
      </div>
    </main>
  );
}