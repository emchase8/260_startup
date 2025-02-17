import React from 'react';
import './info.css';
import '../app.css';

export function Info() {
  const [quote, set_quote] = React.useState('...loading');
  const [author, set_author] = React.useState('...loading');

  React.useEffect(() => {
    set_quote("Colors fade, temples crumble, empires fall, but wise words endure.");
    set_author("Edward Thorndike");
  }, []);
  
  return (
    <main className="text-center container-fluid override">
      <img alt="word art" className="responsive" src="about_img.jpg"></img>
      <div className="override2">
        <p>
          Hang Cheese follows the model of the classic classroom game of Hangman, but instead has a mouse going after cheese. The goal is to protect the cheese by guessing the correct word with less than 4 wrong guesses.
        </p>
        <div className="altbox">"{quote}" - {author}</div>
      </div>
    </main>
  );
}