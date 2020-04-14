import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, ButtonGroup, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import MapContainer from './MapContainer';
import axios from 'axios';

function mapsSelector(lat, lng) {
    if /* if we're on iOS, open in Apple Maps */
        ((navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1) ||
        (navigator.platform.indexOf("iPad") != -1))
        window.open("maps://maps.google.com/maps");

    else /* else use Google */ {
        //for directions
        //let url = "https://maps.google.com/maps?daddr=<"+lat+">,<"+lng+">&amp;ll=";
        //add query id parameter to get the place name
        let url = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng;
        window.open(url);
    }
}

function ResultForm(props) {
    //get midpoint
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/result').then(function (response) {
            setData(response.data);
            console.log(response.data)
        });
    }, []);

    const resultOptions = [
        // {
        //     key: 'Maps',
        //     text: 'Maps',
        //     value: 'Maps',
        // },
        {
            key: 'Google Maps',
            text: 'Google Maps',
            value: 'Google Maps',
        }
    ]

    return (
        <Form className="location-box">
            {/* <h3>Estimated Journey to your destination</h3>
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary">15 minutes</Button>
                <Button variant="primary">0.7 miles</Button>
                <Button variant="primary">$2.75</Button>
            </ButtonGroup>
            <p></p> */}

            <h3>Get Directions:</h3>
            <Dropdown className='dropdown'
                placeholder="Select Option"
                fluid
                selection
                options={resultOptions}
                style={{ width: "25%", left: "48%", right: "auto", transform: "translate(-50%,0)", float: "left" }}
            />
            <Button
                animated style={{ float: "right", marginRight: "35%", position: "fixed" }}
                onClick={() => { mapsSelector(data.lat, data.lng) }}
            //            onClick={()=>{mapsSelector()}}
            >
                <Button.Content visible>Go</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow right' />
                </Button.Content>
            </Button>

        </Form>
    )
}

export default ResultForm;
