import React, { useState } from "react";
import * as Colyseus from "colyseus.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Div100vh from "react-div-100vh";
import useFullscreen from "use-fullscreen";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import { theme } from "./constants/theme";
import Play from "./pages/Play";
import Lobby from "./pages/Lobby";

export const GlobalStyle = createGlobalStyle`
  body{ 
    font-family: Tahoma, Geneva, sans-serif;
    padding: 0;
    margin: 0;
    * {
      box-sizing: border-box
    }
  }
`;

export const GlobalWrapper = styled(Div100vh)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 15px;
  background-color: ${(props) => props.theme.orange_light};
  box-sizing: border-box;
  overflow: scroll;
  @media only screen and (min-width: 512px) {
    padding: 30px 20px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 30px;
  }
`;

// const NavigationBar = styled.nav`
//   position: fixed;
//   background: ${(props) => props.theme.dark};
//   backdrop-filter: saturate(180%) blur(20px);
//   height: 25px;
//   width: 100%;
//   @media only screen and (min-width: 992px) {
//     height: 40px;
//   }
// `;

const host = window.document.location.host.replace(/:.*/, "");
const location = window.location;
const client = new Colyseus.Client(
  location.protocol.replace("http", "ws") +
    "//" +
    host +
    (location.port ? ":" + 3001 : "")
);

export default function App() {
  const [room, setRoom] = useState();

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <div>
          {/* {!isFullscreen && <NavigationBar />} */}
          <GlobalWrapper>
            <Router>
              <Switch>
                <Route path={`/play/:roomId`}>
                  <Play room={room} setRoom={setRoom} client={client} />
                </Route>
                <Route path={"/"}>
                  <Lobby client={client} playUrl={`play`} setRoom={setRoom} />
                </Route>
              </Switch>
            </Router>
          </GlobalWrapper>
        </div>
      </ThemeProvider>
    </>
  );
}
