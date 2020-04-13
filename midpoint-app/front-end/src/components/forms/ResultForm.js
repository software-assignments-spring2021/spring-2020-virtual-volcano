import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, ButtonGroup,Dropdown, Icon  } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import MapContainer from './MapContainer';

function ResultForm(props) {

    const resultOptions = [
        {
            key: 'Maps',
            text: 'Maps',
            value: 'Maps',
        },
        {
            key: 'Google Maps',
            text: 'Google Maps',
            value: 'Google Maps',
        }
    ]

    return (
        <Form className="location-box">
            <h3>Estimated Journey to your destination</h3>
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary">15 minutes</Button>
                <Button variant="primary">0.7 miles</Button>
                <Button variant="primary">$2.75</Button>
            </ButtonGroup>
            <p></p>

            <h3>Get Directions:</h3>
            <Dropdown className='dropdown'
            placeholder = "Select Option"
            fluid
            selection
            options={resultOptions}
            style={{ width: "25%",left: "48%", right: "auto", transform: "translate(-50%,0)", float: "left"}}
            />
            <Button 
            animated style = {{float: "right", marginRight: "35%", position: "fixed"}} 
            onClick={()=>{ window.open("https://www.google.com/maps"); }}
            >
                <Button.Content visible>Go</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow right'/>
                </Button.Content>
            </Button>

        </Form>
    )
}

export default ResultForm;
