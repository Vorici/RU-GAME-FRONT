import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Navbar
          onRegisterClick={this.props.onRegisterClick}
          onLoginClick={this.props.onLoginClick}
        />
      </div>
    );
  }
}

// {
//   this.state.clickedRegister ? (
//     <Register />
//   ) : (
//     <Navbar onLoginClick={this.handleLoginClick} />
//   );
// }
