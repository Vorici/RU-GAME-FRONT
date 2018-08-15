import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import ActionButton from '../components/ActionButton';
import PickSport from '../components/PickSport';
import Map from '../components/Map';
import GameListItem from '../components/GameListItem';

const GAMES_URL = 'http://localhost:5000/games';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      loggedInNavbar: true,
      clickedActionButton: false,
      sportTerm: null,
      sport: null
    };
  }

  componentDidMount() {
    fetch(GAMES_URL)
      .then((r) => r.json())
      .then((games) =>
        this.setState({
          games
        })
      );
  }

  renderGameInstances = () => {
    return this.state.games.map((game) => (
      <GameListItem key={game.id} game={game} />
    ));
  };

  handleActionButtonClick = () => {
    this.setState({
      clickedActionButton: true
    });
  };

  handleSportClick = (sportTerm, sport) => {
    this.setState({
      sportTerm,
      sport
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
          <Map
            loggedInUser={this.props.loggedInUser}
            sportTerm={this.state.sportTerm}
            sport={this.state.sport}
          />
        ) : this.state.clickedActionButton ? (
          <PickSport onSportClick={this.handleSportClick} />
        ) : (
          <div>
            {this.renderGameInstances()}
            <ActionButton onActionButtonClick={this.handleActionButtonClick} />
          </div>
        )}
      </div>
    );
  }
}
