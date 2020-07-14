import React, { useContext } from "react";
import styled from "styled-components";
import { LibralBoard, FascistBoard } from "./Board";
import { HalfThePlayers } from "./HalfThePlayers";
import { PolicySelection } from "./PolicySelection";
import { VoteSelection } from "./VoteSelection";
import { ViewThreeCards } from "./ViewThreeCards";
import { InvestigatePlayer } from "./InvestigatePlayer";
import { KillPlayer } from "./KillPlayer";
import { PresidentSelection } from "./PresidentSelection";
import { ChancellorSelection } from "./ChancellorSelection";
import { GameOver } from "./GameOver";
import { StateContext, ActionContext } from "../Play";
import { Button } from "../../../lib/Button";
import { InteractionMenu } from "./InteractionMenu";
import { ElectionTracker } from "./ElectionTracker";
import { HandleVetoRequest } from "./HandleVetoRequest";

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 5px 0;

  @media only screen and (min-width: 768px) {
  }
  @media only screen and (min-width: 992px) {
    margin: 10px 0;
  }
  @media only screen and (min-width: 1200px) {
  }
`;

export const InprogressScreen = () => {
  const {
    state,
    youInfo,
    isYouPresident,
    isYouChancellor,
    players,
    vetoRequested,
    vetoApproved,
    interactionMenuTarget
  } = useContext(StateContext);

  const { revealVote } = useContext(ActionContext);
  return (
    <>
      <PlayerWrapper>
        <HalfThePlayers allPlayers={players} />
      </PlayerWrapper>
      <LibralBoard></LibralBoard>
      <ElectionTracker />
      {isYouPresident &&
        state === "election" &&
        players.filter((p) => typeof p.vote !== "boolean" && p.isActive)
          .length === 0 && <Button onClick={revealVote}>Reveal Vote</Button>}
      <FascistBoard></FascistBoard>
      <PlayerWrapper>
        <HalfThePlayers allPlayers={players} secondHalf />
      </PlayerWrapper>
      {youInfo.isActive && (
        <>
          {isYouPresident && state === "chancellorSelection" && (
            <ChancellorSelection />
          )}
          {isYouPresident &&
            state === "enactPolicy" &&
            vetoRequested &&
            vetoApproved === null && <HandleVetoRequest />}
          {(state === "fascistWin" || state === "liberalWin") && <GameOver />}
          {state === "election" && youInfo.vote === null && <VoteSelection />}
          {state === "filterCards" && isYouPresident && <PolicySelection />}
          {state === "enactPolicy" && isYouChancellor && <PolicySelection />}
          {isYouPresident && state === "viewThreeCards" && <ViewThreeCards />}
          {isYouPresident && state === "investigatePlayer" && (
            <InvestigatePlayer />
          )}
          {isYouPresident && state === "killPlayer" && <KillPlayer />}
          {isYouPresident && state === "presidentSelection" && (
            <PresidentSelection />
          )}
          {interactionMenuTarget !== undefined &&
            interactionMenuTarget !== null &&
            interactionMenuTarget !== -1 && <InteractionMenu />}
        </>
      )}
    </>
  );
};
