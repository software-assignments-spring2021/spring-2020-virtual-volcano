import React, { Component } from 'react';

import { Link } from "react-router-dom";
import Footer from '../template/Footer';
import Header from '../template/Header';
import HomeForm from '../forms/HomeForm'
// import MapContainer from '../forms/MapContainer';
// import SideBar from "../../sidebar";
import axios from 'axios';

class HomePage extends Component {

    submit = (data) => {
        console.log(data);
        //   //try to post request
        axios.post('http://localhost:3000/', data)
            .then(function (response) {
                console.log("Success posting the all coordinates");
                console.log(response);
            }).catch(function (error) {
                console.log("Error posting");
                console.log(error);
            });
        this.props.history.push('/result');
    }

    render() {
        return (
            <div>
                <Header />
                <HomeForm submit={this.submit} />
                <Footer />
            </div>
        )
    }
}

export default HomePage;
