import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGames } from '../redux/actions';
import ActionButton from '../components/ActionButton';
import PickSport from '../components/PickSport';
import Map from '../components/Map';
import GameListItem from '../components/GameListItem';
import FullWidthTabs from '../components/FullWidthTabs';
import ProfileCard from '../components/ProfileCard';

const GAMES_URL = 'http://localhost:5000/games';

const mapDispatchToProps = (dispatch) => ({
  getTheGames: (games) => dispatch(getGames(games))
});

class Profile extends Component {
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
      .then((games) => this.props.getTheGames(games));
  }

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
    console.log(this.props);
    return (
      <div>
        {this.state.sportTerm ? (
          <Map sportTerm={this.state.sportTerm} sport={this.state.sport} />
        ) : this.state.clickedActionButton ? (
          <PickSport onSportClick={this.handleSportClick} />
        ) : (
          <div className="gamelist">
            <FullWidthTabs />
            <div className="card">
              <ProfileCard />
            </div>
            <div className="actionbutton">
              <ActionButton
                onActionButtonClick={this.handleActionButtonClick}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Profile);
