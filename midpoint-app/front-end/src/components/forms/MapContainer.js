import React, { Component } from 'react'
// import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, InfoWindow } from '@react-google-maps/api'
import { GoogleMap, withGoogleMap, withScriptjs, InfoWindow, Marker, Circle } from "react-google-maps"
import Geocode from "react-geocode"
import Autocomplete from 'react-google-autocomplete'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' });
var myapikey = process.env.REACT_APP_APIKEY

Geocode.setApiKey(myapikey)
Geocode.enableDebug();

console.log(myapikey)
var mapurl = "https://maps.googleapis.com/maps/api/js?key=" + myapikey + "&libraries=places"
console.log(mapurl)
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
            },
            radius: this.props.radius
        }

    }

    handleSubmit = event => {
        event.preventDefault();

        const user1latlng = {
            lat: this.state.markerPosition.lat,
            lng: this.state.markerPosition.lng
        }

        // axios.post('http://localhost:3000', { user1latlng })
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //     })
        //     .catch(function (error) {
        //         console.log("Error posting");
        //         console.log(error);
        //     });
    }

    componentDidMount() {
        console.log("here did mount")
        console.log(this.state.mapPosition);
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
            this.state.state !== nextState.state ||
            this.state.mapPosition.lat !== nextState.mapPosition.lat
        ) {
            return true
        } else if (this.props.center.lat === nextProps.center.lat) {
            return false
        } else {
            console.log("UPDATE!!!")
            return true
        }
    }

    componentDidUpdate(prevProps) {
        console.log("here update!")
        console.log(prevProps)
        console.log(this.state)
        Geocode.fromLatLng(prevProps.center.lat, prevProps.center.lng).then(
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
                    markerPosition: {
                        lat: prevProps.center.lat,
                        lng: prevProps.center.lng
                    },
                    mapPosition: {
                        lat: prevProps.center.lat,
                        lng: prevProps.center.lng
                    },

                })
            },
            error => {
                console.error(error);
            }
        )
    }

    // componentDidUpdate(prevProps) {
    //     console.log(this.props.state.mapPosition.lat);
    //     // if (this.props.state.mapPosition.lat !== prevProps.state.mapPosition.lat) {
    //     //     console.log('different!');
    //     //     console.log(this.props.state.mapPosition.lat);
    //     //     console.log(prevProps.state.mapPosition.lat);

    //     // }
    // }

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
                    },
                    mapPosition: {
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
                            // service = {this.places.PlacesService(map)}
                        >   

                            <Marker google={this.props.google}
                                name={'Dolores park'}
                                draggable={false}
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

                            <Circle google={this.props.google} 
                            center={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                            radius={this.state.radius} //0.1 miles = 161 meters
                            >
                            </Circle>

                        </GoogleMap>
                    </React.Fragment>
                )
            )
        )

        let map;
        if (this.props.center.lat !== undefined) {
            map = <div>
                {/* <Autocompletion
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

                </Autocompletion> */}
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
                    {/* <div className="form-group">
                        <label htmlFor="">Address</label>
                        <input type="text" name="address" className="form-control"
                            onChange={this.onChange} readOnly="readOnly" value={this.state.address} style={{ width: '100%' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Lat</label>
                        <input type="text" name="lat" className="form-control"
                            onChange={this.onChange} readOnly="readOnly" value={this.state.mapPosition.lat} style={{ width: '100%' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Lng</label>
                        <input type="text" name="lng" className="form-control"
                            onChange={this.onChange} readOnly="readOnly" value={this.state.mapPosition.lng} style={{ width: '100%' }} />
                    </div> */}
                    <br></br>
                </div>

                <AsyncMap
                    googleMapURL={mapurl}
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

export default MapContainer;
