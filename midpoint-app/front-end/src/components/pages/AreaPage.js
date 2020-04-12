import React, { Component } from 'react';
import Footer from '../template/Footer';
import Header from '../template/Header';
import AreaForm from '../forms/AreaForm';
import MapContainer from '../forms/MapContainer';
// import SideBar from "../../sidebar";
import { Link } from "react-router-dom";
import { BrowserRouter } as Router from "react-router-dom";

class AreaPage extends Component {
    render() {
        return (
            <Router>
            <div>
                <Header />
                <AreaForm />
                {/* Link to final calculated midpoint page instead of login */}
                <Link to='login'>Login</Link>
                {/* <Link to='/login'>Login</Link> */}
                <MapContainer
                    google={this.props.google}
                    center={{ lat: 18.5204, lng: 73.8567 }}
                    height='300px'
                    zoom={15}
                />
     
                <Footer />
                </Router>
            </div>
        )
    }
}

export default AreaPage;
