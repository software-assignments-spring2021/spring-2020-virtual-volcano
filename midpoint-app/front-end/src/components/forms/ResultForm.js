import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, ButtonGroup } from 'semantic-ui-react';
import Dropdown from 'react-dropdown';
import { Link } from "react-router-dom";

import MapContainer from './MapContainer';

function ResultForm(props) {
    const resultOptions = [
        'Open in \'Maps\'', 'Open in \'Google Maps\''
    ];

    return (
        <Form className="location-box">
            <p>Estimated Journey to your destination</p>
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary">15 minutes</Button>
                <Button variant="primary">0.7 miles</Button>
                <Button variant="primary">$2.75</Button>
            </ButtonGroup>
            <p></p>
            <Dropdown options={resultOptions} placeholder="Get Directions" />
            <p></p>
            <MapContainer />
        </Form>
    )
}

export default ResultForm;