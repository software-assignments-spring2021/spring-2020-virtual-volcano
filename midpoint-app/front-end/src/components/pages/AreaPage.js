import React, { Component } from 'react';
import Footer from '../template/Footer';
import Header from '../template/Header';
import AreaForm from '../forms/AreaForm';

function AreaPage (props) {
        return (
            <div>
                <Header />
                <AreaForm />
                {/* Link to final calculated midpoint page instead of login */}
                {/* <Link to='/login'>Login</Link> */}
                <Footer />
            </div>
        )
}

export default AreaPage;