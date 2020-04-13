import React from "react";
import LoginForm from '../forms/LoginForm'
import Footer from '../template/Footer';
import Header from '../template/Header';
import {withRouter, BrowserRouter } from 'react-router-dom';


class LoginPage extends React.Component {

    submit = (data) => {
       // just to make sure we actually get data 
        console.log(data);
        this.props.history.push('/account');
    };

    render() {
        return (
            <div>
                <Header />
                {/* <h1 style={{textAlign: "center"}}>Welcome to Midpoint!</h1> */}
                <LoginForm submit={this.submit}/>
                <Footer />
            </div>
        )
    }
}

export default LoginPage;
