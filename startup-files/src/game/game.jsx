import React, { use, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './game.css';
import '../app.css';
import {Players} from './players';
import {GameEvent, GameNotify} from './GameNotify';

export function Game(props) {
  const user_name = props.username
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
  // use effect for setting initial word? for 3rd party api call?
  const [word, setWord] = useState(choose_word(word_choices)); 
  const [display_word, setDisplayWord] = useState("__ __ __ __ __ __");
  const [updated_word, setUpdatedWord] = useState(display_word);

  async function reset() {
    setImage("new_starting_image.png");
    setCurrentGuess('');
    setRightGuesses([]);
    setWrongGuesses([]);
    setWord(choose_word(word_choices));
    setDisplayWord("__ __ __ __ __ __");
    setUpdatedWord("__ __ __ __ __ __");
    GameNotify.broadcastEvent(user_name, GameEvent.Start, {});
  }
  // make it so you can't guess the same letter, should also cap score
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
      //make image different if you guessed word but mouse got the cheese
      if (!updated_word.includes('__')) {
        console.log('you won!');
        setImage('you_won.png');
        save_score((right_guesses.length + wrong_guesses.length));
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

  async function save_score(winning_score) {
    const date = new Date().toLocaleDateString();
    const new_score = {name: user_name, score: winning_score, date: date};
    await fetch('/api/score', {
      method: 'POST', 
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(new_score),
    });
    GameNotify.broadcastEvent(user_name, GameEvent.End, new_score);
    // update_local_scoreboard(new_score);
  }
  // if scores are equal, later date should take precidence? so first is always up for grabs
  // function update_local_scoreboard(new_score) {
  //   let scores = [];
  //   const score_text = localStorage.getItem('scores');
  //   if (score_text) {
  //     scores = JSON.parse(score_text);
  //   }
  //   let found = false;
  //   for (const [i, prev_score] of scores.entries()) {
  //     if (new_score.score < prev_score.score) {
  //       scores.splice(i, 0, new_score);
  //       found = true;
  //       break;
  //     }
  //   }
  //   if (!found) {
  //     scores.push(new_score);
  //   }
  //   if (scores.length > 10) {
  //     scores.length = 10;
  //   }
  //   localStorage.setItem('scores', JSON.stringify(scores));
  // }

  return (
    <main className="container-fluid text-center">
      <div className="section">
          {/* make this section smaller? */}
          <Players username={props.username}/>
          <br />
          <img src={image} alt="game image" className="responsive"></img>
      </div>
      <br />
      <div className="section">
          {/* wrap these? */}
          <div className="guess guesses">Wrong Guesses
              <ul>
                  {wrong_guesses.map((w_guess, index) => (<li key = {index}>{w_guess}</li>))}
              </ul>
          </div>
          <div className="guess">
              <div className="input-group mb-3">
                  <span className="input-group-text">Guess: </span>
                  {/* make it clear that it's just a letter!!! */}
                  <input className="form-control" type="text" value={current_guess} onChange={(e) => setCurrentGuess(e.target.value)} placeholder="type your guess here" />
              </div>
              <Button className="btn btn-warning" type="submit" style={{marginBottom: '1em'}} onClick={() => handle_guess()} disabled={!updated_word.includes('__')}>Submit Guess</Button>
              <Button className="btn btn-secondary" type="submit" onClick={() => reset()} disabled={!(updated_word.includes('__') === false || wrong_guesses.length > 0)}>Restart Game</Button>
          </div>
          {/* (make this reactive to size) */}
          <div className="guess guesses" style={{fontSize: '2vw'}}>Word: <span className="word">{display_word}</span></div>
      </div>
    </main>
  );
}