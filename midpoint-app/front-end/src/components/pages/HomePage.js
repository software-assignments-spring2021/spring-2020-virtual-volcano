import React, { Component } from 'react';

import { Link } from "react-router-dom";
import Footer from '../template/Footer';
import Header from '../template/Header';
import HomeForm from '../forms/HomeForm';
// import SideBar from "../../sidebar";

class HomePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <HomeForm />
                {/* <Link to='/login'>Login</Link> */}
                {/* <Link to='/area'>Area</Link> */}
                <Footer />
            </div>
        )
    }
}

export default HomePage;
