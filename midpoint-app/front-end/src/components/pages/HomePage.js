import React, { Component } from 'react';

import { Link } from "react-router-dom";
import Footer from '../template/Footer';
import Header from '../template/Header';
import HomeForm from '../forms/HomeForm';

class HomePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1>Home Page!</h1>
                <HomeForm />
                <Link to='/login'>Login</Link>
                <Footer />
            </div>
        )
    }
}

export default HomePage;
