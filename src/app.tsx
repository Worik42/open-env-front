import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

import { store, history } from './services';
import LoginPage from './features/auth/pages/login-page'
import CreateUserPage from './features/auth/pages/create-user-page'
import PrivateRoute from './features/common/private-route';
import Dashboard from './features/dashboard/pages/dashboard-page'

const Main = styled('div')`
  width: 100%;
  height: 100%;
`;

export default class App extends Component {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Main>
            <Global
              styles={css`
                  * {
                    box-sizing: border-box;
                  }
  
                  html,
                  body,
                  #root {
                    width: 100%;
                    height: 100%;
                  }
  
                  body {
                    margin: 0;
                    padding: 0;
                  }
                `}
            />
            <Switch>
              <Route path='/login' component={LoginPage} />
              <Route path='/createUser' component={CreateUserPage} />
              <PrivateRoute component={Dashboard} path="/dashboard" />
              <Redirect path='*' to={'/login'} />
            </Switch>
          </Main>
        </ConnectedRouter>
      </Provider>
    );
  }
}