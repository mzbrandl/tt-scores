import React, { useEffect, useState } from "react";

import firebase from "../../firebase";
import { IGame } from "../../models/IGame";

import "./App.css";
import { AddGame } from "../AddGame/AddGame";
import { GamesList } from "../GamesList/GamesList";
import { PlayerStats } from "../PlayerStats/PlayerStats";

function useGames(): IGame[] {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("games")
      .onSnapshot((snapshot) => {
        const games: IGame[] = snapshot.docs.map(
          (doc): IGame => ({
            ...(doc.data() as IGame),
          })
        );

        setGames(games);
      });
  }, []);

  return games;
}

function App() {
  const games = useGames();
  return (
    <div className="App">
      <h1>TT-Scores</h1>
      <AddGame />
      <GamesList games={games} />
      <PlayerStats games={games} />
    </div>
  );
}

export default App;
