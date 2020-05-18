import React from "react";
import SignupForm from '../forms/SignupForm'
import Footer from '../template/Footer';
import Header from '../template/Header';
import { withRouter, BrowserRouter } from 'react-router-dom';
import axios from "axios";


class SignupPage extends React.Component {

    submit = (data) => {
        axios.post('/signup', data)
            .then(function (response) {
                console.log("Success posting");
                console.log(response);

            }).catch(function (error) {
                console.log(data)
                console.log("Error posting");
                console.log(error);
            });

        //just to make sure we actually get data 
        console.log(data);
        this.props.history.push('/login');
    };

    render() {
        return (
            <div>
                <Header />
                <SignupForm submit={this.submit} />
                <Footer />
            </div>
        )
    }
}

export default SignupPage;