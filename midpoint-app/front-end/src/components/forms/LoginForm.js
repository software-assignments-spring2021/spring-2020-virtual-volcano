import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../messages/InlineError";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import HomePage from "../pages/HomePage"
import { withRouter, BrowserRouter } from 'react-router-dom';

class LoginForm extends React.Component {

    state = {
        data: {
            email: '',
            password: ''
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
            this.props.submit(this.state.data);
            // this.props.useHistory.push('/account');
        }
    };

    handleAlternate(event) {
        this.props.handleAlternate();
    }

    // validate data after hitting submit form 
    validate = (data) => {
        // errors object should be empty if validation is OK & pass data further
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Error";
        if (!data.password) errors.password = "Error";
        return errors;
    }

    render() {
        const { data, errors } = this.state;
        return (
            <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 500 }}>
                    <Form onSubmit={this.onSubmit} size='large'>
                        <Segment stacked>
                            <h1 style={{ color: 'teal' }}>Login to Your Account</h1>
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
                                {/* {errors.email && <InlineError text={errors.email} />} */}
                            </Form.Input>
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
                                {/* {errors.password && <InlineError text={errors.password} />} */}
                            </Form.Input>
                            <Button color='teal' fluid size='large' style={{ width: '49%', display: 'inline-block' }}>Login</Button>
                            <Button color='teal' fluid size='large' onClick={this.handleAlternate.bind(this)} style={{ width: '49%', display: 'inline-block' }}>Signup</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>

            // <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
            //     <Grid.Column style={{maxWidth: 500}}>

            //         <Form size='large' onSubmit={this.onSubmit}>
            //             <Segment stacked>
            //                 <h1 style={{color:"teal"}}>
            //                     Login to Your Account
            //                 </h1>
            //                 <Form.Input error={!!errors.email} 
            //                     type='email'
            //                     id='email'
            //                     name='email'
            //                     placeholder='Email Address'
            //                     value={data.email}
            //                     onChange={this.onChange}
            //                     icon='user' 
            //                     iconPosition='left' 
            //                     // type='email'
            //                     // id='email'
            //                     // name='email'
            //                     // placeholder='Email Address' 
            //                     // fluid 
            //                     // icon='user' 
            //                     // iconPosition='left' 
            //                     // value={data.email}
            //                     // onChange={this.onChange}
            //                 />
            //                 {errors.email && <InlineError text={errors.email} />}
            //                 <Form.Field 
            //                     error={!!errors.email} 
            //                     type= 'password' 
            //                     id='password'
            //                     name='password'
            //                     fluid 
            //                     icon='lock' 
            //                     iconPosition='left' 
            //                     placeholder ='Password' 

            //                     value={data.password} 
            //                     onChange={this.onChange}/>
            //                 {errors.password && <InlineError text={errors.password} />}
            //             </Segment>
            //             {/* <Button color='teal' fluid size='large'>Login</Button> */}
            //             <Link to='/account'><Button color='teal' fluid size='larage'>Login</Button></Link>
            //         </Form>

            //     </Grid.Column>
            // </Grid>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;


