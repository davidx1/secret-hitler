import React, { useContext } from "react";
import styled from "styled-components";
import { Overlay, InstructionText } from "../../../lib/Overlay";
import { StateContext, ActionContext } from "../Play";
import { Button } from "../../../lib/Button";
import { Player } from "./Player";

const ButtonList = styled.ul`
  padding: 0;
  width: min-content;
`;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
`;

export const InteractionMenu = () => {
  const {
    state,
    isYouPresident,
    players,
    interactionMenuTarget,
    youInfo,
    youId
  } = useContext(StateContext);
  const {
    selectChancellor,
    setInteractionMenuTarget,
    sendChatBubble
  } = useContext(ActionContext);

  const targetPlayer = players[interactionMenuTarget];
  return (
    <Overlay onClick={() => setInteractionMenuTarget(-1)}>
      <Wrapper>
        <Player
          displayName={targetPlayer.displayName}
          scale={2}
          isCurrentPlayer={targetPlayer.id === youId}
          currentPlayerRole={youInfo.role}
          role={targetPlayer.role}
          isActive={targetPlayer.isActive}
        />
        <ButtonList>
          {isYouPresident && state === "chancellorSelection" && (
            <Button onClick={() => selectChancellor(interactionMenuTarget)}>
              Select as Chancellor
            </Button>
          )}
          <Button
            onClick={() =>
              sendChatBubble(`${targetPlayer.displayName} is Hitler!`)
            }
          >
            Accuse as Hitler
          </Button>
          <Button
            onClick={() =>
              sendChatBubble(`${targetPlayer.displayName} is Fascist!`)
            }
          >
            Accuse as Fascist
          </Button>
          <Button
            onClick={() =>
              sendChatBubble(`${targetPlayer.displayName} is Liberal!`)
            }
          >
            Support as Liberal
          </Button>
        </ButtonList>
      </Wrapper>
    </Overlay>
  );
};
