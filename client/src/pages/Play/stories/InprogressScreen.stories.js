import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import _ from "lodash";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";
import { StateContext, ActionContext } from "../Play";
import { InprogressScreen } from "../components/InprogressScreen";
import { PlayWrapper } from "../components/PlayWrapper";
import { GlobalWrapper, GlobalStyle } from "../../../App";
import { theme } from "../../../constants/theme";
import * as states from "./constants";

export default {
  title: "InProgress",
  component: InprogressScreen,
  decorators: [withKnobs]
};

const youId = "T2nLfSQvi";

const genContet = (state, context) => {
  const playersToDisplay = context.players.filter(
    (p) => p.displayName !== "secret-admin"
  );
  const isYouPresident =
    _.get(playersToDisplay[context.presidentIndex], "id") === youId;
  const isYouChancellor =
    _.get(playersToDisplay[context.chancellorIndex], "id") === youId;
  const youInfo = playersToDisplay.find((p) => p.id === youId);

  return object("", {
    ...context,
    youId: youInfo.id,
    youInfo,
    isYouPresident,
    isYouChancellor,
    state,
    players: playersToDisplay
  });
};

const Render = ({ state, context }) => {
  const [interactionMenuTarget, setInteractionMenuTarget] = useState(-1);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalWrapper>
        <PlayWrapper>
          <ActionContext.Provider
            value={{
              start: action("start"),
              selectChancellor: action("selectChancellor"),
              vote: action("vote"),
              revealVote: action("revealVote"),
              selectACardToRemove: action("selectACardToRemove"),
              enactAPolicy: action("enactAPolicy"),
              setInteractionMenuTarget
            }}
          >
            <StateContext.Provider
              value={{ ...genContet(state, context), interactionMenuTarget }}
            >
              <InprogressScreen />
            </StateContext.Provider>
          </ActionContext.Provider>
        </PlayWrapper>
      </GlobalWrapper>
    </ThemeProvider>
  );
};

export const ChancellorSelection = () => {
  const { state, context } = states.chancellorSelection;
  return <Render state={state} context={context} />;
};

export const Election = () => {
  const { state, context } = states.election;
  return <Render state={state} context={context} />;
};

export const voted = () => {
  const { state, context } = states.voted;
  return <Render state={state} context={context} />;
};

export const revealVote = () => {
  const { state, context } = states.revealVote;
  return <Render state={state} context={context} />;
};

export const revealVoteWithDead = () => {
  const { state, context } = states.revealVoteWithDead;
  return <Render state={state} context={context} />;
};

export const filterCards = () => {
  const { state, context } = states.filterCards;
  return <Render state={state} context={context} />;
};

export const enactPolicy = () => {
  const { state, context } = states.enactPolicy;
  return <Render state={state} context={context} />;
};

export const enactPolicyWithVeto = () => {
  const { state, context } = states.enactPolicyWithVeto;
  return <Render state={state} context={context} />;
};

export const vetoRequested = () => {
  const { state, context } = states.vetoRequested;
  return <Render state={state} context={context} />;
};

export const awaitingVetoApproval = () => {
  const { state, context } = states.awaitingVetoApproval;
  return <Render state={state} context={context} />;
};

export const vetoRequestRejected = () => {
  const { state, context } = states.vetoRequestRejected;
  return <Render state={state} context={context} />;
};

export const viewThreeCards = () => {
  const { state, context } = states.viewThreeCards;
  return <Render state={state} context={context} />;
};

export const investigatePlayer = () => {
  const { state, context } = states.investigatePlayer;
  return <Render state={state} context={context} />;
};

export const killPlayer = () => {
  const { state, context } = states.killPlayer;
  return <Render state={state} context={context} />;
};

export const fascistWin = () => {
  const { state, context } = states.fascistWin;
  return <Render state={state} context={context} />;
};
