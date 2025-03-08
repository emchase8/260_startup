import React from 'react';
import './scoreboard.css';
import '../app.css';

export function Score() {
    const [scores, set_scores] = React.useState([]);

    React.useState(() => {
        fetch('/api/scores')
            .then((response) => response.json())
            .then((scores) => {
                set_scores(scores);
            });
        // const scores_text = localStorage.getItem('scores');
        // if (scores_text) {
        //     set_scores(JSON.parse(scores_text));
        // }
    }, []);

    const scores_rows = [];
    if (scores.length) {
        for (const [i, score] of scores.entries()) {
            let class_name = '';
            if ((i+1) === 1) class_name = 'first';
            else if ((i+1) === 2) class_name = 'second';
            else if ((i+1) === 3) class_name = 'third';
            scores_rows.push(
                <tr key={i}>
                    <td className={class_name}>{i+1}</td>
                    <td>{score.name.split('@')[0]}</td>
                    <td>{score.score}</td>
                    <td>{score.date}</td>
                </tr>
            );
        }
    } else {
        scores_rows.push(
            <tr key='0'>
                <td colSpan='4'>Be the first to score</td>
            </tr>
        );
    }

    return (
    <main className="text-center container-fluid">
      <table className="table table-warning table-striped table-hover">
          <thead className="table-dark">
              <tr>
                  <th>Place</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Date</th>
              </tr>
          </thead>
          <tbody id="scores">{scores_rows}</tbody>
      </table>
    </main>
  );
}