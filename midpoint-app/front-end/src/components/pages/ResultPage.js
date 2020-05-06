import React, { Component } from 'react';
import Footer from '../template/Footer';
import Header from '../template/Header';
import ResultForm from '../forms/ResultForm';
import MapContainer from '../forms/MapContainer';
import axios from "axios";

class ResultPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                lat: 35.9039889,
                lng: -70.9261412,
                
            },
            name: 'Midpoint Location'
        }
    }

    //   get the final midpoint location
    componentDidMount() {
        axios.get("http://localhost:3000/result")
            .then((response) => {
                console.log("These are the coordinates");
                console.log(response);

                this.setState({ data: response.data })
                console.log(this.state.data);
                console.log(typeof (parseFloat(this.state.data.lat)));
                console.log("is this working")
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get("http://localhost:3000/name")
        .then((response) => {
            console.log("This is the midpoint name");
            console.log(response);
            this.setState({ name: response.data})
        })
        .catch((error) => {
            console.log(error);
        });
    }


    render() {
        console.log(this.state.data.lat);
        return (
            <div>
                <Header />
                <h3 style = {{textAlign: "center"}}>Your Midpoint is: {this.state.name}</h3>
                <ResultForm />
                <MapContainer
                    google={this.props.google}
                    center={{ lat: this.state.data.lat, lng: this.state.data.lng }}
                    height='450px'
                    zoom={15}
                />
                <Footer />
            </div>
        )
    }
}


export default ResultPage;
