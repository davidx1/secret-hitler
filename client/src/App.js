import React from "react"
import SecretHitler from "./journeys/secret-hitler"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { theme } from "./constants/theme"
import styled, { ThemeProvider } from "styled-components"
import Div100vh from "react-div-100vh"

const GlobalWrapper = styled(Div100vh)`
  width: 100vw;
  padding: 25px;
  background-color: ${(props) => props.theme.neutral};
  background-image: url("https://www.transparenttextures.com/patterns/natural-paper.png");
  box-sizing: border-box;
  min-width: 550px;
  @media only screen and (max-width: 1200px) {
    padding: 10px;
  }
`
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalWrapper>
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
    </ThemeProvider>
  )
}
