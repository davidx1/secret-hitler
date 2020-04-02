import React from "react";
import SecretHitler from "./journeys/secret-hitler";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div style={{ margin: "50px auto", maxWidth: "1020px" }}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/secret-hitler">Secret Hitler</Link>
            </li>
          </ul>
        </nav>
        <hr />

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/secret-hitler">
            <SecretHitler />
          </Route>
          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
