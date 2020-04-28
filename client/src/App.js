import React from "react"
import SecretHitler from "./journeys/secret-hitler"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { theme } from "./constants/theme"
import styled, { ThemeProvider, css } from "styled-components"
import Div100vh from "react-div-100vh"
import useFullscreen from "use-fullscreen"

const GlobalWrapper = styled(Div100vh)`
  width: 100vw;
  padding: 10px 5px;
  background-color: ${(props) => props.theme.neutral};
  background-image: url("https://www.transparenttextures.com/patterns/natural-paper.png");
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
`

const NavigationBar = styled.nav`
  position: fixed;
  background: ${(props) => props.theme.dark};
  backdrop-filter: saturate(180%) blur(20px);
  height: 25px;
  width: 100%;
  @media only screen and (min-width: 992px) {
    height: 40px;
  }
`
export default function App() {
  const [isFullscreen, toggleFullscreen] = useFullscreen()

  return (
    <ThemeProvider theme={theme}>
      <div>
        {!isFullscreen && <NavigationBar />}

        <GlobalWrapper moreTopPadding={!isFullscreen}>
          <Router>
            {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/secret-hitler">
                <SecretHitler />
              </Route>
              <Route path="/">
                <h1>Home</h1>
                <nav>
                  <ul>
                    <li>
                      <Link to="/secret-hitler">Secret Hitler</Link>
                    </li>
                  </ul>
                </nav>
                <hr />
              </Route>
            </Switch>
          </Router>
        </GlobalWrapper>
      </div>
    </ThemeProvider>
  )
}
