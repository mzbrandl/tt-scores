import * as React from "react";
import { Select, makeStyles, FormControl, Button } from "@material-ui/core";

import firebase from "../../firebase";
import { IGame } from "../../models/IGame";

import styles from "./AddGame.module.scss";

export interface IAddGameProps {
  players: string[];
}

export function AddGame({ players }: IAddGameProps) {
  const [winner, setWinner] = React.useState("");
  const [looser, setLooser] = React.useState("");

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 200,
      backgroundColor: "white",
      borderRadius: 4,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const onSaveClick = () => {
    const game: IGame = {
      winner,
      looser,
      date: Date.now(),
    };

    firebase.firestore().collection("games").add(game);

    setWinner("");
    setLooser("");
  };

  return (
    <div className={styles.demoWrapper}>
      <div className={styles.addGame}>
        <h2 className={styles.label}>Winner</h2>
        <div />
        <h2 className={styles.label}>Looser</h2>

        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            native
            value={winner}
            onChange={(e) => setWinner(e.target.value as string)}
          >
            <option value={""}>Select player</option>
            {players
              .filter((player) => (looser ? player !== looser : true))
              .map((player, key) => (
                <option key={key} value={player}>
                  {player}
                </option>
              ))}
          </Select>
        </FormControl>
        <h2>VS</h2>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            native
            value={looser}
            onChange={(e) => setLooser(e.target.value as string)}
          >
            <option value={""}>Select player</option>
            {players
              .filter((player) => (winner ? player !== winner : true))
              .map((player, key) => (
                <option key={key} value={player}>
                  {player}
                </option>
              ))}
          </Select>
        </FormControl>

        <div className={styles.submit}>
          <Button
            className={styles.button}
            color="primary"
            variant="contained"
            onClick={onSaveClick}
            disabled={!(winner && looser)}
          >
            Save Game
          </Button>
        </div>
      </div>
    </div>
  );
}
