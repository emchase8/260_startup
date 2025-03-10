import React from 'react';
import './info.css';
import '../app.css';

export function Info() {
  const [affirmation, set_affirmation] = React.useState('...loading');
  const [author, set_author] = React.useState('...loading');

  React.useEffect(() => {
    // set_affirmation("Colors fade, temples crumble, empires fall, but wise words endure.");
    // set_author("Edward Thorndike");
    fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((data) => {set_affirmation(data.quote); set_author(data.author)})
      .catch();
  }, []);
  
  return (
    <main className="text-center container-fluid override">
      <img alt="word art" className="info_responsive" src="about_img.jpg"></img>
      <div className="override2">
        <p>
          Hang Cheese follows the model of the classic classroom game of Hangman, but instead has a mouse going after cheese. The goal is to protect the cheese by guessing the correct word with less than 4 wrong guesses.
        </p>
        <div className="altbox">"{affirmation}" -{author}</div>
      </div>
    </main>
  );
}