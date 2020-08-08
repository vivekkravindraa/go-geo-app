import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const mapContainerStyle = { height: "600px", width: "600px" };

const center = { lat: 24.886, lng: -70.268 };

const paths = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }
];

const options = {
    fillColor: "lightblue",
    fillOpacity: 1,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
};

export default class Polygon extends Component {
    onLoad = polygon => { console.log("polygon: ", polygon); };
    
    render() {
        return (
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
                <GoogleMap
                    id="marker-example"
                    mapContainerStyle={mapContainerStyle}
                    zoom={5}
                    center={center}
                >
                <Polygon
                    onLoad={this.onLoad}
                    paths={paths}
                    options={options}
                />
                </GoogleMap>
            </LoadScript>
        )
    }
}
