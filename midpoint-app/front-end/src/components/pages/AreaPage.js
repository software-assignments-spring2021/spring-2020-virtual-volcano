import React, { Component } from 'react';
import Footer from '../template/Footer';
import Header from '../template/Header';
import AreaForm from '../forms/AreaForm';
import MapContainer from '../forms/MapContainer';
import { Link } from "react-router-dom";
import axios from 'axios';
import ReactDOM from "react-dom";
import dotenv from "dotenv"
import Map from '../forms/Map'

dotenv.config();
var myapikey = process.env.REACT_APP_APIKEY
let url = "https://maps.googleapis.com/maps/api/js?key=" + myapikey + "&libraries=places"

class AreaPage extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            data: {
                lat: 35.9039889,
                lng: -70.9261412,
            }
        }
    }

    //   get the calculated midpoint coordinates
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
        axios.get("http://localhost:3000/area")
            .then((response) => {
                console.log("These are the coordinates");
                console.log(response);
                this.setState({ data: response.data })
                console.log(this.state.data);
                console.log(typeof (parseFloat(this.state.data.lat)));
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
      }

    render() {
        return (
            <div>
                <Header />
                <AreaForm />
                <Map
                    googleMapURL={url}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center={{ lat: this.state.data.lat, lng: this.state.data.lng }}
                    zoom={14}
                 />
                 <Footer/>
            </div>
            // <div>
            //     <Header />
            //     <AreaForm />
            //     {/* Link to final calculated midpoint page instead of login */}
            //     {/* <Link to='/login'>Login</Link> */}
            //     <MapContainer
            //         google={this.props.google}
            //         //center={{ lat: 18.5204, lng: 73.8567 }}
            //         center={{ lat: this.state.data.lat, lng: this.state.data.lng }}
            //         height='300px'
            //         zoom={15}
            //         //drop down in area form needs to choose this value
            //         //radius={161} //.1 mile
            //         // radius={402} //.25 mile
            //         //radius={804} //.5 mile
            //     />
            //     <Footer />
            // </div>
        )
    }
}

export default AreaPage;
