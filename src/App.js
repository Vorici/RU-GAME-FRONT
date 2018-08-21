import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import Profile from './containers/Profile';
import Create from './containers/Create';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './containers/Welcome';
import './App.css';

const mapStateToProps = (state) => ({
  username: state.usernameInputField,
  loginAuthRes: state.loginResponse,
  loggedIn: state.loggedIn
});

class App extends Component {
  render() {
    console.log('LOGED', this.props.loggedIn);
    return (
      <div>
        <Navbar />
        <Switch>
          {this.props.loggedIn ? (
            <Route exact path="/" component={Profile} />
          ) : (
            <Route exact path="/" component={Welcome} />
          )}

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/create" component={Create} />
        </Switch>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch(incrementAction())
// });

export default withRouter(connect(mapStateToProps)(App));
