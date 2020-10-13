import React from 'react';
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { HiUserCircle } from 'react-icons/hi';
import { MdDashboard, MdNotificationsNone } from 'react-icons/md';
import './topbar.css'
import { Link } from 'react-router-dom';
import { SET_SIDEBAR } from '../store/types/sideBarTypes';

const TopBar = () => {

  const dispatch = useDispatch()

  return (
    <Navbar bg="light" expand="lg" className="topbar mt-3">
        <Navbar.Brand className="d-block d-md-none" href="/">Bloodnation</Navbar.Brand>
        <Nav className="d-none d-md-block">
          <Nav.Link as={Link} className="pl-0 mr-3" to="/dashboard"><MdDashboard size="1.2rem"/> Dashbaord</Nav.Link>
        </Nav>
        <div className="ml-auto d-flex align-items-center">
          <MdNotificationsNone size="2rem"/>
          <sup><Badge className="p-1" pill style={{fontSize: '1rem'}} variant="danger">9</Badge></sup>
          <NavDropdown  title={<HiUserCircle className="" size="2rem"/>}>
            <NavDropdown.Item  as={Link} to="/h/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Notifications</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Get Help</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=> dispatch({type: SET_SIDEBAR})} />
        </div>
    </Navbar>
  )
}

export default TopBar

