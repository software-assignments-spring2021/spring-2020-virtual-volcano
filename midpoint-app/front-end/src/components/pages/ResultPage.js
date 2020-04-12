import React, { Component } from 'react';
import Footer from '../template/Footer';
import Header from '../template/Header';
import ResultForm from '../forms/ResultForm';
import MapContainer from '../forms/MapContainer';

class ResultPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <ResultForm />
                <MapContainer
                    google={this.props.google}
                    center={{ lat: 18.5204, lng: 73.8567 }}
                    height='300px'
                    zoom={15}
                />
                <Footer />
            </div>
        )
    }
}


export default ResultPage;