import React from "react";

import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "@app/shared/utils/history";

import Home from "@app/pages/home/home";
import Survey from "@app/pages/survey/survey";
import routes from "@app/shared/constants/routes";
import { Navbar } from "@app/shared/components";

function App() {
  return (
    <>
      <Navbar />
      <Router history={history}>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
        </Switch>
        <Switch>
          <Route exact path={routes.SURVEY} component={Survey} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
