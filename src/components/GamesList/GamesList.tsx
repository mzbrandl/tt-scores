import * as React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import { confirmAlert } from "react-confirm-alert";

import { IGame } from "../../models/IGame";
import firebase from "firebase";
export interface IGamesListProps {
  games: IGame[];
}

const useStyles = makeStyles({
  table: {
    maxWidth: 600,
    margin: "auto",
  },
});

export function GamesList(props: IGamesListProps) {
  const { games } = props;
  const sortedGames = games?.sort((a, b) => b.date - a.date);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, sortedGames?.length - page * rowsPerPage);

  const handleChangePage = (_event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDeleteGameClick = (game: IGame) => {
    confirmAlert({
      title: "Delete game",
      message: `Are you sure you want to delete ${game.winner} vs. ${
        game.looser
      } on ${new Date(game.date).toLocaleDateString()}?`,
      buttons: [
        {
          label: "Delete",
          onClick: () =>
            firebase.firestore().collection("games").doc(game.id).delete(),
        },
        { label: "Cancel", onClick: () => {} },
      ],
    });
  };

  return (
    <>
      <h3>Latest games</h3>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Date</b>
            </TableCell>
            <TableCell>
              <b>Winner</b>
            </TableCell>
            <TableCell>
              <b>Looser</b>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? sortedGames?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : sortedGames
          ).map((game) => (
            <TableRow key={game.date}>
              <TableCell component="th" scope="row">
                {new Date(game.date).toLocaleString()}
              </TableCell>
              <TableCell>{game.winner}</TableCell>
              <TableCell>{game.looser}</TableCell>
              <TableCell>
                <a
                  onClick={() => onDeleteGameClick(game)}
                  style={{ cursor: "pointer", padding: ".5em" }}
                >
                  X
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={sortedGames?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
