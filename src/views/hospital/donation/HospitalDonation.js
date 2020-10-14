import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Row, Spinner, Form, Button } from "react-bootstrap";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiUserCircle } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import useHospitalAppointment from "../../../hooks/useHospitalAppointment";
import { formatDateWithTime } from "../../../utils/helpers";
import { serverRequest } from "../../../utils/serverRequest";
import { SET_ERROR, SET_SUCCESS } from "../../../store/types/notificationTypes";
import { APPOINTMENT_RESOLVE } from "../../../store/types/appointmentsTypes";
// import bg from '../../../assets/images/blood-donation.jpg'
import logo from '../../../assets/images/logo_2.png'
import { Link } from "react-router-dom";

const HospitalDonation = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const { isLoading, appointment } = useHospitalAppointment();
  const { register, handleSubmit } = useForm();

  const { token } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.notification);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [message]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (!isLoading && !appointment) {
    return (
      <div className="pb-5">
        <h1 className="display-4 mb-0">Donation not found</h1>
      </div>
    );
  }

  const onAccept = async (data) => {
    if(window.confirm("Confirm Accept Donation")){
      try {
        setIsSubmitting(true);
        const endpoint = `${process.env.REACT_APP_API}//hospitals/appointments/approve/${data.hospitalId}/${data.appointmentId}`;
        const response = await serverRequest(token).post(endpoint, data);
        if (response.data.status === "success") {
          setIsSubmitting(false);
          dispatch({ type: SET_SUCCESS, payload: "Successful, Donation Appointment Approved" });
          dispatch({
            type: APPOINTMENT_RESOLVE,
            payload: response.data.data
          });
        }
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: error });
        setIsSubmitting(false);
      }
    }
  };

  const onComplete = async (data) => {
    if(window.confirm("Confirm Complete Donation")){
      try {
        setIsSubmitting(true);
        const endpoint = `${process.env.REACT_APP_API}//hospitals/appointments/complete/${data.hospitalId}/${data.appointmentId}`;
        const response = await serverRequest(token).post(endpoint, data);
        if (response.data.status === "success") {
          setIsSubmitting(false);
          dispatch({ type: SET_SUCCESS, payload: "Successful, Donation Completed and Saved to Bank" });
          dispatch({
            type: APPOINTMENT_RESOLVE,
            payload: response.data.data
          });
        }
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: error });
        setIsSubmitting(false);
      }
    }
  };

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
                  Appointment Date:
                  <br />
                  <span className="text-muted">{formatDateWithTime(appointment.date)}</span>
                </h6>
                <h6 className="text-center">PROGRESS</h6>
                <div style={{ width: "50%" }} className="mx-auto">
                  <CircularProgressbar
                    value={appointment.progress || "--"}
                    text={`${appointment.progress || "--"}%`}
                    styles={buildStyles({
                      textColor: "red",
                      pathColor: "red",
                      trailColor: "blue"
                    })}
                  />
                </div>
                <h5 className="text-center mt-2 mb-0">{appointment.user.firstname} {appointment.user.lastname}</h5>
                <p className="text-center">
                  <small>
                    {appointment.user.address} {appointment.user.lg}, {appointment.user.state}
                    <br />
                    {appointment.user.phone}
                  </small><br/>
                  {appointment.bloodId ? (
                    <Button as={Link} to={`/h/bank/${appointment.bloodId._id}`} size="sm" variant="danger">Check Blood</Button>
                  ) : null}
                </p>
                {appointment.beneficiary ? (
                  <>
                    <Badge variant="primary">Beneficiary</Badge>
                    <Card className="bg-primaryy text-whitee">
                      <Card.Body className="d-flex">
                        <HiUserCircle size="8rem" />
                        <div>
                          <h5 className="mt-3">
                            {appointment.beneficiary.firstname} {appointment.beneficiary.lastname}
                          </h5>
                          <p className="mb-0 text-capitalize">
                            {appointment.beneficiary.lg}, {appointment.beneficiary.state}
                          </p>
                          <p className="mb-0 text-capitalize">{appointment.beneficiary.email}</p>
                          <p className="mb-0 text-capitalize">{appointment.beneficiary.phone}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </>
                ) : (
                  <h5 className="text-center mb-4">
                    Donating to Blood Bank
                  </h5>
                )}

                {appointment.status === 'pending'?(
                  <Form onSubmit={handleSubmit(onAccept)}>
                    <input type="hidden" name="hospitalId" defaultValue={appointment.hospital._id} ref={register({ required: true })} />
                    <input type="hidden" name="appointmentId" defaultValue={appointment._id} ref={register({ required: true })} />
                    <Button variant="primary" type="submit" disabled={isSubmitting} className="mt-3 mb-3 pt-2 pb-2" block>
                      {isSubmitting ? "Loading..." : "Approve Donation"}
                    </Button>
                    {/* <Button variant="danger" type="submit" disabled={isSubmitting} className="mb-3 pt-2 pb-2" block>
                      {isSubmitting ? "Loading..." : "Reject Donation"}
                    </Button> */}
                  </Form>
                ):null}

                {appointment.status === 'approved'?(
                  <>
                    <hr/>
                    <Form onSubmit={handleSubmit(onComplete)} className="mt-3">
                      <p className="text-danger">Please fill in the collected blood pant details</p>
                      {/* include blood details form */}
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Blood Quantity"
                          name="unit"
                          ref={register({ required: true })}
                          className="pt-4 pb-4"
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Full Location"
                          name="fullLocation"
                          ref={register({ required: true })}
                          className="pt-4 pb-4"
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Description"
                          name="description"
                          ref={register({ required: true })}
                          className="pt-4 pb-4"
                        />
                      </Form.Group>

                      <input type="hidden" name="hospitalId" defaultValue={appointment.hospital._id} ref={register({ required: true })} />
                      <input type="hidden" name="appointmentId" defaultValue={appointment._id} ref={register({ required: true })} />

                      <Button variant="primary" type="submit" disabled={isSubmitting} className="mt-3 mb-3 pt-2 pb-2" block>
                        {isSubmitting ? "Loading..." : "Complete Donation"}
                      </Button>
                    </Form>
                  </>
                ):null}

              </Col>
              <Col xs="12" md="8" className="bg-light text-dark">
                <div className="w-100 h-100 d-flex">
                  <img src={logo} className="my-auto mx-auto" alt="donate"/>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HospitalDonation;
