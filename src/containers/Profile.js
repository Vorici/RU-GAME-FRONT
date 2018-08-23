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
import { Grid, Segment, Sticky } from 'semantic-ui-react';

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
  userGames: state.userGames,
  games: state.games
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedActionButton: false,
      showFriends: false,
      sportTerm: null,
      sport: null,
      toast: false,
      errorToast: false,
      contextRef: '',
      check: false
    };
  }

  componentDidMount() {
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
        fetch(USER_GAMES_URL)
          .then((ug) => ug.json())
          .then((userGames) =>
            this.props.getUserGames(JSON.parse(userGames.userGames))
          );
      }
    });
  };

  addFriendToDatabase = (friendId) => {
    const ADD_FRIEND_URL = 'http://localhost:5000/friends/create';
    const FRIENDS_URL = `http://localhost:5000/friends/${this.props.userId}`;
    const userId = this.props.userId;

    const postConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        friendship: {
          user_id: userId,
          friend_id: friendId
        }
      })
    };

    return fetch(ADD_FRIEND_URL, postConfig).then((j) => {
      if (j.status === 200) {
        fetch(FRIENDS_URL)
          .then((f) => f.json())
          .then((friends) => this.props.getTheFriends(friends));
      }
    });
  };

  deleteFriendship = (friendId) => {
    const DELETE_FRIEND_URL = 'http://localhost:5000/friends/destroy';
    const FRIENDS_URL = `http://localhost:5000/friends/${this.props.userId}`;
    const userId = this.props.userId;

    const postConfig = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        friendship: {
          user_id: userId,
          friend_id: friendId
        }
      })
    };

    return fetch(DELETE_FRIEND_URL, postConfig).then((j) => {
      if (j.status === 200) {
        alert('deleted');
        fetch(FRIENDS_URL)
          .then((f) => f.json())
          .then((friends) => this.props.getTheFriends(friends));
      }
    });
  };

  handleAddingFriend = (friend) => {
    this.addFriendToDatabase(friend.id);
  };

  handleDeletingFriend = (friendId) => {
    this.deleteFriendship(friendId);
  };

  handleShowFriendsClick = () => {
    this.setState({
      showFriends: true
    });
  };

  handleShowAllUsersClick = () => {
    this.setState({
      showFriends: false
    });
  };

  handleLeaveGame = (game) => {
    console.log('AAAAAAA', game);
    const LEAVE_GAME_URL = `http://localhost:5000/game/${game.id}`;
    const GAMES_URL = 'http://localhost:5000/games';
    const USER_GAMES_URL = `http://localhost:5000/users/${this.props.userId}`;

    const postConfig = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(LEAVE_GAME_URL, postConfig).then((j) => {
      if (j.status === 200) {
        alert('Deleted Game from your history');
        fetch(GAMES_URL)
          .then((g) => g.json())
          .then((games) => this.props.getTheGames(games));
        fetch(USER_GAMES_URL)
          .then((ug) => ug.json())
          .then((userGames) =>
            this.props.getUserGames(JSON.parse(userGames.userGames))
          )
          .then(
            this.setState({
              check: true
            })
          );
      }
    });
  };

  handleContextRef = (contextRef) => this.setState({ contextRef });

  render() {
    const { contextRef } = this.state;
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
                  <UserPaper
                    handleShowAllUsersClick={this.handleShowAllUsersClick}
                    showFriends={this.state.showFriends}
                    userFriends={this.props.userFriends}
                    handleAddingFriend={this.handleAddingFriend}
                    handleDeletingFriend={this.handleDeletingFriend}
                    users={this.props.users}
                    friends={this.props.userFriends}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={8}>
                <Segment>
                  <FullWidthTabs // onMyGamesTabChange={this.handleMyGamesTabChange}
                    handleLeaveGame={this.handleLeaveGame}
                    userId={this.props.userId}
                    onJoinGameClick={this.handleJoinGame}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <ProfileCard
                    userFriends={this.props.userFriends}
                    username={this.props.username}
                    email={this.props.userEmail}
                    onShowFriendsClick={this.handleShowFriendsClick}
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
