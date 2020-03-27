import React, { Component } from 'react';
import Footer from '../template/Footer';
import Header from '../template/Header';
import ResultForm from '../forms/ResultForm';

function ResultPage(props) {
    return (
        <div>
            <Header />
            <ResultForm />
            <Footer />
        </div>
    )
}

export default ResultPage;