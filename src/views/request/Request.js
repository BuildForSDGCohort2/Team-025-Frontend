import React, { useEffect } from 'react';
import { Card, Col, Row, Spinner, Badge } from 'react-bootstrap';
import useMyRequest from '../../hooks/useMyRequest';
import { formatDateWithTime } from '../../utils/helpers';
import { HiUserCircle } from 'react-icons/hi';
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Request = () => {

  const { isLoading, myRequest:request } = useMyRequest()

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

  if(!isLoading && !request){
    return(
      <div className="pb-5">
        <h1 className="display-4 mb-0">Request not found</h1>
      </div>
    )
  }

  return (
    <div className="pb-5">
      <h1 className="display-4 mb-4">Request</h1>
      <Row>
        <Col xs="12" md="12">
          <Card>
              <Row className="no-gutters">
                <Col xs="12" md="4" className="p-4">
                  <div className="text-center text-capitalize">
                    <Badge pill variant="danger">
                      {request.status}
                    </Badge>
                  </div>
                  {request.bloodOwnerId && request.bloodOwnerId._id?(
                    <h6 className="mb-3 text-center mt-2">
                      Donor Appointment Date:<br/>
                      <span className="text-muted">{formatDateWithTime(request.appointment.date)}</span>
                    </h6>
                  ):null}
                  <h6 className="text-center">PROGRESS</h6>
                  <div style={{width: '50%'}} className="mx-auto">
                    <CircularProgressbar
                      value={(request.progress) || "--"}
                      text={`${(request.progress) || "--"}%`}
                      styles={buildStyles({
                        textColor: "red",
                        pathColor: "red",
                        trailColor: "blue"
                      })}
                    />
                  </div>
                  <h5 className="text-center mt-2 mb-0">{request.hospital.name}</h5>
                  <p className="text-center">
                    <small>
                      {request.hospital.address} {request.hospital.lg}, {request.hospital.state}<br/>
                      {request.hospital.phone}
                    </small>
                  </p>
                  {request.bloodOwnerId && request.bloodOwnerId._id?(
                    <Card className="mt-3">
                      <Card.Body className="d-flex">
                        <HiUserCircle size="8rem"/>
                        <div>
                          <Badge variant="danger">
                            Blood Group: {request.bloodGroup}
                          </Badge>
                          <h5>{request.bloodOwnerId.firstname} {request.bloodOwnerId.lastname}</h5>
                          <p className="mb-0 text-capitalize">{request.bloodOwnerId.lg}, {request.bloodOwnerId.state}</p>
                          <p className="mb-0 text-capitalize">{request.bloodOwnerId.email}</p>
                          <p className="mb-0 text-capitalize">{request.bloodOwnerId.phone}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  ):(
                    <h5 className="text-center">Your request is still pending<br/>please exercise patience</h5>
                  )}
                </Col>
                <Col xs="12" md="8">
                  <iframe
                    title={request.hospital.name}
                    src={request.hospital.latitude}
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

export default Request

