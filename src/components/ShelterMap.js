import React, { Component } from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow  
} from "react-google-maps";
import onDutyTruck from '../assets/onDutyTruck.png';
import offDutyTruck from '../assets/offDutyTruck.png';

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat:  25.211531, lng: 55.291215 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            icon={ marker.driverStatus ? { url: onDutyTruck } : { url: offDutyTruck }}
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

export default class ShelterMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trips: [
        {
          "id": "5f1282c3c5dfa42e60f3bd01",
          "driverName": "Driver Detail",
          "driverStatus": true,
          "tripNo": 1,
          "tripStatus": "onDuty",
          "loadingDetails": {
            "productDetail": "11Kg",
            "loadedQuantity": 0,
            "emptyQuantity": 0,
            "fullQuantity": 0
          },
          "locationList": [
            {
              "serialNo": "string",
              "latitude": "25.260285",
              "longitude": "55.298908",
              "creationDate": "2020-07-18T04:25:22.729Z"
            }
          ]
        },
        {
          "id": "5f1282cfc5dfa42e60f3bd02",
          "driverName": "Driver Detail",
          "driverStatus": false,
          "tripNo": 1,
          "tripStatus": "onDuty",
          "loadingDetails": {
            "productDetail": "11Kg",
            "loadedQuantity": 0,
            "emptyQuantity": 0,
            "fullQuantity": 0
          },
          "locationList": [
            {
              "serialNo": "string",
              "latitude": "25.239464",
              "longitude": "55.271553",
              "creationDate": "2020-07-18T04:25:22.729Z"
            }
          ]
        }
      ],
      shelters: [],
      selectedMarker: false,
      // shelters: [
      //   { location: "Zabeel", latitude: 25.211531, longitude:	55.291215, onDuty: true },
      //   { location: "Al Qusais Industrial Area", latitude: 25.285001, longitude:	55.380934, onDuty: false },
      //   { location: "Al Nahda 1", latitude: 25.293058, longitude:	55.362918, onDuty: true },
      //   { location: "Al Qusais 3", latitude: 25.260919, longitude:	55.394879, onDuty: false },
      //   { location: "Muhaisnah", latitude: 25.277835, longitude:	55.403518, onDuty: true },
      //   { location: "Deira", latitude: 25.275791, longitude:	55.328762, onDuty: false },
      //   { location: "Al Fahidi", latitude: 25.260285, longitude:	55.298908, onDuty: true },
      //   { location: "Al Makool", latitude: 25.250871, longitude:	55.30061, onDuty: false },
      //   { location: "Bur Dubai", latitude: 25.242466, longitude:	55.296955, onDuty: true },
      //   { location: "Jumeirah", latitude: 25.239464, longitude:	55.271553, onDuty: false },
      //   { location: "Al Satwa", latitude: 25.223611, longitude:	55.277592, onDuty: true },
      //   { location: "Al Bada'a", latitude: 25.220959, longitude:	55.266971, onDuty: false },
      //   { location: "Al Satwa", latitude: 25.209818, longitude:	55.269581, onDuty: true },
      //   { location: "Jumeirah 2", latitude: 25.200136, longitude:	55.239225, onDuty: false },
      //   { location: "Al Wasl", latitude: 25.191747, longitude:	55.250368, onDuty: true },
      //   { location: "Al Safa 1", latitude: 25.180763, longitude:	55.242983, onDuty: false },
      //   { location: "First Al Khail St", latitude: 25.166748, longitude:	55.248881, onDuty: true },
      //   { location: "Umm Suqeim", latitude: 25.162203, longitude:	55.213874, onDuty: false },
      //   { location: "Al Quoz", latitude: 25.146663, longitude:	55.240077, onDuty: true },
      //   { location: "Al Barsha 2", latitude: 25.100273, longitude:	55.206238, onDuty: false },
      //   { location: "Al Sufouh 2", latitude: 25.105745, longitude:	55.170724, onDuty: true },
      //   { location: "Jumeirah Village Circle", latitude: 25.058057, longitude:	55.213802, onDuty: false },
      //   { location: "Discovery Gardens", latitude: 25.038013, longitude:	55.147737, onDuty: true },
      //   { location: "Jumeirah Islands", latitude: 25.057982, longitude:	55.15122, onDuty: false }
      // ],
    }
  }
  componentDidMount() {
    let shelters = [];
    this.state.trips.forEach((item) => {
      console.log(item.locationList);
      item.locationList.forEach((location) => {
        shelters.push({
          driverStatus: item.driverStatus,
          latitude: Number(location.latitude),
          longitude: Number(location.longitude)
        })
      })
    })
    this.setState({ shelters });
    // fetch("https://api.harveyneeds.org/api/v1/shelters?limit=20")
    //   .then(r => r.json())
    //   .then(data => {
    //     this.setState({ shelters: data.shelters })
    //   })
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker })
  }
  render() {
    console.log('shelters', this.state.shelters);
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
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