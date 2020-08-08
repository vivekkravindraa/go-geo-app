import React, { Component } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const mapContainerStyle = {
    height: "100vh",
    width: "100vw"
};
  
const center = {
    lat: 38.685,
    lng: -115.234
};

export default class Standalone extends Component {
    onLoad = ref => this.searchBox = ref;
  
    onPlacesChanged = () => console.log(this.searchBox.getPlaces());

    render() {
        return (
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={["places"]}>
                <GoogleMap
                    id="searchbox-example"
                    mapContainerStyle={mapContainerStyle}
                    zoom={2.5}
                    center={center}
                >
                    <StandaloneSearchBox
                        onLoad={this.onLoad}
                        onPlacesChanged={this.onPlacesChanged}
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
                    </StandaloneSearchBox>
                </GoogleMap>
            </LoadScript>
        )
    }
}