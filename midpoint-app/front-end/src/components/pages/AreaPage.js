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
// import axios from 'axios'

dotenv.config();
var myapikey = process.env.REACT_APP_APIKEY
let url = "https://maps.googleapis.com/maps/api/js?key=" + myapikey + "&libraries=places"
console.log(myapikey)

class AreaPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                lat: 35.9039889,
                lng: -70.9261412,
            }
        }
    }

    componentDidMount() {
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

    render() {
        console.log("rendering is this working")
        console.log("This is the center being sent form area page")
        console.log(this.state.data)
        return (
            <div>
                <Header />
                <AreaForm />
                <Map
                    zoom={14}
                    googleMapURL={url}
                    google={this.props.google}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `500px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                 />
                 <Footer/>
            </div>
        )
    }
}

export default AreaPage;
