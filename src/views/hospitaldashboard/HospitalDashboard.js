import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { GiWaterDrop } from 'react-icons/gi';
import { VscRequestChanges } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import '../dashboard/dashboard.css'
import { Link } from "react-router-dom";
import { serverRequest } from "../../utils/serverRequest";

const HospitalDashboard = () => {

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
      <h1 className="display-4 mb-0">Dashboard</h1>
      <Badge className="mb-4" variant="warning">Hospital</Badge>
      <Row className="mb-1">
        <Col xs="12" md="6" lg="3">
          <Card className="statistics-box blood-group">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div className="icon-box bg-danger d-flex">
                  <GiWaterDrop className="my-auto mx-auto" color="white" size="3rem"/>
                </div>
                <div className="text-right">
                  <h6 className="text-muted">Blood Bank</h6>
                  <h3>0</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Available in Bank</small>
                <Button variant="danger" as={Link} to="/profile" size="sm">
                  Bank
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
                  <h6 className="text-muted">Pending</h6>
                  <h3>{statistics && statistics.donations}</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Total Pending</small>
                <Button variant="danger" as={Link} to="/donation" size="sm">
                  Appointments
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
                  <h6 className="text-muted">Accepted</h6>
                  <h3>{statistics && statistics.requests}</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Total Accepted</small>
                <Button as={Link} to="/requests" variant="danger" size="sm">
                  Appointments
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
                  <h6 className="text-muted">Completed</h6>
                  <h3>{statistics && statistics.requests}</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Total Completed</small>
                <Button as={Link} to="/requests" variant="danger" size="sm">
                  Appointments
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">

        </Col>
      </Row>
    </div>
  )
}

export default HospitalDashboard

