import React, { Component } from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow  
} from "react-google-maps";

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
    return (
        <GoogleMap defaultZoom={12} defaultCenter={{ lat: props.latitude, lng: props.longitude }}>
            {props.markers.map(marker => {
                const onClick = props.onClick.bind(this, marker)
                return (
                    <Marker
                        key={marker.id}
                        onClick={onClick}
                        position={{ lat: marker.latitude, lng: marker.longitude }}
                    >
                        {props.selectedMarker === marker &&
                        <InfoWindow>
                            <div>
                                {marker.location}
                            </div>
                        </InfoWindow>
                        }
                    </Marker>
                )
            })}
        </GoogleMap>
    )
})

export default class GoogleMaps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shelters: [],
            selectedMarker: false,
        }
    }
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    }
    showPosition = (position) => {
        this.setState(() => ({
            shelters: [
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            ]
        }));
    }
    handleClick = (marker, event) => {
        this.setState({ selectedMarker: marker })
    }
    render() {
        console.log('shelters', this.state.shelters);
        return (
            <MapWithAMarker
                selectedMarker={this.state.selectedMarker}
                latitude={!this.state.shelters.length ? 0 : this.state.shelters[0].latitude}
                longitude={!this.state.shelters.length ? 0 : this.state.shelters[0].longitude}
                markers={this.state.shelters}
                onClick={this.handleClick}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh`, width: `100vw` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}
