import React, { Component, FunctionComponent } from 'react';
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps
} from 'react-router-dom';
import { connect } from 'react-redux';

import { setAuth } from '../common/actions';
import { ACCESS_TOKEN } from '../../services/http';

declare interface IPrivateRoute extends RouteProps {
  component: React.ComponentType;
  setAuth: any;
}

class PrivateRoute extends Component<IPrivateRoute> {
  private isAuth = (): boolean => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      this.props.setAuth(true);
      return false;
    } else {
      this.props.setAuth(false);
      return true;
    }
  };

  private redirect = (): any => {
    const { component: Component } = this.props;
    return this.isAuth() ? (
      <Redirect to='/login' />
    ) : (
      <Component {...this.props} />
    );
  };

  public render() {
    const { component: Component, ...rest } = this.props;

    return <Route {...rest} render={this.redirect} />;
  }
}

const mapStateToProps = (state: any) => ({
  isAuth: state.auth
});

const mapDispatchToProps = {
  setAuth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
