import React, { useState } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon } from "mdbreact";
  import { BrowserRouter as Router } from 'react-router-dom';
import Identicon from 'identicon.js';


function Navbar({account}) {
    const [state, setState] = useState({
      isOpen: false
    })

    const toggleCollapse = () => {
      setState({ isOpen: !state.isOpen });
    }
    return (
      <Router>

      <MDBNavbar className="teal" dark expand="md">
        <MDBNavbarBrand className="ml-5 pl-5">
          <MDBIcon icon="dragon" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light d-flex align-items-center mr-5 " to="#!">
                {account}
                { account
                  ? <img
                    className='ml-2'
                    width='30'
                    height='30'
                    src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                    alt=""
                  />
                  : <span></span>
                }
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>

      </Router>
    );

  }

export default Navbar;