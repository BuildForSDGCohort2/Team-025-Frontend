import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import illustration from "../../assets/images/undraw_team_work_k80m.svg";
import logo from '../../assets/images/logo_2.png'
import "./signup.css";
import { serverRequest } from "../../utils/serverRequest";
import { AUTH_FETCH } from "../../store/types/authTypes";

const SignUp = () => {

  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  const onSubmit = async data => {
    try {
      setIsSubmitting(true);
      setError('');
      dispatch({type: AUTH_FETCH})
      const endpoint = `${process.env.REACT_APP_API}/signup`;

      const response = await serverRequest().post(endpoint, data);
      if(response.data.status === 'success'){
        setSuccess(true)
        setIsSubmitting(false);
      } else {
        setError("registration error");
        setIsSubmitting(false);
      }
    } catch (error) {
      const err = error.response.data.message || error.response.data.data;
      setError(err);
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="h-100 auth-container">
      <Row className="h-100">
        <Col md="6" className="pt-5">
          <div className="auth-box mx-auto">
            <Link to="/">
              <img src={logo} alt="bloodnation logo" className="img-fluid mb-5"/>
            </Link>
            <h2 className="display-4">
              Sign up to <br />
              BloodNation
            </h2>
            <p className="text-danger">Follow the easy step to get started with bloodnation</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" name="email" ref={register({ required: true })} className="pt-4 pb-4" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" name="password" ref={register({ required: true })} placeholder="Password" className="pt-4 pb-4" />
              </Form.Group>

              <Form.Group controlId="formBasicComfirmPassword">
                <Form.Control type="password" name="confirmpassword" ref={register({ required: true, validate: (value) => value === watch('password') })} placeholder="Confirm Password" className="pt-4 pb-4" />
                {errors.confirmpassword && <Form.Text className="text-danger" muted>Password do not match</Form.Text>}
              </Form.Group>

              <Button variant="danger" type="submit" disabled={isSubmitting} className="mb-3 pt-2 pb-2" block>
                {isSubmitting?'Loading...':'Create Account'}
              </Button>
              {error?(
                <Alert variant='warning' className="text-center">
                  {error}
                </Alert>
              ):null}
              {success?(
                <Alert variant='info' className="text-center">
                  Congratulation, Your registration was successful. Please check your inbox or span to confirm your registration
                </Alert>
              ):null}
              <p className="text-center">Or Sign up with an email</p>
              <Button variant="outline-danger" className="pt-2 pb-2" block>
                Sign up with Google
              </Button>
              <Button variant="outline-danger" className="mb-3 pt-2 pb-2" block>
                Sign up with Facebook
              </Button>
              <p>
                By signing up, i agree to the BloodNation Privacy Policy
                <br /> and Terms of Servcie
              </p>
            </Form>
            <h5>
              Have an account? <NavLink to="/signin"> Sign in</NavLink>
            </h5>
          </div>
        </Col>
        <Col md="6" className="text-white text-center d-flex signup-red-box">
          <div className="signupbox one d-none d-md-block"></div>
          <div className="signupbox two d-none d-md-block"></div>
          <div className="signupbox five"></div>
          <div className="signupbox six"></div>
          <div className="signup-illustration-signupbox my-auto mx-auto pt-3 pb-5">
            <h1 className="display-4 mt-4 mb-3">
              Register to be a<br /> Blood Donor
            </h1>
            <img src={illustration} className="img-fluid illustration mb-3" alt="sign up" />
            <p className="mb-4 text-white">Give blood, do something amazing and save lives</p>
            <hr className="border" />
            <h5 className="mt-4">Have an account?</h5>
            <Button variant="light" as={NavLink} to="/signin" className="mb-3 pt-2 pb-2" block>
              Sign In
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
