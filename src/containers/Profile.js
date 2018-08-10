import React, { Component } from 'react';

export default class Profile extends Component {
  render() {
    console.log(this.props.loggedInUser);
    return (
      <div>
        <p>{`${this.props.loggedInUser}`}</p>
      </div>
    );
  }
}
