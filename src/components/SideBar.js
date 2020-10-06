import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from "react-bootstrap";
import { HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { VscRequestChanges, VscCalendar } from 'react-icons/vsc';
import { RiBankCardLine } from 'react-icons/ri';
import { GiWaterDrop } from 'react-icons/gi';
import {  BiPowerOff } from 'react-icons/bi';
import './sidebar.css'
import { Link, NavLink } from 'react-router-dom';
import { SET_SIDEBAR } from '../store/types/sideBarTypes';

const SideBar = () => {

  useEffect(() => {
  }, [])

  const { email, firstname, lastname } = useSelector(state => state.auth.user);
  const dispatch = useDispatch()

  return (
    <>
      <div className="header">
        <div className="brand bg-danger">
          <h4 className="text-white">BLOODNATION</h4>
        </div>
        <div className="user d-flex ml-4 mt-4 mr-4">
          <HiUserCircle size="4rem"/>
          <h6 className="my-auto text-left ml-3" style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
            {firstname} {lastname || 'Welcome'} <br/>
            <small>{email}</small>
          </h6>
        </div>
      </div>
      <Nav  className="navs">

        <Nav.Link as={NavLink}  activeClassName="active" onClick={()=> dispatch({type: SET_SIDEBAR})} to="/dashboard" className=""><MdDashboard className="mr-4" size="1.5rem"/>Dashboard</Nav.Link>
        <Nav.Link as={NavLink} onClick={()=> dispatch({type: SET_SIDEBAR})} to="/donation" eventKey="link-1"><GiWaterDrop className="mr-4" size="1.5rem"/>Donate</Nav.Link>
        <Nav.Link as={NavLink} onClick={()=> dispatch({type: SET_SIDEBAR})} to="/requests" eventKey="link-1"><VscRequestChanges className="mr-4" size="1.5rem"/>Requests</Nav.Link>
        <Nav.Link as={NavLink} onClick={()=> dispatch({type: SET_SIDEBAR})} to="/donation/history" eventKey="link-2"><VscCalendar className="mr-4" size="1.5rem"/>Donation History</Nav.Link>

        <div className="bg-danger w-75 mb-3 mt-1 mx-auto" style={{height: '0.1rem', opacity: '0.3'}}></div>

        <Nav.Link eventKey="link-2"><RiBankCardLine className="mr-4" size="1.5rem"/>Banks</Nav.Link>
        <Nav.Link eventKey="link-2"  as={NavLink} to="/profile"><RiBankCardLine className="mr-4" size="1.5rem"/>Profile</Nav.Link>
        <Nav.Link eventKey="link-2"><GiWaterDrop className="mr-4" size="1.5rem"/>Get Help</Nav.Link>

        <div className="bg-danger w-75 mb-3 mt-1 mx-auto" style={{height: '0.1rem', opacity: '0.3'}}></div>

        <Nav.Link eventKey="link-2" as={Link} to="/logout"><BiPowerOff className="mr-4" size="1.5rem"/>logout</Nav.Link>
      </Nav>
    </>
  )
}

export default SideBar

