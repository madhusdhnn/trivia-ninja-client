import React, {Component} from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';

import Root from './layouts/Root';

class Routes extends Component {

   render() {
      return (
         <Switch>
            <Route exact path="/trivia/dashboard" component={Root} />
            <Redirect from="/trivia" exact to="/trivia/dashboard" />
            <Redirect from="/" exact to="/trivia/dashboard" />
            <Redirect from="*" exact to="/trivia/dashboard" />
         </Switch>
      );
   }

}

export default withRouter(Routes);
