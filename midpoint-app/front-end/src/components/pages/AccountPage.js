import React from "react";
import LoginForm from '../forms/LoginForm'
import Footer from '../template/Footer';
import Header from '../template/Header';
class LoginPage extends React.Component {

    submit = (data) => {
       // just to make sure we actually get data 
        console.log(data);
    };

    render() {
        return (
            <div>
                <Header />
                <h1>Your Account</h1>
                <AccountForm submit={this.submit}/>
                <Footer />
            </div>
        )
    }
}

export default AccountPage;
