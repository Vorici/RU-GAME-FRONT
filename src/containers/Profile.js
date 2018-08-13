import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import ActionButton from '../components/ActionButton';
import PickSport from '../components/PickSport';
import { componentFromProp } from '../../node_modules/recompose';
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInNavbar: true,
      clickedActionButton: false
    };
  }

  handleActionButtonClick = () => {
    this.setState({
      clickedActionButton: true
    });
  };

  render() {
    return (
      <div>
        <Navbar
          loggedInUser={this.props.loggedInUser}
          loggedInNavbar={this.state.loggedInNavbar}
        />
        {this.state.clickedActionButton ? (
          <PickSport />
        ) : (
          <ActionButton onActionButtonClick={this.handleActionButtonClick} />
        )}
      </div>
    );
  }
}
