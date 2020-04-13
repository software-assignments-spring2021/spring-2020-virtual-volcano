import React, { Component } from 'react'
// import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, InfoWindow } from '@react-google-maps/api'
import { GoogleMap, withGoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps"
import Geocode from "react-geocode"
import Autocomplete from 'react-google-autocomplete'

Geocode.setApiKey("MYAPIKEY")
Geocode.enableDebug();

class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        }

    }

    componentDidMount() {
        Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);

                console.log('city', city, area, state);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                })
            },
            error => {
                console.error(error);
            }
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.address !== nextState.address ||
            this.state.city !== nextState.city ||
            this.state.area !== nextState.area ||
            this.state.state !== nextState.state
        ) {
            return true
        } else if (this.props.center.lat === nextProps.center.lat) {
            return false
        }
    }

    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city
            }
        }
    }

    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] ||
                        'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name
                        return area
                    }
                }
            }
        }
    }

    getState = (addressArray) => {
        let state = ''
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state
                }
            }
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onInfoWindowClose = (event) => {

    }

    onPlaceSelected = (place) => {
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        this.setState({
            address: (address) ? address : '',
            area: (area) ? area : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    }

    onMarkerDragEnd = (event) => {
        console.log('event', event);
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng(),
            addressArray = [];
        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);

                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    }
                })
            },
            error => {
                console.error(error);
            }
        )
    }

    render() {

        const Autocompletion = withScriptjs(
            withGoogleMap(
                props => (
                    <React.Fragment>
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                            }}
                            onPlaceSelected={this.onPlaceSelected}
                            types={['(regions)']}
                        />
                    </React.Fragment>
                )
            )
        )

        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <React.Fragment>

                        <GoogleMap google={this.props.google}
                            defaultZoom={this.props.zoom}
                            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                        >

                            <Marker google={this.props.google}
                                name={'Dolores park'}
                                draggable={true}
                                onDragEnd={this.onMarkerDragEnd}
                                position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                            />
                            <Marker />

                            <InfoWindow
                                onClose={this.onInfoWindowClose}
                                position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
                            >
                                <div>
                                    <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                                </div>
                            </InfoWindow>

                        </GoogleMap>
                    </React.Fragment>
                )
            )
        )

        let map;
        if (this.props.center.lat !== undefined) {
            map = <div>
                <Autocompletion
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=MYAPIKEY&libraries=places"
                    loadingElement={
                        <div style={{ height: '0px' }} />
                    }
                    containerElement={
                        <div style={{ height: '50px' }} />
                    }
                    mapElement={
                        <div style={{ height: '0px' }} />
                    }
                >

                </Autocompletion>
                <div>
                    {/* <div className="form-group">
                        <label htmlFor="">City</label>
                        <input type="text" name="city" className="form-control"
                            onChange={this.onChange} readOnly="readOnly" value={this.state.city} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Area</label>
                        <input type="text" name="area" className="form-control"
                            onChange={this.onChange} readOnly="readOnly" value={this.state.area} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">State</label>
                        <input type="text" name="state" className="form-control"
                            onChange={this.onChange} readOnly="readOnly" value={this.state.state} />
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="">Address</label>
                        <input type="text" name="address" className="form-control"
                            onChange={this.onChange} readOnly="readOnly" value={this.state.address} style={{ width: '100%' }} />
                    </div>
                    <br></br>
                </div>

                <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjZnslPWbyKrTg3vm-m9NX6iObVzX7Fkw&libraries=places"
                    loadingElement={
                        <div style={{ height: '100%' }} />
                    }
                    containerElement={
                        <div style={{ height: this.props.height }} />
                    }
                    mapElement={
                        <div style={{ height: '100%' }} />
                    }
                />
            </div>
        } else {
            map = <div style={{ height: this.props.height }} />
        }
        return (map)
    }
}

export default MapContainer

// import React, { Component } from 'react'
// import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, InfoWindow } from '@react-google-maps/api'
// import {GoogleMap, withScriptjs, InfoWindow, Marker} from "react-google-maps"

// Geocode.setApiKey("")
// Geocode.enableDebug();

// const position = {
//     lat: 40.729232,
//     lng: -73.993083
// }

// const divStyle = {
//     background: `white`,
//     border: `1px solid #ccc`,
//     padding: 15
// }

// const onLoad = (marker, infoWindow) => {
//     console.log('marker: ', marker)
//     console.log('infoWindow: ', infoWindow)

// }

// class MapContainer extends Component {

//     position = {
//         lat: 40.729232,
//         lng: -73.993083
//     }

//     state = {
//         showingInfoWindow: false,  //Hides or the shows the infoWindow
//         activeMarker: {},          //Shows the active marker upon click
//         selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
//     };




//     onLoad = (marker, infoWindow) => {
//         console.log('marker: ', marker)
//         console.log('infoWindow: ', infoWindow)
//     }

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
//             <LoadScript
//                 id="script-loader"
//                 googleMapsApiKey="Apikeyhere"
//                 libraries={["places"]}
//             >
//                 <GoogleMap
//                     id='example-map'
//                     mapContainerStyle={{
//                         height: "300px",
//                         width: "800px"
//                     }}
//                     zoom={17}
//                     center={{
//                         lat: 40.729232,
//                         lng: -73.993083
//                     }}
//                 >
//                     <Marker
//                         onLoad={onLoad}
//                         position={position}
//                         onClick={this.onMarkerClick}
//                         title={'New York University'}
//                     />
//                     <InfoWindow
//                         position={{
//                             lat: 40.729432,
//                             lng: -73.993083
//                         }}
//                         onLoad={onLoad}
//                         marker={this.state.activeMarker}
//                         visible={this.state.showingInfoWindow}
//                         onClose={this.onClose}
//                     >
//                         <div>
//                             <h4>New York University</h4>
//                             {/* <h4>{this.state.selectedPlace.name}</h4> */}
//                         </div>
//                     </InfoWindow>



//                 </GoogleMap>
//             </LoadScript >
//         )
//     }
// }

// export default MapContainer;

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
//     apiKey: ''
// })(MapContainer);