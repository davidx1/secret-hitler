import React from "react";
import SecretHitler from "./journeys/secret-hitler";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./constants/theme";
import styled, {
  ThemeProvider,
  css,
  createGlobalStyle
} from "styled-components";
import Div100vh from "react-div-100vh";
import useFullscreen from "use-fullscreen";

const GlobalStyle = createGlobalStyle`
  body{ 
    * {
      box-sizing: border-box
    }
  }
`;

export const GlobalWrapper = styled(Div100vh)`
  width: 100vw;
  padding: 10px 5px;
  background-color: ${(props) => props.theme.neutral};
  box-sizing: border-box;
  overflow: scroll;
  @media only screen and (min-width: 512px) {
    padding: 15px 20px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 30px;
  }
  ${(props) =>
    props.moreTopPadding &&
    css`
      padding-top: 32px;
      @media only screen and (min-width: 512px) {
        padding-top: 32px;
      }
      @media only screen and (min-width: 992px) {
        padding-top: 48px;
      }
    `}
`;

const NavigationBar = styled.nav`
  position: fixed;
  background: ${(props) => props.theme.dark};
  backdrop-filter: saturate(180%) blur(20px);
  height: 25px;
  width: 100%;
  @media only screen and (min-width: 992px) {
    height: 40px;
  }
`;
export default function App() {
  const [isFullscreen] = useFullscreen();

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyle />
        {!isFullscreen && <NavigationBar />}

        <GlobalWrapper moreTopPadding={!isFullscreen}>
          <Router>
            <SecretHitler />
          </Router>
        </GlobalWrapper>
      </div>
    </ThemeProvider>
  );
}
