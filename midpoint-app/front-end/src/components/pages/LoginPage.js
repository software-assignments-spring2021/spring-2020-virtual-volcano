import React from "react";
import LoginForm from '../forms/LoginForm'
import Footer from '../template/Footer';
import Header from '../template/Header';
import {withRouter, BrowserRouter } from 'react-router-dom';
import axios from "axios";


class LoginPage extends React.Component {

    submit = (data) => {
        // axios.post('http://localhost:3000/login', {
        //     "email": 'Fred',
        //     "password": 'Flintstone'
        //   })
        //test for now
        let payload = {
            "email": 'Fred',
            "password": 'Flinstone'
          }
        axios.post('http://localhost:3000/login', payload)
        .then(function (response){
            console.log("Success posting");
            console.log(response);

        } ).catch(function (error) {
            console.log("Error posting");
            console.log(error);
        });

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
