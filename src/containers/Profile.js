import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGames, getUserGames, getFriends, getUsers } from '../redux/actions';
import ActionButton from '../components/ActionButton';
import PickSport from '../components/PickSport';
import Map from '../components/Map';
import FullWidthTabs from '../components/FullWidthTabs';
import ProfileCard from '../components/ProfileCard';
import Toast from '../components/Toast';
import ErrorToast from '../components/ErrorToast';
import UserPaper from './UserPaper';
import { Grid, Segment } from 'semantic-ui-react';

const mapDispatchToProps = (dispatch) => ({
  getTheGames: (games) => dispatch(getGames(games)),
  getAllUsers: (users) => dispatch(getUsers(users)),
  getUserGames: (userGames) => dispatch(getUserGames(userGames)),
  getTheFriends: (friends) => dispatch(getFriends(friends))
});

const mapStateToProps = (state) => ({
  userEmail: state.emailInputField,
  users: state.users,
  username: state.loggedInUser,
  userId: state.loggedInUserId,
  userFriends: state.userFriends,
  userGames: state.userGames
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedActionButton: false,
      sportTerm: null,
      sport: null,
      toast: false,
      errorToast: false
    };
  }

  componentDidMount() {
    console.log('SHIMMMMY', this.props.userId);
    const USERS_URL = 'http://localhost:5000/everyuser';
    const GAMES_URL = 'http://localhost:5000/games';
    const USER_GAMES_URL = `http://localhost:5000/users/${this.props.userId}`;
    const FRIENDS_URL = `http://localhost:5000/friends/${this.props.userId}`;

    fetch(GAMES_URL)
      .then((g) => g.json())
      .then((games) => this.props.getTheGames(games));
    fetch(USER_GAMES_URL)
      .then((ug) => ug.json())
      .then((userGames) =>
        this.props.getUserGames(JSON.parse(userGames.userGames))
      );
    fetch(FRIENDS_URL)
      .then((f) => f.json())
      .then((friends) => this.props.getTheFriends(friends));
    fetch(USERS_URL)
      .then((u) => u.json())
      .then((users) => this.props.getAllUsers(users));
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

  handleJoinGame = (game) => {
    console.log('GAMEEEEEEEEECALLBACK', game);
    const JOIN_GAME_URL = 'http://localhost:5000/usergames/create';
    const USER_GAMES_URL = `http://localhost:5000/users/${this.props.userId}`;

    const userId = this.props.userId;
    const gameId = game.id;

    const postConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        join: {
          user_id: userId,
          game_id: gameId
        }
      })
    };
    return fetch(JOIN_GAME_URL, postConfig).then((j) => {
      if (j.status === 200) {
        this.setState({
          toast: true
        });
        fetch(USER_GAMES_URL)
          .then((ug) => ug.json())
          .then((userGames) =>
            this.props.getUserGames(JSON.parse(userGames.userGames))
          );
      } else {
        this.setState({
          errorToast: true
        });
      }
    });
  };

  handleMyGamesTabChange = () => {
    const USER_GAMES_URL = `http://localhost:5000/users/${this.props.userId}`;

    fetch(USER_GAMES_URL)
      .then((ug) => ug.json())
      .then((userGames) =>
        this.props.getUserGames(JSON.parse(userGames.userGames))
      );
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.state.sportTerm ? (
          <Map
            userGames={this.props.userGames}
            sportTerm={this.state.sportTerm}
            sport={this.state.sport}
          />
        ) : this.state.clickedActionButton ? (
          <PickSport onSportClick={this.handleSportClick} />
        ) : (
          <div className="gamelist">
            <Grid columns="equal">
              <Grid.Column>
                <Segment>
                  <UserPaper users={this.props.users} />
                </Segment>
              </Grid.Column>
              <Grid.Column width={8}>
                <Segment>
                  <FullWidthTabs
                    onMyGamesTabChange={this.handleMyGamesTabChange}
                    userId={this.props.userId}
                    onJoinGameClick={this.handleJoinGame}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <ProfileCard
                    username={this.props.username}
                    email={this.props.userEmail}
                  />
                </Segment>
              </Grid.Column>
              {/* <div className="friendlist">
              <UserFriendsList friends={this.props.userFriends} /> */}

              <div className="actionbutton">
                <ActionButton
                  onActionButtonClick={this.handleActionButtonClick}
                />
              </div>
              {/* {this.state.toast && (
                    <div>
                      <Toast />
                    </div>
                  )}
                  {this.state.ErrorToast && (
                    <div>
                      <ErrorToast />
                    </div> */}
              {/* )} */}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
