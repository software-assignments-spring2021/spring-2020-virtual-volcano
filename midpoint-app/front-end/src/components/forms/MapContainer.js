import React, { Component } from 'react'
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, InfoWindow } from '@react-google-maps/api'

const position = {
    lat: 40.729232,
    lng: -73.993083
}

const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
}

const onLoad = (marker, infoWindow) => {
    console.log('marker: ', marker)
    console.log('infoWindow: ', infoWindow)

}

class MapContainer extends Component {

    position = {
        lat: 40.729232,
        lng: -73.993083
    }

    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };




    onLoad = (marker, infoWindow) => {
        console.log('marker: ', marker)
        console.log('infoWindow: ', infoWindow)
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyA-aPju661HDO3qXNAbXnVRaV0Yh3AGQBE"
                libraries={["places"]}
            >
                <GoogleMap
                    id='example-map'
                    mapContainerStyle={{
                        height: "300px",
                        width: "800px"
                    }}
                    zoom={17}
                    center={{
                        lat: 40.729232,
                        lng: -73.993083
                    }}
                >
                    <Marker
                        onLoad={onLoad}
                        position={position}
                        onClick={this.onMarkerClick}
                        title={'New York University'}
                    />
                    <InfoWindow
                        position={{
                            lat: 40.729432,
                            lng: -73.993083
                        }}
                        onLoad={onLoad}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>New York University</h4>
                            {/* <h4>{this.state.selectedPlace.name}</h4> */}
                        </div>
                    </InfoWindow>



                </GoogleMap>
            </LoadScript >
        )
    }
}

export default MapContainer;

// import React from 'react';
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import ReactDOM from 'react-dom';

// class MapContainer extends React.Component {

//     state = {
//         showingInfoWindow: false,  //Hides or the shows the infoWindow
//         activeMarker: {},          //Shows the active marker upon click
//         selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
//     };

//     onMarkerClick = (props, marker, e) =>
//         this.setState({
//             selectedPlace: props,
//             activeMarker: marker,
//             showingInfoWindow: true
//         });

//     onClose = props => {
//         if (this.state.showingInfoWindow) {
//             this.setState({
//                 showingInfoWindow: false,
//                 activeMarker: null
//             });
//         }
//     };

//     render() {
//         return (
//             <Map mapContainerClassName="map"
//                 google={this.props.google}
//                 zoom={17}
//                 initialCenter={{ lat: 40.729232, lng: -73.993083 }}

//             >
//                 <Marker
//                     onClick={this.onMarkerClick}
//                     name={'New York University'}
//                 />
//                 <InfoWindow
//                     marker={this.state.activeMarker}
//                     visible={this.state.showingInfoWindow}
//                     onClose={this.onClose}
//                 >
//                     <div>
//                         <h4>{this.state.selectedPlace.name}</h4>
//                     </div>
//                 </InfoWindow>
//             </Map >
//         );
//     }
// }

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyDSXHPcDhkdlPdDPBR0zNqww051lOJcXxs'
// })(MapContainer);