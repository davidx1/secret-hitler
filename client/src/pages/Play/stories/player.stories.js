import React, { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import _ from "lodash";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";
import { StateContext, ActionContext } from "../Play";
import { Player } from "../components/Player";
import { theme } from "../../../constants/theme";
import * as states from "./constants";

export default {
  title: "Player",
  component: Player,
  decorators: [withKnobs]
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Basic = () => {
  const { state, context } = states.chancellorSelection;
  return (
    <ThemeProvider theme={theme}>
      <StateContext.Provider value={{ state: "start" }}>
        <Wrapper>
          <Player
            displayName="Default"
            isActive={true}
            isDisconnected={false}
            isCurrentPlayer={true}
            role="L"
            scale={2}
          />
          <Player
            displayName="Hitler"
            isActive={true}
            isCurrentPlayer={true}
            isDisconnected={false}
            role="H"
            scale={2}
          />
          <Player
            displayName="Fascist"
            isActive={true}
            isDisconnected={true}
            isCurrentPlayer={true}
            role="F"
            scale={2}
          />
          <Player
            displayName="Dead"
            isActive={true}
            isDisconnected={false}
            isCurrentPlayer={true}
            role="L"
            scale={2}
            isActive={false}
          />
          <Player
            displayName="President"
            isActive={true}
            isDisconnected={true}
            isCurrentPlayer={true}
            role="L"
            scale={2}
            isPresident
          />
          <Player
            displayName="Chancellor"
            isActive={true}
            isDisconnected={false}
            isCurrentPlayer={true}
            role="L"
            scale={2}
            isChancellor
          />
        </Wrapper>
      </StateContext.Provider>
    </ThemeProvider>
  );
};
