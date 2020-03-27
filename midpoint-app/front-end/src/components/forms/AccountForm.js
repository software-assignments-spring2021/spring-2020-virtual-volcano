import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../messages/InlineError";


 function add() {
     alert("Location Successfully Added");
     console.log("added");
 };

 function delete() {
     alert("Location Successfully Deleted");
     console.log("deleted");
 };


class AccountForm extends React.Component {
    state = {
        data: {
            name: '',
            savedLocations: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => 
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data);
        }
    };

    // validate data after hitting submit form 
    validate = (data) => {
        // errors object should be empty if validation is OK & pass data further
        const errors = {};
        
        return errors;
    }

    render() {
        const { data, errors } = this.state;


        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.email}>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="name" 
                        id="name" 
                        name="name" 
                        placeholder="Niki Singh" 
                        value={data.name}
                        onChange={this.onChange}
                    />
                    {errors.name && <InlineError text={errors.name}/>}
                </Form.Field>
            
                <p>Saved Locations:</p>
            
                // Need to left justify buttons
                <button onClick={this.add}>Add Location</button> 
                <button onClick={this.delete}>Delete Location</button> 
                
                
                <p></p>
                
            </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default AccountForm;
