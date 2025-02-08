import React from 'react';
import './scoreboard.css';
import '../app.css';

export function Score() {
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
          <tbody>
              <tr>
                  <td className="first">1</td>
                  <td>Bartholomew</td>
                  <td>5</td>
                  <td>January 1, 2025</td>
              </tr>
              <tr>
                  <td className="second">2</td>
                  <td>Eustence</td>
                  <td>5</td>
                  <td>January 2, 2025</td>
              </tr>
              <tr>
                  <td className="third">3</td>
                  <td>Genevieve</td>
                  <td>6</td>
                  <td>December 31, 2024</td>
              </tr>
              <tr>
                  <td>4</td>
                  <td>Pershepane</td>
                  <td>7</td>
                  <td>December 26, 2024</td>
              </tr>
              <tr>
                  <td>5</td>
                  <td>Vax'ildan</td>
                  <td>7</td>
                  <td>December 27, 2024</td>
              </tr>
          </tbody>
      </table>
    </main>
  );
}