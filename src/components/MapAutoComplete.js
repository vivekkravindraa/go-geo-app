import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete, InfoWindow } from '@react-google-maps/api';
import logo from '../logo.svg';

const mapContainerStyle = { height: "100vh", width: "100vw" };

const center = { lat: 12, lng: 77 };

const places = [ "places" ];

const divStyle = { background: "transparent !important" };

export default class MapAutoComplete extends Component {
    constructor (props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            address: ':)'
        }
        this.autocomplete = null;
        this.onLoad = this.onLoad.bind(this);
        this.onPlaceChanged = this.onPlaceChanged.bind(this);
    }

    onLoad (autocomplete) {
        console.log('autocomplete: ', autocomplete);
        this.autocomplete = autocomplete;
    }

    onPlaceChanged () {
        if (this.autocomplete !== null) {
            console.log('result', this.autocomplete.getPlace());

            let place = this.autocomplete.getPlace();
            if (place.geometry) {
                console.log(place.geometry);
                let lat = place.geometry.viewport.Za.i;
                let lng = place.geometry.viewport.Va.i;
                let address = place.formatted_address;
                this.setState({ lat, lng, address });
            }
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    render () {
        return (
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={places}>
                <GoogleMap
                    id="searchbox-example"
                    mapContainerStyle={mapContainerStyle}
                    zoom={7}
                    center={center}
                >
                    <Autocomplete
                        onLoad={this.onLoad}
                        onPlaceChanged={this.onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Customized your placeholder"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px"
                            }}
                        />
                    </Autocomplete>
                    <Marker
                        position={{
                            lat: this.state.lat,
                            lng: this.state.lng
                        }}
                    >
                        <InfoWindow
                            position={{
                                lat: this.state.lat,
                                lng: this.state.lng
                            }}
                        >
                            <div style={divStyle}>
                                <img src={logo} alt="no_image" height="25" width="25" />
                            </div>
                        </InfoWindow>
                    </Marker>
                </GoogleMap>
            </LoadScript>
        )
    }
}