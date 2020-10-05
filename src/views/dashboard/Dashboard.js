import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { GiWaterDrop } from 'react-icons/gi';
import { VscRequestChanges } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

import './dashboard.css'
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { AppointmentHistory } from "../../components";
import { serverRequest } from "../../utils/serverRequest";

const Dashboard = () => {

  const [statistics, setStatistics] = useState({
    bloodGroup: "--",
    donations: "--",
    lastDonation: { progress: "--"},
    requests: "--"
  });

  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    window.scrollTo(0,0)
    const getStatistics = async () => {
      try {
        const endpoint = `${process.env.REACT_APP_API}/users/statistics`;
        const response = await serverRequest(token).get(endpoint);
        setStatistics(response.data.data)
      } catch (error) {

      }
    };
    getStatistics();
  }, [token])

  return (
    <div className="dashboard">
      <h1 className="display-4 mb-4">Dashboard</h1>
      <Row className="mb-1">
        <Col xs="12" md="6" lg="3">
          <Card className="statistics-box blood-group">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div className="icon-box bg-danger d-flex">
                  <GiWaterDrop className="my-auto mx-auto" color="white" size="3rem"/>
                </div>
                <div className="text-right">
                  <h6 className="text-muted">Group</h6>
                  <h3>{statistics && statistics.bloodGroup}</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Your Blood Group</small>
                <Button variant="danger" as={Link} to="/profile" size="sm">
                  Update
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" md="6" lg="3">
          <Card className="statistics-box blood-group">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div className="icon-box bg-danger d-flex">
                  <VscRequestChanges className="my-auto mx-auto" color="white" size="3rem"/>
                </div>
                <div className="text-right">
                  <h6 className="text-muted">Donations</h6>
                  <h3>{statistics && statistics.donations}</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Total Donation</small>
                <Button variant="danger" as={Link} to="/donation" size="sm">
                  Donate
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" md="6" lg="3">
          <Card className="statistics-box blood-group">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div className="icon-box bg-danger d-flex">
                  <GiWaterDrop className="my-auto mx-auto" color="white" size="3rem"/>
                </div>
                <div className="text-right">
                  <h6 className="text-muted">Requests</h6>
                  <h3>{statistics && statistics.requests}</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Total Requests</small>
                <Button as={Link} to="/requests" variant="danger" size="sm">
                  Request
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" md="6" lg="3">
          <Card className="statistics-box blood-group">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div className="icon-box bg-danger p-3">
                  <div style={{width: '100%'}} className="mx-auto">
                  <CircularProgressbar
                    value={(statistics && statistics.lastDonation && statistics.lastDonation.progress) || "--"}
                    // styles={{color: 'red'}}
                    text={`${(statistics && statistics.lastDonation && statistics.lastDonation.progress) || "--"}%`}
                    styles={buildStyles({
                      textColor: "white",
                      pathColor: "white",
                      trailColor: "yellow"
                    })}
                  />
                </div>
                </div>
                <div className="text-right">
                  <h6 className="text-muted">Progress</h6>
                  <h3>{statistics && statistics.lastDonation && statistics.lastDonation.progress?statistics.lastDonation.progress+"%": "None"}</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Current Donation</small>
                <Button variant="danger" as={Link} to={`/donation/${(statistics && statistics.lastDonation && statistics.lastDonation._id) || ''}`} size="sm">
                  Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">
          <AppointmentHistory/>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
