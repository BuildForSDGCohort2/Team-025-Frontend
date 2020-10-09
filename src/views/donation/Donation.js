import React, { useEffect } from 'react';
import { Card, Col, Row, Spinner, Badge } from 'react-bootstrap';
import useAppointment from '../../hooks/useAppointment';
import { formatDateWithTime } from '../../utils/helpers';
import { HiUserCircle } from 'react-icons/hi';
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Donation = () => {

  const { isLoading, appointment } = useAppointment()

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  if(isLoading){
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

  if(!isLoading && !appointment){
    return(
      <div className="pb-5">
        <h1 className="display-4 mb-0">Donation not found</h1>
      </div>
    )
  }

  return (
    <div className="pb-5">
      <h1 className="display-4 mb-1">Donation</h1>
      <Badge className="mb-4 text-capitalize" variant="danger">
        To: {appointment.type}
      </Badge>{" "}
      <Row>
        <Col xs="12" md="12">
          <Card>
              <Row className="no-gutters">
                <Col xs="12" md="4" className="p-4">
                  <div className="text-center text-capitalize">
                    <Badge pill variant="danger">
                      {appointment.status}
                    </Badge>
                  </div>
                  <h6 className="mb-3 text-center mt-2">
                      Appointment Date:<br/>
                      <span className="text-muted">{formatDateWithTime(appointment.date)}</span>
                    </h6>
                  <h6 className="text-center">PROGRESS</h6>
                  <div style={{width: '50%'}} className="mx-auto">
                    <CircularProgressbar
                      value={(appointment.progress) || "--"}
                      text={`${(appointment.progress) || "--"}%`}
                      styles={buildStyles({
                        textColor: "red",
                        pathColor: "red",
                        trailColor: "blue"
                      })}
                    />
                  </div>
                  <h5 className="text-center mt-2 mb-0">{appointment.hospital.name}</h5>
                  <p className="text-center">
                    <small>
                      {appointment.hospital.address} {appointment.hospital.lg}, {appointment.hospital.state}<br/>
                      {appointment.hospital.phone}
                    </small>
                  </p>
                  {appointment.beneficiary?(
                    <Card className="mt-3 bg-primary text-white">
                      <Card.Body className="d-flex">
                        <HiUserCircle size="8rem"/>
                        <div>
                          <Badge variant="light">
                            Blood Group: {appointment.beneficiary.bloodGroup}
                          </Badge>
                          <h5>{appointment.beneficiary.firstname} {appointment.beneficiary.lastname}</h5>
                          <p className="mb-0 text-capitalize">{appointment.beneficiary.lg}, {appointment.beneficiary.state}</p>
                          <p className="mb-0 text-capitalize">{appointment.beneficiary.email}</p>
                          <p className="mb-0 text-capitalize">{appointment.beneficiary.phone}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  ):(
                    <h5 className="text-center">Thank your for donating<br/>to our blood bank</h5>
                  )}
                </Col>
                <Col xs="12" md="8">
                  <iframe
                    title={appointment.hospital.name}
                    src={appointment.hospital.latitude}
                    className="bn-maps"
                    width="100%"
                    frameBorder="0"
                    style={{border:'0'}}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0">
                  </iframe>
                </Col>
              </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Donation

