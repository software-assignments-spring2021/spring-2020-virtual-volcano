import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import Dropdown from 'react-dropdown';
import { Link } from "react-router-dom";


function AreaForm(props) {
  const radiusOptions = [
    '0.1 Miles', '0.25 Miles', '0.5 Miles'
  ];

  const thingsOptions = [
    'Restaurants', 'Bars', 'Shops'
  ];

  return (
    <Form className="location-box">
      <p>Calculate Midpoint Area By:</p>
      {/* Implement title and dropdown buttons to select radius and things to do  */}
      <Dropdown options={radiusOptions} placeholder="Select Radius" />
      <p></p>
      <Dropdown options={thingsOptions} placeholder="Things to Do" />
      <p></p>
        Browse Midpoint Area on the map:
      <p></p>
      <img src="https://picsum.photos/500/300?grayscale" />
      <p></p>
      <Link to='/result'><Button primary>Midpoint Chosen!</Button></Link>
    </Form>
  )
}

export default AreaForm;

{/* TODO: when pages are deeplinked with map + calculation API, you can utilize these buttons
                     but for now there are dependencies not allowing for it
                     
               <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Radius
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">0.1 Miles</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">0.25 Miles</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">0.5 Miles</Dropdown.Item>
                    </Dropdown.Menu>
              </Dropdown
            
                
             <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Things to Do
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Restaurants</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Bars</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Shops</Dropdown.Item>
                    </Dropdown.Menu>
              </Dropdown
            */}