import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Profile from './containers/Profile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedRegister: false,
      clickedLogin: false,
      loggedIn: false,
      statusCode: null
    };
  }

  handleLoginClick = () => {
    this.setState({
      clickedLogin: true
    });
  };

  handleRegisterClick = () => {
    this.setState({
      clickedRegister: true
    });
  };

  handleLoggingIn = (statusCode) => {
    this.setState({
      loggedIn: true,
      statusCode
    });
  };

  render() {
    return (
      <div className="home">
        {this.state.loggedIn && this.state.statusCode === 200 ? (
          <Profile loggedInUser={this.state.loggedInUser} />
        ) : this.state.clickedLogin ? (
          <Login onAuthLoginClick={this.handleLoggingIn} />
        ) : (
          <Home
            onRegisterClick={this.handleRegisterClick}
            onLoginClick={this.handleLoginClick}
          />
        ) && this.state.clickedRegister ? (
          <Register />
        ) : (
          <Home
            onRegisterClick={this.handleRegisterClick}
            onLoginClick={this.handleLoginClick}
          />
        )}
      </div>
    );
  }
}
