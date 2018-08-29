/* eslint-disable no-undef */
import React from 'react';
import { getGames, getUserGames } from '../redux/actions';
import { connect } from 'react-redux';
import CreateGameForm from './CreateGameForm';
import { compose, withProps, withHandlers, withState } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import Profile from '../containers/Profile';

let SPORT_SEARCH_QUERY;
const MAP_URL = 'HIDDDDDEEENNNNNNNN MAP WILL BREAK ASK ADMIN FOR KEY';

const mapStateToProps = state => ({
  username: state.usernameInputField,
  userId: state.loggedInUserId
});

const mapDispatchToProps = dispatch => ({
  getTheGames: games => dispatch(getGames(games)),
  getUserGames: userGames => dispatch(getUserGames(userGames))
});

const MyMapComponent = compose(
  withProps({
    googleMapURL: MAP_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `900px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  withState('places', 'updatePlaces', ''),
  withHandlers(() => {
    const refs = {
      map: undefined
    };
    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },
      fetchPlaces: ({ updatePlaces }) => {
        const bounds = refs.map.getBounds();
        const service = new google.maps.places.PlacesService(
          refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        );
        const request = {
          bounds: bounds,
          location: 'New York City',
          query: SPORT_SEARCH_QUERY
        };
        service.textSearch(request, (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            // console.log(results);
            updatePlaces(results);
          }
        });
      }
    };
  })
)(props => {
  return (
    <GoogleMap
      onTilesLoaded={props.fetchPlaces}
      ref={props.onMapMounted}
      onBoundsChanged={props.fetchPlaces}
      defaultZoom={15}
      defaultCenter={{ lat: 40.7236474, lng: -73.9985707 }}
    >
      {props.places &&
        props.places.map((place, i) => (
          <Marker
            onClick={() => props.onPlaceClick(place)}
            key={i}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }}
          />
        ))}
    </GoogleMap>
  );
});

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      createdGameAndShowProfile: false,
      placeName: null,
      placeAddress: null,
      placeHours: false,
      placePhotos: [],
      placeSport: this.props.sport,
      placeDate: null,
      placeTime: null,
      placeComments: null,
      placeMaxPlayers: null
    };

    SPORT_SEARCH_QUERY = this.props.sportTerm;
  }
  getPlace = place => {
    console.log(place);
    this.setState({
      placeName: place.name,
      placeAddress: place.formatted_address,
      placeHours: place.opening_hours,
      placePhotos: place.photos
    });
  };

  handleGettingDate = event => {
    this.setState({
      placeDate: event.target.value
    });
  };

  handleGettingTime = event => {
    this.setState({
      placeTime: event.target.value
    });
  };

  handleGettingComments = event => {
    this.setState({
      placeComments: event.target.value
    });
  };

  handleGettingMaxPlayers = event => {
    this.setState({
      placeMaxPlayers: event.target.value
    });
  };

  handleCreateGameSubmit = () => {
    const CREATE_GAME_URL = 'http://localhost:5000/games/create';

    const GAMES_URL = 'http://localhost:5000/games';
    const USER_GAMES_URL = `http://localhost:5000/users/${this.props.userId}`;

    const created_by_username = this.props.username;
    const name = this.state.placeName;
    const address = this.state.placeAddress;
    const sport = this.state.placeSport;
    const date = this.state.placeDate;
    const time = this.state.placeTime;
    const comments = this.state.placeComments;
    const max_players = this.state.placeMaxPlayers;
    const postConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        game: {
          created_by_username,
          name,
          address,
          sport,
          date,
          time,
          comments,
          max_players
        }
      })
    };
    fetch(CREATE_GAME_URL, postConfig).then(r => r.json());
    fetch(GAMES_URL)
      .then(g => g.json())
      .then(games => this.props.getTheGames(games));
    fetch(USER_GAMES_URL)
      .then(ug => ug.json())
      .then(userGames =>
        this.props.getUserGames(JSON.parse(userGames.userGames))
      )
      .then(
        this.setState({
          createdGameAndShowProfile: true
        })
      );
  };

  renderProfile = () => {
    if (this.state.createdGameAndShowProfile) {
      return (
        <div>
          <Profile />
        </div>
      );
    } else {
      return (
        <div>
          {this.state.placeName ? (
            <CreateGameForm
              onDateChange={this.handleGettingDate}
              onTimeChange={this.handleGettingTime}
              onCommentsChange={this.handleGettingComments}
              onMaxPlayersChange={this.handleGettingMaxPlayers}
              onCreateGameFormSubmit={this.handleCreateGameSubmit}
              placeName={this.state.placeName}
              placeAddress={this.state.placeAddress}
              placeHours={this.state.placeHours}
            />
          ) : null}
          <MyMapComponent onPlaceClick={this.getPlace} />
        </div>
      );
    }
  };

  render() {
    return this.renderProfile();
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
