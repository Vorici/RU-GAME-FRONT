import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import ActionButton from '../components/ActionButton';
import PickSport from '../components/PickSport';
import Map from '../components/Map';
import { componentFromProp } from '../../node_modules/recompose';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInNavbar: true,
      clickedActionButton: false,
      sportTerm: null
    };
  }

  handleActionButtonClick = () => {
    this.setState({
      clickedActionButton: true
    });
  };

  handleSportClick = (sportTerm) => {
    this.setState({
      sportTerm
    });
  };

  render() {
    return (
      <div>
        <Navbar
          loggedInUser={this.props.loggedInUser}
          loggedInNavbar={this.state.loggedInNavbar}
        />
        {this.state.sportTerm ? (
          <Map sportTerm={this.state.sportTerm} />
        ) : this.state.clickedActionButton ? (
          <PickSport onSportClick={this.handleSportClick} />
        ) : (
          <ActionButton onActionButtonClick={this.handleActionButtonClick} />
        )}
      </div>
    );
  }
}
