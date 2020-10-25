import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { GiWaterDrop } from 'react-icons/gi';
import { VscRequestChanges } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import '../../dashboard/dashboard.css'
import { Link } from "react-router-dom";
import { serverRequest } from "../../../utils/serverRequest";
import { AdminAppointmentHistory } from "../../../components";

const AdminDashboard = () => {

  const [statistics, setStatistics] = useState({
    user: "--",
    appointments: "--",
    requests: "--",
    bloods: "--"
  });

  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    window.scrollTo(0,0)
    const getStatistics = async () => {
      try {
        const endpoint = `${process.env.REACT_APP_API}/admin/statistics`;
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
      <Badge className="mb-4" variant="warning">Admin</Badge>
      <Row className="mb-1">
        <Col xs="12" md="6" lg="3">
          <Card className="statistics-box blood-group">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div className="icon-box bg-danger d-flex">
                  <GiWaterDrop className="my-auto mx-auto" color="white" size="3rem"/>
                </div>
                <div className="text-right">
                  <h6 className="text-muted">Blood in Banks</h6>
                  <h3>{statistics && statistics.bloods}</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Available in Bank</small>
                <Button variant="danger" as={Link} to="/a/bank" size="sm">
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
                  <h6 className="text-muted">Appointments</h6>
                  <h3>{statistics && statistics.appointments}</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Total Appointments</small>
                <Button variant="danger" as={Link} to="/a/donations" size="sm">
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
                  <h6 className="text-muted">Requests</h6>
                  <h3>{statistics && statistics.requests}</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Total Requests</small>
                <Button as={Link} to="/h/donations" variant="danger" size="sm">
                  Requests
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
                  <h6 className="text-muted">Registered Users</h6>
                  <h3>{statistics && statistics.user}</h3>
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <small>Total Users</small>
                <Button as={Link} to="/h/donations" variant="danger" size="sm">
                  Users
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">
          <AdminAppointmentHistory/>
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboard

