import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import map from "../../assets/images/staticmap.png";
import useRequest from "../../hooks/useRequest";
import { serverRequest } from "../../utils/serverRequest";
import { SET_ERROR, SET_SUCCESS } from "../../store/types/notificationTypes";

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
        <Col xs="12" md="7">
          <Row>
            <Col xs="12" md="6">
              <Card>
                <Card.Body>
                  <Badge pill variant="danger">
                    Hospital
                  </Badge>
                  <h6>{request.hospital.name}</h6>
                  <p className="mb-0">{request.hospital.address}</p>
                  <p className="mb-0">
                    {request.hospital.lg}, {request.hospital.state}
                  </p>
                  <p className="mb-0">{request.hospital.phone}</p>
                  <p className="mb-0">{request.hospital.email}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="12" md="6" className="mt-4 mt-md-0 mb-4">
              <Card>
                <Card.Body>
                  <Badge pill variant="danger">
                    User
                  </Badge>{" "}
                  <Badge pill variant="danger">
                    {request.bloodGroup}
                  </Badge>
                  <h6>
                    {request.bloodReceiverId.firstname} {request.bloodReceiverId.lastname}
                  </h6>
                  <p className="mb-0"></p>
                  <p className="mb-0">
                    {request.bloodReceiverId.lg}, {request.hospital.state}
                  </p>
                  <p className="mb-0">{request.bloodReceiverId.phone}</p>
                  <p className="mb-0">{request.bloodReceiverId.email}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

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
        <Col xs="12" md="3">
          <img src={map} alt="map" className="img-thumbnail" />
        </Col>
      </Row>
    </div>
  );
};

export default AcceptRequest;
