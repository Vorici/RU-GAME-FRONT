import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <div className="ui menu">
        <div className="header item">ru.game</div>
        <a className="item">My Profile</a>
        <div className="right item">
          <button
            onClick={this.props.onLoginClick}
            className="ui primary button"
          >
            Login
          </button>
          <button onClick={this.props.onRegisterClick} className="ui button">
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}
