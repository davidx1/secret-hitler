import React, { useContext } from "react";

import { Player } from "./Player";
import { StateContext, ActionContext } from "../Play";

export const HalfThePlayers = ({ secondHalf }) => {
  const {
    players,
    chancellorIndex,
    youId,
    youInfo,
    prevChancellorIndex,
    prevPresidentIndex,
    presidentIndex,
    isYouPresident
  } = useContext(StateContext);
  const { selectChancellor } = useContext(ActionContext);

  const halfWay = Math.ceil(players.length / 2);
  const start = !secondHalf ? 0 : halfWay;
  const end = !secondHalf ? halfWay : players.length;

  return (
    <>
      {players.slice(start, end).map((p, i) => {
        const realIndex = secondHalf ? i + halfWay : i;

        return (
          <Player
            onClick={() => selectChancellor(realIndex)}
            isPresident={realIndex === presidentIndex}
            role={p.role}
            selectable={
              isYouPresident &&
              realIndex !== prevChancellorIndex &&
              realIndex !== prevPresidentIndex &&
              p.id !== youId
            }
            vote={p.vote}
            isChancellor={realIndex === chancellorIndex}
            displayName={p.displayName}
            isCurrentPlayer={p.id === youId}
            currentPlayerRole={youInfo.role}
            scale={1}
          ></Player>
        );
      })}
    </>
  );
};
