import * as React from "react";
import { useState } from "react";
import { HorizontalBar } from "react-chartjs-2";

import { IGame } from "../../models/IGame";
import { FormControl, Select, makeStyles } from "@material-ui/core";
import playerList from "../../playerlist.json";

import styles from "./PlayerStats.module.scss";

export interface IPlayerStatsProps {
  games: IGame[];
}

function getChartData(games: IGame[], player: string) {
  const opponentWins = playerList
    .filter((opponent) => opponent !== player)
    .map((opponent) =>
      games.reduce((acc, current) => {
        if (player === current.winner && opponent === current.looser) {
          acc++;
        }
        return acc;
      }, 0)
    );
  const opponentLosses = playerList
    .filter((opponent) => opponent !== player)
    .map((opponent) =>
      games.reduce((acc, current) => {
        if (player === current.looser && opponent === current.winner) {
          acc++;
        }
        return acc;
      }, 0)
    );

  return {
    labels: playerList.filter((opponent) => opponent !== player),
    datasets: [
      {
        label: "Wins",
        backgroundColor: "rgb(78, 207, 113)",
        barThickness: "flex",
        data: opponentWins,
      },
      {
        label: "Losses",
        backgroundColor: "rgb(255, 99, 132)",
        barThickness: "flex",
        data: opponentLosses,
      },
    ],
  };
}

function getPlayerStats(games: IGame[], player: string) {
  const wins = games.reduce((acc, current) => {
    if (player === current.winner) {
      acc++;
    }
    return acc;
  }, 0);
  const losses = games.reduce((acc, current) => {
    if (player === current.looser) {
      acc++;
    }
    return acc;
  }, 0);
  const total = wins + losses;
  const quota = losses !== 0 ? wins / losses : 0;

  return { wins, losses, total, quota };
}

export function PlayerStats(props: IPlayerStatsProps) {
  const { games } = props;
  const [player, setPlayer] = useState("");

  const data = getChartData(games, player);
  const stats = getPlayerStats(games, player);

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

  return (
    <div className={styles.playerStats}>
      <div className={styles.row}>
        <div className={styles.drop}>
          <h3>Stats:</h3>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              native
              value={player}
              onChange={(e) => setPlayer(e.target.value as string)}
            >
              <option value={""}>Select player</option>
              {playerList.map((player, key) => (
                <option key={key} value={player}>
                  {player}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        {player && (
          <div className={styles.statGrid}>
            <div>Wins: {stats.wins}</div>
            <div>Total: {stats.total}</div>
            <div>Losses: {stats.losses}</div>
            <div>Quota: {stats.quota.toFixed(2)}</div>
          </div>
        )}
      </div>
      {player && (
        <HorizontalBar
          data={data}
          width={600}
          options={{ maintainAspectRatio: false }}
        />
      )}
    </div>
  );
}
