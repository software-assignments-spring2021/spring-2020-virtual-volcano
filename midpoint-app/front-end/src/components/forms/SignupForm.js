import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../messages/InlineError";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import HomePage from "../pages/HomePage"
import { withRouter, BrowserRouter } from 'react-router-dom';

class SignupForm extends React.Component {

    state = {
        data: {
            email: '',
            password: '',
            name: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            console.log("submitted!")
            this.props.submit(this.state.data);
        }
    };

    // validate data after hitting submit form 
    validate = (data) => {
        // errors object should be empty if validation is OK & pass data further
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Error";
        if (!data.password) errors.password = "Error";
        if (!data.name) errors.name = "Error";
        return errors;
    }

    render() {
        const { data, errors } = this.state;
        return (
            <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 500 }}>
                    <Form onSubmit={this.onSubmit} size='large'>
                        <Segment stacked>
                            <h1 style={{ color: 'teal' }}>Get Started</h1>
                            <h4 style={{ color: 'teal', textAlign: 'left' }}>Email</h4>
                            <Form.Input error={!!errors.email}>
                                <input
                                    icon='user'
                                    iconPosition='left'
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="example@example.com"
                                    value={data.email}
                                    onChange={this.onChange}
                                />
                            </Form.Input>
                            <h4 style={{ color: 'teal', textAlign: 'left' }}>Password</h4>
                            <Form.Input error={!!errors.password}>
                                <input
                                    icon='lock'
                                    iconPosition='left'
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={this.onChange}
                                />
                            </Form.Input>
                            <h4 style={{ color: 'teal', textAlign: 'left' }}>Name</h4>
                            <Form.Input error={!!errors.name}>
                                <input
                                    icon='user'
                                    iconPosition='left'
                                    type="name"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    value={data.name}
                                    onChange={this.onChange}
                                />
                            </Form.Input>
                            <Button color='teal' fluid size='large'>Signup</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid >
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default SignupForm;


