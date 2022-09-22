import React from "react";

import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "@app/shared/utils/history";

import RedditHome from "@app/pages/reddit/redditHome";
import NliHome from "@app/pages/nli/nliHome";

import RedditSurvey from "@app/pages/reddit/redditSurvey";

import Survey from "@app/pages/survey/survey";
import routes from "@app/shared/constants/routes";
import { Navbar } from "@app/shared/components";

function App() {
  return (
    <>
      <Navbar />
      <Router history={history}>
        <Switch>
          <Route exact path={routes.REDDIT} component={RedditHome} />
        </Switch>
        <Switch>
          <Route exact path={routes.REDDITSURVEY} component={RedditSurvey} />
        </Switch>
        <Switch>
          <Route exact path={routes.NLI} component={NliHome} />
        </Switch>
        <Switch>
          <Route exact path={routes.SURVEY} component={Survey} />
        </Switch>
      </Router>
    </>
  );
}

export default App;