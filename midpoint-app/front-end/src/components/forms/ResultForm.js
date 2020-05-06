import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, ButtonGroup, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import MapContainer from './MapContainer';
import axios from 'axios';

function mapsSelector(lat, lng, placeId) {
    if /* if we're on iOS, open in Apple Maps */
        ((navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1) ||
        (navigator.platform.indexOf("iPad") != -1))
        window.open("maps://maps.google.com/maps");

    else /* else use Google */ {
        //for directions
        //let url = "https://maps.google.com/maps?daddr=<"+lat+">,<"+lng+">&amp;ll=";
        //add query id parameter to get the place id
        //have if else to check the placeid and change the url
        let url = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng + "&query_place_id=" + placeId;
        window.open(url);
    }
}

function ResultForm(props) {
    console.log("beginning of result form");
    const [data, setData] = useState([]);
    let midpoint_name = '';
    useEffect(() => {
        axios.get('http://localhost:3000/result').then(function (response) {
            setData(response.data);
            console.log("this is name response data");
            console.log(response.data);
            // midpoint_name = response.data

        });
    }, []);
    const resultOptions = [
        {
            key: 'Google Maps',
            text: 'Google Maps',
            value: 'Google Maps',
        }
    ]

   
    return (
        <Form className="location-box">
  
            <p>Get Directions:</p>
            <Dropdown className='dropdown'
                placeholder="Select Option"
                fluid
                selection
                options={resultOptions}
                style={{ width: "25%", left: "48%", right: "auto", transform: "translate(-50%,0)", float: "left" }}
            />
            <Button
                animated style={{ float: "right", marginRight: "35%", position: "fixed" }}
                onClick={() => { mapsSelector(data.lat, data.lng, data.placeId) }}
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
