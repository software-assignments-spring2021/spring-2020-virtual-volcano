import React from "react";
import AccountForm from '../forms/AccountForm'
import Footer from '../template/Footer';
import Header from '../template/Header';
import axios from 'axios';

class AccountPage extends React.Component {

    submit = (data) => {
        // just to make sure we actually get data 
        console.log(data);
    };

    //check if user is logging in
    componentDidMount(){
        axios.get('loggedIn')
        .then((response) => {
            console.log("This is response from logged in");
            console.log(response);

            if (response.data == 'no') {
            alert('Please login in');
            this.props.history.push('/login');
            } 
            else {
                this.props.history.push('/account');
            }
        })
        .catch((error) => {
            console.log("this did not work");
            console.log(error);
        });
    }

    handleAlternate = () => {
        axios.get('/logOut')
        .then((response) =>{
            console.log("logging user out");
            this.props.history.push('/');
        })
        .catch((error) => {
            console.log("this did not work");
            console.log(error);
        });

    }

    render() {
        return (
            <div>
                <Header />
                {/* <h1>Your Account</h1> */}
                <AccountForm submit={this.submit} handleAlternate={this.handleAlternate} />
                <Footer />
            </div>
        )
    }
}

export default AccountPage;
