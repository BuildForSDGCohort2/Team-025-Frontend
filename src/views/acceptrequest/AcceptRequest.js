import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import { serverRequest } from "../../utils/serverRequest";
import { SET_ERROR, SET_SUCCESS } from "../../store/types/notificationTypes";
import { FrameMap } from "../../components";
import { formatDateWithTime } from "../../utils/helpers";
import { HiUserCircle } from 'react-icons/hi';
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AcceptRequest = () => {
  const { isLoading, request } = useRequest();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const [date, setDate] = useState(new Date());

  const { register, handleSubmit } = useForm();

  const { push } = useHistory();
  const { requestId } = useParams();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  const onSubmit = async (data) => {
    try {
      data["date"] = date;
      setIsSubmitting(true);
      const endpoint = `${process.env.REACT_APP_API}/request/public/${requestId}`;
      const response = await serverRequest(token).put(endpoint, data);
      if (response.data.status === "success") {
        setIsSubmitting(false);
        dispatch({ type: SET_SUCCESS, payload: "Successful, Request Accepted" });
        push("/donation/history");
      }
    } catch (error) {
      setError(error.response.data.message || error.response.data.error);
      dispatch({ type: SET_ERROR, payload: error });
      setIsSubmitting(false);
    }
  };

  if (!isLoading && !request) {
    return (
      <div className="pb-5">
        <h1 className="display-4 mb-0">Request not found</h1>
      </div>
    );
  }

  return (
    <div className="pb-5">
      <h1 className="display-4 mb-0">Accept Request</h1>
      <Badge className="mb-4" pill variant="primary">
        {request.status}
      </Badge>
      <Row>
        <Col xs="12" md="12">
          <Card>
            <Row className="no-gutters">
              <Col xs="12" md="5" className="p-4">
                <div className="text-center text-capitalize">
                  <Badge pill variant="danger">
                    {request.status}
                  </Badge>
                </div>
                <h6 className="mb-3 text-center mt-2">
                    Appointment Date:<br/>
                    <span className="text-muted">{formatDateWithTime(request.createdAt)}</span>
                  </h6>
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
                {request.bloodReceiverId?(
                  <Card className="mt-3 mb-4 bg-primary text-white">
                    <Card.Body className="d-flex">
                      <HiUserCircle size="8rem"/>
                      <div>
                        <Badge variant="light">
                          Blood Group: {request.bloodReceiverId.bloodGroup}
                        </Badge>
                        <h5>{request.bloodReceiverId.firstname} {request.bloodReceiverId.lastname}</h5>
                        <p className="mb-0 text-capitalize">{request.bloodReceiverId.lg}, {request.bloodReceiverId.state}</p>
                        <p className="mb-0 text-capitalize">{request.bloodReceiverId.email}</p>
                        <p className="mb-0 text-capitalize">{request.bloodReceiverId.phone}</p>
                      </div>
                    </Card.Body>
                  </Card>
                ):(
                  <h5 className="text-center">Thank your for donating<br/>to our blood bank</h5>
                )}

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="w-100">
                    <Form.Label>Appointment Date</Form.Label>
                    <br />
                    <DatePicker
                      name="date"
                      selected={date}
                      required
                      onChange={(date) => setDate(date)}
                      timeIntervals={15}
                      minDate={new Date()}
                      // ref={register({ required: true })}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      showTimeSelect
                      className="p-1 form-control pt-4 pb-4 w-100 pl-3"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Comment"
                      name="comment"
                      ref={register({ required: true })}
                      className="pt-4 pb-4"
                    />
                  </Form.Group>

                  <Button variant="danger" type="submit" disabled={isSubmitting} className="mb-3 pt-2 pb-2" block>
                    {isSubmitting ? "Loading..." : "Accept Donation"}
                  </Button>
                  {error ? (
                    <Alert variant="warning" className="text-center">
                      {error}
                    </Alert>
                  ) : null}
                </Form>
              </Col>
              <Col xs="12" md="7">
                <FrameMap
                  name={request.hospital.name}
                  lat={request.hospital.latitude}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AcceptRequest;
