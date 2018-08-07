import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedRegister: false,
      clickedLogin: false,
    };
  }

  handleLoginClick = () => {
    this.setState({
      clickedLogin: true,
    });
  };

  handleRegisterClick = () => {
    this.setState({
      clickedRegister: true,
    });
  };

  render() {
    return (
      <div className="home">
        {this.state.clickedLogin ? (
          <Login />
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
