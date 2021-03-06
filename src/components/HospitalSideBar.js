import React, { useEffect } from "react";
import { Nav, Badge } from "react-bootstrap";
import { BiPowerOff } from "react-icons/bi";
import { GiWaterDrop } from "react-icons/gi";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { RiBankCardLine } from "react-icons/ri";
// import { VscCalendar, VscRequestChanges } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { SET_SIDEBAR } from "../store/types/sideBarTypes";
import "./sidebar.css";

const HospitalSideBar = () => {
  useEffect(() => {}, []);

  const { email, firstname, lastname } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <>
      <div className="header">
        <div className="brand bg-danger">
          <h4 className="text-white">BLOODNATION</h4>
          <Badge className="mb-4" variant="warning">Hospital</Badge>
          {/* <h6 className="text-white">Hospital</h6> */}
        </div>
        <div className="user d-flex ml-4 mt-4 mr-4">
          <HiUserCircle size="4rem" />
          <h6
            className="my-auto text-left ml-3"
            style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
          >
            {firstname} {lastname || "Welcome"} <br />
            <small>{email}</small>
          </h6>
        </div>
      </div>
      <Nav className="navs">
        <Nav.Link
          as={NavLink}
          activeClassName="active"
          onClick={() => dispatch({ type: SET_SIDEBAR })}
          to="/h/dashboard"
          className=""
        >
          <MdDashboard className="mr-4" size="1.5rem" />
          Dashboard
        </Nav.Link>
        <Nav.Link as={NavLink} activeClassName="active" onClick={() => dispatch({ type: SET_SIDEBAR })} to="/h/donations">
          <GiWaterDrop className="mr-4" size="1.5rem" />
          Appointments
        </Nav.Link>
        <Nav.Link as={NavLink} to="/h/bank" activeClassName="active" onClick={() => dispatch({ type: SET_SIDEBAR })}>
          <RiBankCardLine className="mr-4" size="1.5rem" />
          My Bank
        </Nav.Link>
        <Nav.Link as={NavLink} to="/h/profile" activeClassName="active" onClick={() => dispatch({ type: SET_SIDEBAR })}>
          <RiBankCardLine className="mr-4" size="1.5rem" />
          Profile
        </Nav.Link>

        <div className="bg-danger w-75 mb-3 mt-1 mx-auto" style={{ height: "0.1rem", opacity: "0.3" }}></div>

        <Nav.Link as={Link} to="/logout">
          <BiPowerOff className="mr-4" size="1.5rem" />
          logout
        </Nav.Link>
      </Nav>
    </>
  );
};

export default HospitalSideBar;
