import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Dropdown} from 'semantic-ui-react';
// import Dropdown from 'react-dropdown';
import { Link } from "react-router-dom";

import MapContainer from './MapContainer';


function AreaForm(props) {
  const radiusOptions = [
    // '0.1 Miles', '0.25 Miles', '0.5 Miles'
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
      <h3>Calculate Midpoint Area By:</h3>
      {/* Implement title and dropdown buttons to select radius and things to do  */}
      {/* <Dropdown options={radiusOptions} placeholder="Select Radius" /> */}
      <Dropdown className='dropdown'
        placeholder = "Select Radius"
        fluid
        selection
        options={radiusOptions}
        style={{ width: "25%",left: "50%", right: "auto", transform: "translate(-50%,0)"}}
      />
      <p></p>
      {/* <Dropdown options={thingsOptions} placeholder="Things to Do" /> */}
      <Dropdown className='dropdown'
        placeholder = "Things To Do"
        fluid
        selection
        options={thingsOptions}
        style={{ width: "25%",left: "50%", right: "auto", transform: "translate(-50%,0)"}}
      />
      <p></p>
        <h3>Browse Midpoint Area on the map:</h3>
      <p></p>
      {/* <Link to='/result'><Button primary>Midpoint Chosen!</Button></Link> */}
      <Button primary>Midpoint Chosen!</Button>
    </Form>
  )
}

AreaForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default AreaForm;

