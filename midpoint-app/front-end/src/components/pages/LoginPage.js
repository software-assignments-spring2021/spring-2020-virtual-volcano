import React from "react";
import LoginForm from '../forms/LoginForm'
import Footer from '../template/Footer';
import Header from '../template/Header';
import { withRouter, BrowserRouter } from 'react-router-dom';
import axios from "axios";


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authorized: ''
        }
    }

    //for testing 
    componentDidMount() {
        // this.setState({authorized: 'no'})
    }

    submit = (data) => {
        // axios.post('http://localhost:3000/login', data)
        axios.post('/login', data)
            .then(function (response) {
                console.log("Success posting");
                console.log("This is the data ")
                console.log(response.data)
                console.log(response);
                console.log(response.data.auth);
            }).catch(function (error) {
                console.log("Error posting");
                console.log(error);
            });

        //just to make sure we actually get data 
        console.log("this is all the data")
        console.log(data);
        console.log("calling the checkauth function")
        this.checkAuth();
    };

    //test get auth
    checkAuth = () => {
        // console.log(this.state.authorized);
        // axios.get("http://localhost:3000/login")
        axios.get("/login")
        .then((response) => {
            console.log("This is the authorization");
            console.log(response);
            this.setState({ authorized: response.data })
            console.log(this.state.data);
        })
        .catch((error) => {
            console.log(error);
        });
        if(this.state.authorized == 'no'){
            alert('incorrect email or password');
            // this.props.history.push('/signup')
        } else{
            this.props.history.push('/account');
        }
    }

    handleAlternate = () => {
        this.props.history.push('/signup')
    }

    render() {
        return (
            <div>
                <Header />
                {/* <h1 style={{textAlign: "center"}}>Welcome to Midpoint!</h1> */}
                <LoginForm submit={this.submit} handleAlternate={this.handleAlternate} />
                <Footer />
            </div>
        )
    }
}

export default LoginPage;
