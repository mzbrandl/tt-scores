import * as React from "react";
import { useState } from "react";
import { HorizontalBar } from "react-chartjs-2";

import { IGame } from "../../models/IGame";
import { FormControl, Select, makeStyles } from "@material-ui/core";

import styles from "./PlayerStats.module.scss";

export interface IPlayerStatsProps {
  games: IGame[];
  players: string[];
}

function getChartData(games: IGame[], player: string, players: string[]) {
  const opponentWins = players
    .filter((opponent) => opponent !== player)
    .map((opponent) =>
      games.reduce((acc, current) => {
        if (player === current.winner && opponent === current.looser) {
          acc++;
        }
        return acc;
      }, 0)
    );
  const opponentLosses = players
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
    labels: players.filter((opponent) => opponent !== player),
    datasets: [
      {
        label: "Wins",
        backgroundColor: "rgb(78, 207, 192)",
        barThickness: "flex",
        data: opponentWins,
      },
      {
        label: "Losses",
        backgroundColor: "rgb(207, 168, 78)",
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

export function PlayerStats({ games, players }: IPlayerStatsProps) {
  const [player, setPlayer] = useState("");

  const data = getChartData(games, player, players);
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
    <>
      <h3>Player stats</h3>
      <div className={styles.playerStats}>
        <div className={styles.row}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              native
              value={player}
              onChange={(e) => {
                setPlayer(e.target.value as string);
                setTimeout(
                  () => window.scrollTo(0, document.body.scrollHeight),
                  100
                );
              }}
            >
              <option value={""}>Select player</option>
              {players.map((player, key) => (
                <option key={key} value={player}>
                  {player}
                </option>
              ))}
            </Select>
          </FormControl>
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
    </>
  );
}
