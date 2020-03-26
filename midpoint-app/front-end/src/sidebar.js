import React from "react";
import { slide as Menu } from "react-burger-menu";

import './sidebar.css';

function SideBar (props) {
    return (
       <Menu {...props}>
  
        <a className="menu-item" href="/">
          Calculate Midpoint
        </a>
  
        {/* should the sidebar contain Login tab or make "your account" 
        redirect to the sign in page if not logged in and
        your account page if logged in*/}
        {/* <a className="menu-item" href="/">
          Login
        </a> */}
  
        <a className="menu-item" href="/">
          Your Account
        </a>
  
      </Menu>
    );
  };
  
  export default SideBar;
  