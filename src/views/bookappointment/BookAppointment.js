import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { AppointmentHistory } from '../../components'
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { serverRequest } from "../../utils/serverRequest";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import ngStatesObject from "../../utils/ngStatesObject";
import { SET_ERROR, SET_SUCCESS } from "../../store/types/notificationTypes";
import "react-datepicker/dist/react-datepicker.css";

const BookAppointment = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [date, setDate] = useState(new Date());

  const { register, handleSubmit, watch } = useForm();

  const { push } = useHistory();
  const dispatch = useDispatch();

  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data) => {
    try {
      data['date'] = date;
      setIsSubmitting(true);
      const endpoint = `${process.env.REACT_APP_API}/appointments`;
      const response = await serverRequest(token).post(endpoint, data);
      if (response.data.status === "success") {
        setIsSubmitting(false);
        dispatch({ type: SET_SUCCESS, payload: "Successful, Appointment Booked" });
        push('/donation/history')
      }
    } catch (error) {
      setError(error.response.data.message || error.response.data.error);
      dispatch({ type: SET_ERROR, payload: error });
      setIsSubmitting(false);
    }
  };

  const getHospitals = async (lg) => {
    try {
      const lg = watch('lg');
      setLoadingHospitals(true)
      const endpoint = `${process.env.REACT_APP_API}/hospitals/${lg}`;
      const response = await serverRequest(token).get(endpoint);
      if (response.data.status === "success") {
        setHospitals(response.data.data);
        setLoadingHospitals(false)
      }
    } catch (error) {
      setLoadingHospitals(false)
    }
  }

  return (
    <div>
      <h1 className="display-4 mb-4">Donate to Bank</h1>
      <Row>
        <Col xs="12" md="6">
          <Card>
            <Card.Body>
              <h6>Book a new Appointment</h6>
              <p className="text-danger">
              Please complete the form to start your donation
            </p>
            <Form onSubmit={handleSubmit(onSubmit)}>

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
                  <Form.Control name="lg" required ref={register({ required: true })} onChange={(e) => getHospitals(e.target.value)} as="select" style={{height: '50px'}} custom>
                    <option value="">- Pick a Local Government -</option>
                    {ngStatesObject && ngStatesObject[watch('state')].locals.map((lg, index) => <option key={index} value={lg.name}>{lg.name}</option>)}
                  </Form.Control>
                </Form.Group>
              ):null}

              <div className="mt-3 mb-3">{loadingHospitals?<Spinner/>:null}</div>

              {watch('state') && watch('lg') && hospitals?(
                <Form.Group>
                  <Form.Label>Hospitals in {watch('lg')} Local Gov of {watch('state')}</Form.Label>
                  <Form.Control required name="hospital" ref={register({ required: true })} as="select" style={{height: '50px'}} custom>
                    <option value="">- Pick a Hospital -</option>
                    {hospitals && hospitals.map((hospital, index) => <option key={index} value={hospital._id}>{hospital.name}</option>)}
                  </Form.Control>
                </Form.Group>
              ):null}

              <Form.Group className="w-100">
                <Form.Label>Appointment Date</Form.Label><br/>
                <DatePicker
                  name="date"
                  selected={date}
                  required
                  onChange={date => setDate(date)}
                  timeIntervals={15}
                  minDate={new Date()}
                  // ref={register({ required: true })}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  showTimeSelect
                  className="p-1 form-control pt-4 pb-4 w-100 pl-3"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control type="text" placeholder="Comment" name="comment" ref={register({ required: true })} className="pt-4 pb-4" />
              </Form.Group>

              <input type="hidden" name="type" defaultValue="bank" ref={register({ required: true })} />

              <Button variant="danger" type="submit" disabled={isSubmitting} className="mb-3 pt-2 pb-2" block>
                {isSubmitting ? "Loading..." : "Book Now"}
              </Button>
              {error ? (
                <Alert variant="warning" className="text-center">
                  {error}
                </Alert>
              ) : null}
            </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" md="6">
          <AppointmentHistory/>
        </Col>
      </Row>
    </div>
  )
}

export default BookAppointment

