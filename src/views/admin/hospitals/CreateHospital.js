import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FrameMap } from '../../../components';
import { SET_ERROR, SET_SUCCESS } from "../../../store/types/notificationTypes";
import ngStatesObject from "../../../utils/ngStatesObject";
import { serverRequest } from "../../../utils/serverRequest";

const CreateHospital = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const { register, handleSubmit, watch } = useForm();

  const { push } = useHistory();
  const dispatch = useDispatch();

  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const endpoint = `${process.env.REACT_APP_API}/hospitals`;
      const response = await serverRequest(token).post(endpoint, data);
      if (response.data.status === "success") {
        setIsSubmitting(false);
        dispatch({ type: SET_SUCCESS, payload: "Successful, Hospital Created" });
        push('/a/hospitals')
      }
    } catch (error) {
      setError(error.response.data.message || error.response.data.error);
      dispatch({ type: SET_ERROR, payload: error });
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="display-4 mb-4">Create Hospital</h1>
      <Row>
        <Col xs="12" md="12">
          <Card>
            <Row className="no-gutters">
              <Col xs="12" md="5" className="p-4">
                <h6>Create a new hospital</h6>
                <p className="text-danger">
                  Please complete the form to create a hospital
                </p>
              <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group>
                  <Form.Control type="text" placeholder="Name" name="name" ref={register({ required: true })} className="pt-4 pb-4" />
                </Form.Group>

                <Form.Group>
                  <Form.Control type="email" placeholder="Email" name="email" ref={register({ required: true })} className="pt-4 pb-4" />
                </Form.Group>

                <Form.Group>
                  <Form.Control type="text" placeholder="Firstname" name="firstname" ref={register({ required: true })} className="pt-4 pb-4" />
                </Form.Group>

                <Form.Group>
                  <Form.Control type="text" placeholder="Lastname" name="lastname" ref={register({ required: true })} className="pt-4 pb-4" />
                </Form.Group>

                <Form.Group>
                  <Form.Control type="tel" placeholder="+234..." name="phone" ref={register({ required: true })} className="pt-4 pb-4" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control required name="state" ref={register({ required: true })} as="select" style={{height: '50px'}} custom>
                    <option value="">- Pick a State -</option>
                    {ngStatesObject && Object.keys(ngStatesObject).map((state, index) => <option className="text-capitalize" key={index} value={state}>{state} State</option>)}
                  </Form.Control>
                </Form.Group>

                {watch('state')?(
                  <Form.Group>
                    <Form.Label>Local Government</Form.Label>
                    <Form.Control name="lg" required ref={register({ required: true })} as="select" style={{height: '50px'}} custom>
                      <option value="">- Pick a Local Government -</option>
                      {ngStatesObject && ngStatesObject[watch('state')].locals.map((lg, index) => <option key={index} value={lg.name}>{lg.name}</option>)}
                    </Form.Control>
                  </Form.Group>
                ):null}

                <Form.Group>
                  <Form.Control type="text" placeholder="Address" name="address" ref={register({ required: true })} className="pt-4 pb-4" />
                </Form.Group>

                <Form.Group>
                  <Form.Control type="text" placeholder="Map link" name="latitude" ref={register({ required: true })} className="pt-4 pb-4" />
                </Form.Group>

                <Button variant="danger" type="submit" disabled={isSubmitting} className="mb-3 pt-2 pb-2" block>
                  {isSubmitting ? "Loading..." : "Create Now"}
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
                  name={watch('name')}
                  lat={watch('latitude')}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreateHospital;

