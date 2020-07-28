import React, { useEffect, useState } from 'react';

import firebase from '../../firebase';
import { IGame } from '../../models/IGame';

import './App.css';

function useGames(): IGame[] {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('games')
      .onSnapshot(snapshot => {
        const games: IGame[] = snapshot.docs.map((doc): IGame => ({
          ...doc.data() as IGame
        }));

        setGames(games);
      })
  }, []);

  return games;
}

function addGame(game: IGame) {
  firebase
    .firestore()
    .collection('games').add(game);
}

const example: IGame = { winner: ' Moe', looser: 'Simon', date: new Date() };

function App() {
  const games = useGames();
  console.log(games);
  return (
    <div className="App">
      <h1>TT-Scores</h1>
      <button onClick={() => addGame(example)}>add game</button>
    </div>
  );
}

export default App;
