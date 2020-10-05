import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { HiUserCircle } from 'react-icons/hi';
import { useForm } from "react-hook-form";
import { Button, Card, Col, Row, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDateWithTime } from '../../utils/helpers';
import { serverRequest } from '../../utils/serverRequest';
import ngStatesObject from '../../utils/ngStatesObject';
import { AUTH_PROFILE_RESOLVED } from '../../store/types/authTypes';
import { SET_ERROR, SET_SUCCESS } from "../../store/types/notificationTypes";

const Profile = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const { user, token } = useSelector(state => state.auth);
  const { email, firstname, lastname, phone, address, bloodGroup, createdAt, emailVerifiedAt, state, lg } = user;
  const { register, handleSubmit, watch } = useForm();

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const endpoint = `${process.env.REACT_APP_API}/users/${user._id}`;

      const response = await serverRequest(token).post(endpoint, data);
      if (response.data.status === "success") {
        setSuccess(true);
        setIsSubmitting(false);
        //dispatch to update user profile in store
        dispatch({ type: AUTH_PROFILE_RESOLVED, payload: response.data.data})
        dispatch({ type: SET_SUCCESS, payload: "Successful, Profile Updated" });
      }
    } catch (error) {
      setError(error.response.data.message || error.response.data.error);
      dispatch({ type: SET_ERROR, payload: error });
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="display-4 mb-4">Profile</h1>
      <Row>
        <Col xs="12" md="3">
          <Card>
            <Card.Body className="bg-danger text-center">
              <HiUserCircle size="17rem" className="mx-auto" color="white"/>
              <h3 className="my-auto text-white" style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                {firstname} {lastname || 'Welcome'} <br/>
                <small>{email}</small>
              </h3>
            </Card.Body>
          </Card>
          <div className="p-3">
            <h6>Phone: {phone}</h6>
            <h6>State: {state}</h6>
            <h6>Local Government: {lg}</h6>
            <h6>Address: {address}</h6>
            <h6>Registered At: {formatDateWithTime(createdAt)}</h6>
            <h6>Verified At: {formatDateWithTime(emailVerifiedAt)}</h6>
            <h6>Blood Group: {bloodGroup}</h6>
          </div>
        </Col>
        <Col md="6" className="">
          <div className="mx-auto">
            <p className="text-danger">
              Use the form below to update your profile
            </p>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Control type="text" placeholder="Firstname" defaultValue={user.firstname} name="firstname" ref={register({ required: true })} className="pt-4 pb-4" />
              </Form.Group>

              <Form.Group>
                <Form.Control type="text" placeholder="Lastname" defaultValue={user.lastname} name="lastname" ref={register({ required: true })} className="pt-4 pb-4" />
              </Form.Group>

              <Form.Group>
                <Form.Control type="tel" placeholder="+234..." defaultValue={user.phone} name="phone" ref={register({ required: true })} className="pt-4 pb-4" />
              </Form.Group>

              <Form.Group>
                <Form.Control required name="state" defaultValue={user.state} ref={register({ required: true })} as="select" style={{height: '50px'}} custom>
                  <option value="">- Pick a State -</option>
                  {ngStatesObject && Object.keys(ngStatesObject).map((state, index) => <option className="text-capitalize" key={index} value={state}>{state} State</option>)}
                </Form.Control>
              </Form.Group>

              {/* {user.state || watch('state')?( */}
                <Form.Group>
                  <Form.Control name="lg" defaultValue={user.lg} required ref={register({ required: true })} as="select" style={{height: '50px'}} custom>
                    <option value="">- Pick a Local Government -</option>
                    {ngStatesObject && ngStatesObject[user.state || watch('state')].locals.map((lg, index) => <option key={index} value={lg.name}>{lg.name}</option>)}
                  </Form.Control>
                </Form.Group>
              {/* ):null} */}

              <Form.Group>
                <Form.Control type="text" placeholder="address" defaultValue={user.address} name="address" ref={register({ required: true })} className="pt-4 pb-4" />
              </Form.Group>

              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Blood Group</Form.Label>
                <Form.Control name="bloodGroup" defaultValue={user.bloodGroup} ref={register({ required: true })} as="select" style={{height: '50px'}} custom>
                  <option value="">- Pick a Blood Group -</option>
                  <option value="A+">A RhD positive (A+)</option>
                  <option value="A-">A RhD negative (A-)</option>
                  <option value="B+">B RhD positive (B+)</option>
                  <option value="B-">B RhD negative (B-)</option>
                  <option value="O+">O RhD positive (O+)</option>
                  <option value="O-">O RhD negative (O-)</option>
                  <option value="AB+">AB RhD positive (AB+)</option>
                  <option value="AB-">AB RhD negative (AB-)</option>
                </Form.Control>
              </Form.Group>

              <Button variant="danger" type="submit" disabled={isSubmitting} className="mb-3 pt-2 pb-2" block>
                {isSubmitting ? "Loading..." : "Update"}
              </Button>
              {error ? (
                <Alert variant="warning" className="text-center">
                  {error}
                </Alert>
              ) : null}
              {success ? (
                <Alert variant="info" className="text-center">
                  Successfully updated profile. <br/>
                  <Button variant="outline-danger" as={Link} to="/dashboard" type="button" className="mb-3 pt-2 pb-2 mt-3" block>
                    Go Dashboard
                  </Button>
                </Alert>
              ) : null}
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
