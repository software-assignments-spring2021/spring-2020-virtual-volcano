import React, { Component } from 'react';

import { Link } from "react-router-dom";
import Footer from '../common/Footer';
import Header from '../common/Header';

class HomePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1>Home Page!</h1>
                <Link to='/login'>Login</Link>
                <Footer />
            </div>
        )
    }
}

export default HomePage;