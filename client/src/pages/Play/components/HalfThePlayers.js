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
    isYouPresident,
    chatBubbleContent
  } = useContext(StateContext);
  const { setInteractionMenuTarget } = useContext(ActionContext);

  const alivePlayerCount = players.filter((p) => p.isActive).length;
  const canPrevPresidentBeNominated = alivePlayerCount <= 5;
  const halfWay = Math.ceil(players.length / 2);
  const start = !secondHalf ? 0 : halfWay;
  const end = !secondHalf ? halfWay : players.length;

  return (
    <>
      {players.slice(start, end).map((p, i) => {
        const realIndex = secondHalf ? i + halfWay : i;

        return (
          <Player
            onClick={() => setInteractionMenuTarget(realIndex)}
            isPresident={realIndex === presidentIndex}
            role={p.role}
            selectableAsChancellor={
              isYouPresident &&
              p.id !== youId &&
              realIndex !== prevChancellorIndex &&
              (canPrevPresidentBeNominated || realIndex !== prevPresidentIndex)
            }
            chatBubbleContent={chatBubbleContent && chatBubbleContent[p.id]}
            vote={p.vote}
            isChancellor={realIndex === chancellorIndex}
            displayName={p.displayName}
            isCurrentPlayer={p.id === youId}
            currentPlayerRole={youInfo.role}
            scale={1}
            isActive={p.isActive}
            isDisconnected={p.isDisconnected}
            color={p.color}
          ></Player>
        );
      })}
    </>
  );
};
