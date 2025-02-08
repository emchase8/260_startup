import React from 'react';
import './info.css';
import '../app.css';

export function Info() {
  return (
    <main className="text-center container-fluid override">
      <img alt="word art" className="responsive" src="../../public/about_img.jpg"></img>
      <div className="override2">
        <p>
          Hang Cheese follows the model of the classic classroom game of Hangman, but instead has a mouse going after cheese. The goal is to protect the cheese by guessing the correct word with less than 4 wrong guesses.
        </p>
        <div className="altbox">Alt 3rd party placeholder (likely a quote)</div>
      </div>
    </main>
  );
}