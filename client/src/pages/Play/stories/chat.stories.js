import React, { createContext } from "react";
import { ThemeProvider } from "styled-components";
import _ from "lodash";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";
import { ChatWrapper, Wrapper, StateContext, ActionContext } from "../Play";
import { InprogressScreen } from "../components/InprogressScreen";
import { PlayWrapper } from "../components/PlayWrapper";
import { GlobalWrapper, GlobalStyle } from "../../../App";
import { theme } from "../../../constants/theme";
import { Chat } from "../components/Chat";
import * as states from "./constants";

export default {
  title: "Chat",
  decorators: [withKnobs]
};

const youId = "zytBL148W";

const genContent = (state, context) => {
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
      <GlobalStyle />
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
        <StateContext.Provider value={genContent(state, context)}>
          <GlobalWrapper>
            <Wrapper>
              <PlayWrapper>
                <InprogressScreen />
              </PlayWrapper>
              <ChatWrapper>
                <Chat />
              </ChatWrapper>
            </Wrapper>
          </GlobalWrapper>
        </StateContext.Provider>
      </ActionContext.Provider>
    </ThemeProvider>
  );
};

export const ChancellorSelection = () => {
  const { state, context } = states.chat;
  return render(state, context);
};
