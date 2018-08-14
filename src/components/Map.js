/* eslint-disable no-undef */
import React from 'react';
import CreateGameForm from './CreateGameForm';
import { compose, withProps, withHandlers, withState } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MAP_URL =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDWyyxEiv9VWEbIjgIaekAKxpiVMC5sj9A&v=3.exp&libraries=geometry,drawing,places';
let sportTerm;

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
      onMapMounted: () => (ref) => {
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
          query: sportTerm
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
)((props) => {
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

export default class MyFancyComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      placeName: null,
      placeAddress: null,
      placeHours: false,
      placePhotos: []
    };

    sportTerm = this.props.sportTerm;
  }
  getPlace = (place) => {
    console.log(place);
    this.setState({
      placeName: place.name,
      placeAddress: place.formatted_address,
      placeHours: place.opening_hours,
      placePhotos: place.photos
    });
  };

  render() {
    return (
      <div>
        {this.state.placeName ? (
          <CreateGameForm
            placeName={this.state.placeName}
            placeAddress={this.state.placeAddress}
            placeHours={this.state.placeHours}
          />
        ) : null}

        <MyMapComponent onPlaceClick={this.getPlace} />
      </div>
    );
  }
}
