import React from "react";
import LoginForm from '../forms/LoginForm'

class LoginPage extends React.Component {

    submit = (data) => {
        // just to make sure we actually get data 
        console.log(data);
    };

    render() {
        return (
            <div>
                <h1>Login Page</h1>

                <LoginForm submit={this.submit} />
            </div>
        )
    }
}

export default LoginPage;