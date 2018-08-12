import React, { Component } from 'react';
import Navbar from '../components/Navbar';
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInNavbar: true
    };
  }

  render() {
    return (
      <div>
        <Navbar
          loggedInUser={this.props.loggedInUser}
          loggedInNavbar={this.state.loggedInNavbar}
        />
        <p>{`${this.props.loggedInUser}`}</p>
      </div>
    );
  }
}
