import * as React from 'react';

import { IGame } from '../../models/IGame';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core';

export interface IGamesListProps {
  games: IGame[];
}

const useStyles = makeStyles({
  table: {
    maxWidth: 600,
    margin: 'auto'
  },
});

export function GamesList(props: IGamesListProps) {
  const { games } = props;
  const classes = useStyles();
  const sortedGames = games.sort((a, b) => b.date - a.date);

  return <>
    <h3>latest games</h3>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><b>Date</b></TableCell>
          <TableCell><b>Winner</b></TableCell>
          <TableCell><b>Looser</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedGames.map((game) => (
          <TableRow key={game.date}>
            <TableCell component="th" scope="row">
              {new Date(game.date).toLocaleString()}
            </TableCell>
            <TableCell >{game.winner}</TableCell>
            <TableCell >{game.looser}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>;
}
