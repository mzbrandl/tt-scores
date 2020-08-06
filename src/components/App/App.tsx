import React, { useEffect, useState, createContext } from "react";

import firebase from "../../firebase";
import { IGame } from "../../models/IGame";

import styles from "./App.module.scss";
import { AddGame } from "../AddGame/AddGame";
import { GamesList } from "../GamesList/GamesList";
import { PlayerStats } from "../PlayerStats/PlayerStats";

function App() {
  const [games, setGames] = useState<IGame[]>([]);
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("games")
      .onSnapshot((snapshot) => {
        const games: IGame[] = snapshot.docs.map(
          (doc): IGame => ({
            id: doc.id,
            ...(doc.data() as { winner: string; looser: string; date: number }),
          })
        );

        setGames(games);
      });

    firebase
      .firestore()
      .collection("players")
      .onSnapshot((snapshot) => {
        const players = snapshot.docs
          .map((doc) => doc.data().name)
          .sort((a, b) => a.localeCompare(b));

        setPlayers(players);
      });
  }, []);

  return (
    <div className={styles.App}>
      <h1>TT-Scores</h1>
      <AddGame players={players} />
      <GamesList games={games} />
      <PlayerStats games={games} players={players} />
    </div>
  );
}

export default App;
