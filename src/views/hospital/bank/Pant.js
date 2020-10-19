import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useForm } from "react-hook-form";
import { HiUserCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/images/logo_2.png";
import useBank from "../../../hooks/useBank";
import useHospitalRequests from "../../../hooks/useHospitalRequests";
import { BANK_RESOLVE } from "../../../store/types/banksTypes";
import { SET_ERROR, SET_SUCCESS } from "../../../store/types/notificationTypes";
import { formatDateWithTime } from "../../../utils/helpers";
import { serverRequest } from "../../../utils/serverRequest";


const Pant = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const { isLoading, pant } = useBank();
  const { register, watch, handleSubmit } = useForm();
  const { isLoading: isLoadingReq, requests: req } = useHospitalRequests();

  const { token } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.notification);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [message]);

  if (isLoading || isLoadingReq) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (!isLoading && !pant) {
    return (
      <div className="pb-5">
        <h1 className="display-4 mb-0">Pant not found</h1>
      </div>
    );
  }

  const compartibility = {
    'A+': 'A+,A-,O+,O-',
    'A-': 'A-,O-',
    'B+': 'B+,B-,O+,O-',
    'B-': 'B-,O-',
    'AB+': 'A+,A-,O+,O-,B+,B-,AB+,AB-',
    'AB-': 'AB-,A-,B-,O-',
    'O+': 'O+,O-',
    'O-': 'O-'
  };

  const condition = compartibility[pant.bloodGroup];

  console.log(condition)

  const requests = req.filter(reqt => condition.includes(reqt.bloodReceiverId.bloodGroup))

  const onSubmit = async (data) => {
    if (window.confirm("Confirm Blood Pant Update")) {
      try {
        setIsSubmitting(true);
        const endpoint = `${process.env.REACT_APP_API}/hospitals/banks/${data.pantId}`;
        const response = await serverRequest(token).post(endpoint, data);
        if (response.data.status === "success") {
          setIsSubmitting(false);
          dispatch({ type: SET_SUCCESS, payload: "Successful, Blood Pant Updated" });
          dispatch({
            type: BANK_RESOLVE,
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
      <h1 className="display-4 mb-3">Blood Pant</h1>
      <Row>
        <Col xs="12" md="12">
          <Card>
            <Row className="no-gutters">
              <Col xs="12" md="4" className="p-4">
                <div className="text-center text-capitalize">
                  <Badge pill variant="danger">
                    {pant.status}
                  </Badge>
                </div>
                <h6 className="mb-3 text-center mt-2">
                  Created Date:
                  <br />
                  <span className="text-muted">{formatDateWithTime(pant.date)}</span>
                </h6>
                <h6 className="text-center">BLOOD GROUP+</h6>
                <div style={{ width: "50%" }} className="mx-auto">
                  <CircularProgressbar
                    value={pant.bloodGroup || "--"}
                    text={`${pant.bloodGroup || "--"}`}
                    styles={buildStyles({
                      textColor: "red",
                      pathColor: "red",
                      trailColor: "blue"
                    })}
                  />
                </div>
                <h5 className="text-center mt-2 mb-0 text-danger">
                  Quantity: {pant.unit}
                </h5>
                <h5 className="text-center mt-2 mb-0">
                  {pant.donor.firstname} {pant.donor.lastname}
                </h5>
                <p className="text-center">
                  <small>
                    {pant.donor.address} {pant.donor.lg}, {pant.donor.state}
                    <br />
                    {pant.donor.phone}
                  </small>
                  <br />
                </p>
                {pant.beneficiary && pant.status !== 'AVAILABLE'? (
                  <>
                    <Badge variant="primary">Beneficiary</Badge>
                    <Card className="bg-primaryy text-whitee">
                      <Card.Body className="d-flex">
                        <HiUserCircle size="8rem" />
                        <div>
                          <h5 className="mt-3">
                            {pant.beneficiary.firstname} {pant.beneficiary.lastname}
                          </h5>
                          <p className="mb-0 text-capitalize">
                            {pant.beneficiary.lg}, {pant.beneficiary.state}
                          </p>
                          <p className="mb-0 text-capitalize">{pant.beneficiary.email}</p>
                          <p className="mb-0 text-capitalize">{pant.beneficiary.phone}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </>
                ) : (
                  <>
                    <h5 className="text-center mb-0">In Blood Bank</h5>
                    <h5 className="text-center mb-4 text-danger">
                      <small>{pant.fullLocation}</small>
                    </h5>
                  </>
                )}

                {pant.status !== "EXHAUSTED" ? (
                  <>
                    <hr />

                    {/* <Form onSubmit={handleSubmit(onUpdate)} className="mt-3"> */}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <p className="text-danger text-center">Update Blood Pant Details</p>

                      <Form.Group>
                        <Form.Control required name="status" defaultValue={pant.status} ref={register({ required: true })} as="select" style={{height: '50px'}} custom>
                          <option value="">- Pick Status -</option>
                          {pant.status !== "AVAILABLE" && pant.status !== "BOOKED"?<option value="AVAILABLE">Available</option>:null}
                          {pant.status !== "BOOKED" && pant.status === "AVAILABLE"?<option value="BOOKED">Booked</option>:null}
                          <option value="EXHAUSTED">Exhausted</option>
                        </Form.Control>
                      </Form.Group>

                      {watch('status') && watch('status') === "BOOKED"?(
                        <Form.Group>
                          <Form.Control required name="request" defaultValue={pant.status} ref={register({ required: true })} as="select" style={{height: '50px'}} custom>
                            <option value="">- Pick Beneficiary -</option>
                            {requests && requests.map(request => (
                              <option key={request.id} value={request.id}>{`(${request.bloodReceiverId.bloodGroup})`} {request.bloodReceiverId.firstname} {request.bloodReceiverId.lastname} </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      ):null}

                      <input
                        type="hidden"
                        name="pantId"
                        defaultValue={pant.id}
                        ref={register({ required: true })}
                      />

                      <Button
                        variant="danger"
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-3 mb-3 pt-2 pb-2"
                        block
                      >
                        {isSubmitting ? "Loading..." : "Update Pant"}
                      </Button>
                    </Form>
                  </>
                ) : null}
              </Col>
              <Col xs="12" md="8" className="bg-light text-dark">
                <div className="w-100 h-100 d-flex">
                  <img src={logo} className="my-auto mx-auto" alt="donate" />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Pant;
