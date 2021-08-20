import React, { useState, useEffect } from "react";
import * as Colyseus from "colyseus.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Div100vh from "react-div-100vh";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { useHistory } from "react-router-dom";

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
  height: 100vh;
  padding: 10px;
  background-color: ${(props) => props.theme.orange_light};
  box-sizing: border-box;
  overflow: auto;
  min-height: 320px;
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
  location.protocol.replace("http", "ws") + "//" + host + (location.port ? ":" + 3001 : "")
);

function App() {
  const [room, setRoom] = useState();
  const history = useHistory();

  const postJoiningCallback = (newRoom) => {
    const playUrl = "play";
    setRoom(newRoom);
    sessionStorage.setItem("vsh-room-id", newRoom.id);
    sessionStorage.setItem("vsh-session-id", newRoom.sessionId);
    const currentLocation = window.location;

    if (!currentLocation.pathname.includes(playUrl)) {
      history.push(`${playUrl}/${newRoom.id}`);
    }
  };

  const reconnect = () => {
    const existingRoomId = sessionStorage.getItem("vsh-room-id");
    const existingSessionId = sessionStorage.getItem("vsh-session-id");
    if (existingRoomId && existingSessionId) {
      client
        .reconnect(existingRoomId, existingSessionId)
        .then(postJoiningCallback)
        .catch((e) => {
          console.error("reconnection error", e);
          sessionStorage.removeItem("vsh-room-id");
          sessionStorage.removeItem("vsh-session-id");
          history.push("/");
        });
    }
  };

  useEffect(reconnect, []);

  return (
    <Switch>
      <Route path={`/play/:roomId`}>
        <Play
          room={room}
          setRoom={setRoom}
          client={client}
          postJoiningCallback={postJoiningCallback}
        />
      </Route>
      <Route
        path={"/"}
        render={(props) => (
          <Lobby
            client={client}
            isError={props.location.state?.isError}
            postJoiningCallback={postJoiningCallback}
          />
        )}
      ></Route>
    </Switch>
  );
}

export default function AppWrapper() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <div>
          {/* {!isFullscreen && <NavigationBar />} */}
          <GlobalWrapper>
            <Router>
              <App />
            </Router>
          </GlobalWrapper>
        </div>
      </ThemeProvider>
    </>
  );
}
