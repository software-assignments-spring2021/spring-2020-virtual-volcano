import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Grid, Segment } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../messages/InlineError";
import axios from 'axios';


function add() {
    alert("Location Successfully Added");
    console.log("added");
};

function remove() {
    alert("Location Successfully Deleted");
    console.log("deleted");
};


class AccountForm extends React.Component {
    state = {
        data: {
            name: '',
            savedLocations: ''
        },
        name: '',
        savedLocations: [],
        loading: false,
        errors: {}
    };

    componentDidMount() {
        axios.get("/account")
            .then((response) => {
                console.log("This is response from account");
                console.log(response);
                this.setState({ name: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get("/location")
            .then((response) => {
                console.log("This is response from account");
                console.log(response);
                this.setState({ savedLocations: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data);
        }
    };

    handleAlternate(event) {
        this.props.handleAlternate();
    }

    // validate data after hitting submit form 
    validate = (data) => {
        // errors object should be empty if validation is OK & pass data further
        const errors = {};

        return errors;
    }

    render() {
        const { data, errors } = this.state;
        var addressList = [];
        for (var i = 0; i < this.state.savedLocations.length; i++) {
            if (this.state.savedLocations[i].localeCompare("Atlantic Ocean")) {
                addressList.push(this.state.savedLocations[i]);
            }
        }
        console.log(this.state.savedLocations);
        console.log(addressList);

        return (
<Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 500 }}>
                    <Segment stacked>
                        <h1 style={{ color: 'teal' }}>Your Account</h1>
                        <Form onSubmit={this.onSubmit}>
                            {/* <p>Name: </p> */}
                            <h3 style={{ color: 'teal' }}>Name:</h3>
                            {this.state.name}
                            <h3 style={{ color: 'teal' }}>Midpoint History:</h3>
                            {/* {addressList.map(address => (
                                <li>
                                    {address}
                                </li>
                            ))} */}
                            <div>
                            {addressList.map(function(address, i){
                            return <div className={"row"} key={i}> 
                                        {[ address ]}
                                    </div>; 
                            })}
                            </div>
                            <p></p>
                            <Button color='teal' fluid size='large' onClick={this.handleAlternate.bind(this)} 
                                    style={{ width: '25%', display: 'inline-block' }}>Logout</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

AccountForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default AccountForm;
