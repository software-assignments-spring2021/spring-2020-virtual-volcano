import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../messages/InlineError";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";
import axios from "axios";
import dotenv from "dotenv"

dotenv.config({ path: '../../.env' });
var myapikey = process.env.REACT_APP_APIKEY

Geocode.setApiKey(myapikey)
Geocode.enableDebug();


class HomeForm extends React.Component {

    state = {
        data: {
            userLocation: '',
            otherLocation: '',
            lat1: '',
            lng1: '',
            lat2: '',
            lng2: ''

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
        }
    };

    // validate data after hitting submit form 
    validate = (data) => {
        // errors object should be empty if validation is OK & pass data further
        const errors = {};
        if (!data.userLocation) errors.userLocation = " Can't be blank";
        if (!data.otherLocation) errors.otherLocation = " Can't be blank";
        return errors;
    };

    render() {

        const { data, errors } = this.state;

        Geocode.fromAddress(data.userLocation).then(
            response => {
                //   const { lat, lng } = response.results[0].geometry.location.lat();
                const lat1 = response.results[0].geometry.location.lat;
                const lng1 = response.results[0].geometry.location.lng;
                console.log(lat1);
                console.log(lng1);
                data.lat1 = lat1;
                data.lng1 = lng1;
            },
            error => {
                console.error("NOOOO");
            }
        );

        Geocode.fromAddress(data.otherLocation).then(
            response => {
                //const { lat, lng } = response.results[0].geometry.location;
                const lat2 = response.results[0].geometry.location.lat;
                const lng2 = response.results[0].geometry.location.lng;
                console.log(lat2);
                console.log(lng2);
                data.lat2 = lat2;
                data.lng2 = lng2;
            },
            error => {
                console.error("NOOOO");
            }
        );

        return (

            <Form className="location-box" onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.userLocation}>
                    <label htmlFor="userLocation">Your Location</label>
                    <input
                        type="userLocation"
                        id="userLocation"
                        name="userLocation"
                        placeholder="123 E 123 Street, New York, NY, 10003"
                        value={data.userLocation}
                        onChange={this.onChange}
                        style={{ width: "50%" }}
                    />
                    {errors.userLocation && <InlineError text={errors.userLocation} />}
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
                        style={{ width: "50%" }}
                    />
                    {errors.otherLocation && <InlineError text={errors.otherLocation} />}
                </Form.Field>
                <Button primary>Calculate Midpoint</Button>
                {/* <p>Calculate Midpoint By:</p> */}
                {/* <Link to='/area'><Button primary>Time</Button></Link>
                <Link to='/area'><Button primary>Distance</Button></Link>
                <Link to='/area'><Button primary>Price</Button></Link> */}
                <p></p>
            </Form>

        );

    }
}

HomeForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default HomeForm;

