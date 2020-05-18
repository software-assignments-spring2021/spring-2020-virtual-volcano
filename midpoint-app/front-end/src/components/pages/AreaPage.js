import React, { Component } from 'react';
//import Footer from '../template/Footer';
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
            },
            selectValue: ""
        };
        // this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    // handleDropdownChange(e) {
    //     this.setState({ selectValue: e.target.value });
    //     // console.log("the state is");
    //     // console.log(this.state.selectValue);
    //   }

    componentDidMount() {
        // axios.get("http://localhost:3000/area")
        axios.get("/area")
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
                {/* <div>
            <div>
                <select id="dropdown" onChange={this.handleDropdownChange}>
                <option value="N/A">N/A</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                </select>
            </div>
            <div>Selected value is : {this.state.selectValue}</div>
            </div> */}
                <Map
                    zoom={14}
                    googleMapURL={url}
                    google={this.props.google}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `500px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                 />
                 {/* <Footer/> */}
            </div>
        )
    }
}

export default AreaPage;
