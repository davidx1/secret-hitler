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

export default {
  title: "InProgress",
  component: InprogressScreen,
  decorators: [withKnobs]
};

const roomState = {
  "state": "chancellorSelection",
  "context": {
    "players": [
      {
        "id": "vjWoiRsvO",
        "displayName": "Laura",
        "vote": null,
        "role": "L",
        "isActive": true
      },
      {
        "id": "T2nLfSQvi",
        "displayName": "Tony",
        "vote": null,
        "role": "L",
        "isActive": true
      },
      {
        "id": "Bf01Rv505",
        "displayName": "Raymond",
        "vote": null,
        "role": "F",
        "isActive": true
      },
      {
        "id": "brfGFh8h0",
        "displayName": "Terry",
        "vote": null,
        "role": "H",
        "isActive": true
      },
      {
        "id": "1WRSZanld",
        "displayName": "Mason",
        "vote": null,
        "role": "L",
        "isActive": true
      },
      {
        "id": "TmSswLUch",
        "displayName": "Jeffery",
        "vote": null,
        "role": "L",
        "isActive": true
      }
    ],
    "board": ["NONE", "NONE", "TOP_THREE_CARD", "KILL_PLAYER", "KILL_PLAYER"],
    "drawPile": [
      "F",
      "L",
      "F",
      "L",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "L",
      "L",
      "L",
      "F",
      "L",
      "F",
      "F"
    ],
    "policiesInHand": ["F", "L", "F"],
    "prevPresidentIndex": null,
    "prevChancellorIndex": null,
    "presidentIndex": 0,
    "chancellorIndex": null,
    "enactedLiberalPolicies": 0,
    "enactedFascistPolicies": 0
  }
};

const { state, context } = roomState;

const youId = "vjWoiRsvO";

const playersToDisplay = context.players.filter(
  (p) => p.displayName !== "secret-admin"
);
const isYouPresident =
  _.get(playersToDisplay[context.presidentIndex], "id") === youId;
const isYouChancellor =
  _.get(playersToDisplay[context.chancellorIndex], "id") === youId;
const youInfo = playersToDisplay.find((p) => p.id === youId);

const content = object("", {
  ...context,
  youId: youInfo.id,
  youInfo,
  isYouPresident,
  isYouChancellor,
  state,
  players: playersToDisplay
});

export const Overall = () => (
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
          <StateContext.Provider value={content}>
            <InprogressScreen />
          </StateContext.Provider>
        </ActionContext.Provider>
      </PlayWrapper>
    </GlobalWrapper>
  </ThemeProvider>
);

export const CardSelection = () => (
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
          <StateContext.Provider value={{ ...content, state: "filterCards" }}>
            <InprogressScreen />
          </StateContext.Provider>
        </ActionContext.Provider>
      </PlayWrapper>
    </GlobalWrapper>
  </ThemeProvider>
);
