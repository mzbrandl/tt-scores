import * as React from 'react';
import { Select, makeStyles, FormControl, Button } from '@material-ui/core';

import firebase from '../../firebase';
import { IGame } from '../../models/IGame';

import styles from './AddGame.module.scss';

const playerOptions = [
  'Cheezy',
  'Consti',
  'Marcel',
  'Moritz',
  'Simon'
]

export function AddGame() {
  const [winner, setWinner] = React.useState('');
  const [looser, setLooser] = React.useState('');

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 200
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
      date: Date.now()
    }

    firebase
      .firestore()
      .collection('games').add(game);

    setWinner('');
    setLooser('');
  }


  return <div className={styles.addGame}>
    <h2>Winner</h2>
    <div />
    <h2>Looser</h2>

    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        native
        value={winner}
        onChange={(e) => setWinner(e.target.value as string)}
      >
        <option value={undefined}>Select player</option>
        {playerOptions
          .filter(player => looser ? player !== looser : true)
          .map((player, key) => <option key={key} value={player}>{player}</option>)}
      </Select>
    </FormControl>
    <h2>VS</h2>
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        native
        value={looser}
        onChange={(e) => setLooser(e.target.value as string)}
      >
        <option value={undefined}>Select player</option>
        {playerOptions
          .filter(player => winner ? player !== winner : true)
          .map((player, key) => <option key={key} value={player}>{player}</option>)}
      </Select>
    </FormControl>

    <div className={styles.submit}>
      <Button variant="contained" onClick={onSaveClick} disabled={!(winner && looser)}>Save Game</Button>
    </div>
  </div >;
}
