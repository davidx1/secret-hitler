import React, { createContext } from "react";
import { ThemeProvider } from "styled-components";
import _ from "lodash";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";
import { StateContext, ActionContext } from "../Play";
import { InprogressScreen } from "../components/InprogressScreen";
import { PlayWrapper } from "../components/PlayWrapper";
import { GlobalWrapper } from "../../../../../App";
import { theme } from "../../../../../constants/theme";
import * as states from "./constants";

export default {
  title: "InProgress",
  component: InprogressScreen,
  decorators: [withKnobs]
};

const youId = "zytBL148W";

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

const render = (state, context) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalWrapper>
        <PlayWrapper>
          <ActionContext.Provider
            value={{
              start: action("start"),
              selectChancellor: action("selectChancellor"),
              vote: action("vote"),
              revealVote: action("revealVote"),
              selectACardToRemove: action("selectACardToRemove"),
              enactAPolicy: action("enactAPolicy")
            }}
          >
            <StateContext.Provider value={genContet(state, context)}>
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
  return render(state, context);
};

export const Election = () => {
  const { state, context } = states.election;
  return render(state, context);
};

export const voted = () => {
  const { state, context } = states.voted;
  return render(state, context);
};

export const revealVote = () => {
  const { state, context } = states.revealVote;
  return render(state, context);
};

export const revealVoteWithDead = () => {
  const { state, context } = states.revealVoteWithDead;
  return render(state, context);
};

export const filterCards = () => {
  const { state, context } = states.filterCards;
  return render(state, context);
};

export const viewThreeCards = () => {
  const { state, context } = states.viewThreeCards;
  return render(state, context);
};

export const investigatePlayer = () => {
  const { state, context } = states.investigatePlayer;
  return render(state, context);
};

export const killPlayer = () => {
  const { state, context } = states.killPlayer;
  return render(state, context);
};
