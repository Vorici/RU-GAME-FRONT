import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
// import Navbar from './components/Navbar';
import Profile from './containers/Profile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedRegister: false,
      clickedLogin: false,
      loggedIn: false,
      statusCode: null,
      userName: null
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

  handleLoggingIn = (statusCode, userName) => {
    if (statusCode === 200)
      this.setState({
        loggedIn: true,
        clickedLogin: false,
        statusCode,
        userName
      });
  };

  render() {
    return (
      <div className="home">
        {this.state.loggedIn ? (
          <Profile loggedInUser={this.state.userName} />
        ) : this.state.clickedLogin ? (
          <Login onAuthLoginClick={this.handleLoggingIn} />
        ) : (
          <Home
            onRegisterClick={this.handleRegisterClick}
            onLoginClick={this.handleLoginClick}
          />
        ) && this.state.clickedRegister ? (
          <Register onAuthLoginClick={this.handleLoggingIn} />
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
