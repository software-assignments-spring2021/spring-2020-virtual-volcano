import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../messages/InlineError";

function shoot() {
    alert("YAY!");
    console.log("HURRRRAHHH");
};

class HomeForm extends React.Component {

    state = {
        data: {
            userLocation: '',
            otherLocation: ''
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
        if(!data.userLocation) errors.userLocation = " Can't be blank";
        if (!data.otherLocation) errors.otherLocation = " Can't be blank";
        return errors;
    };

    render() {
        const { data, errors } = this.state;


        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.userLocation}>
                    <label htmlFor="userLocation">Your Location</label>
                    <input 
                        type="userLocation" 
                        id="userLocation" 
                        name="userLocation" 
                        placeholder="123 E 123 Street, New York, NY, 10003" 
                        value={data.userLocation}
                        onChange={this.onChange}
                        style = {{width: "50%"}}
                    />
                    {errors.userLocation && <InlineError text={errors.userLocation}/>}
                </Form.Field>
                <Form.Field error={!!errors.otherLocation}>
                    <label htmlFor="otherLocation">Other Location</label>
                    <input 
                        type="otherLocation" 
                        id="otherLocation" 
                        name="otherLocation" 
                        placeholder="321 W 321 Street, New York, NY, 10003" 
                        value={data.otherLocation}
                        onChange={this.onChange}
                        style = {{width: "50%"}}
                    />
                    {errors.otherLocation && <InlineError text={errors.otherLocation}/>}
                </Form.Field>
                <p>Calculate Midpoint By:</p>
                <Button primary onClick={shoot}>Time</Button>
                <Button primary>Distance</Button>
                <Button primary>Price</Button>
                <p></p>
                <img src="https://picsum.photos/500/300?grayscale"/>
            </Form>
        );
    }
}

HomeForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default HomeForm;