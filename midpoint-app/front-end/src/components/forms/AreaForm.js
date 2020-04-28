// import React from 'react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Dropdown} from 'semantic-ui-react';
// import Dropdown from 'react-dropdown';
import { Link } from "react-router-dom";

import MapContainer from './MapContainer';
import axios from 'axios';



function AreaForm(props) {
      console.log("beginning of page")

  const radiusOptions = [
    {
      key: '0.1 Miles',
      text: '0.1 Miles',
      value: '0.1 Miles',
    },
    {
      key: '0.25 Miles',
      text: '0.25 Miles',
      value: '0.25 Miles',
    },
    {
      key: '0.5 Miles',
      text: '0.5 Miles',
      value: '0.5 Miles',
    },
  ];

  const thingsOptions = [
    // 'Restaurants', 'Bars', 'Shops'
    {
      key: 'Restaurants',
      text: 'Restaurants',
      value: 'Restaurants',
    },
    {
      key: 'Bars',
      text: 'Bars',
      value: 'Bars',
    },
    {
      key: 'Shops',
      text: 'Shops',
      value: 'Shops',
    },
  ];

  return (
    <Form className="location-box">
        <h3>Browse Midpoint Area on the map:</h3>
      <p></p>
      <Link to='/result'><Button primary>Midpoint Chosen!</Button></Link>
      {/* <Button primary>Midpoint Chosen!</Button> */}
    </Form>
  )
}

AreaForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default AreaForm;

