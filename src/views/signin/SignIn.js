import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import illustration from "../../assets/images/undraw_team_work_k80m.svg";
import logo from '../../assets/images/logo_2.png'
import "../signup/signup.css";
import { AUTH_FETCH, AUTH_RESOLVED } from "../../store/types/authTypes";
import { serverRequest } from "../../utils/serverRequest";

const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()
  const { register, handleSubmit } = useForm();

  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  const onSubmit = async data => {
    try {
      setIsSubmitting(true);
      dispatch({type: AUTH_FETCH})
      const endpoint = `${process.env.REACT_APP_API}/login`;

      const response = await serverRequest().post(endpoint, data);
      if(response.data.status === 'success' ){
        dispatch({type: AUTH_RESOLVED, payload: response.data.data })
        const { role }= response.data.data;
        switch (role) {
          case 'hospital':
            push('/h/dashboard');
            break;
          case 'admin':
            push('/a/dashboard');
            break;
          default:
            push('/dashboard');
            break;
        }
      } else {
        setError("invalid credentials");
        setIsSubmitting(false);
      }
    } catch (error) {
      setError("invalid credentials");
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
              Sign in to <br />
              BloodNation
            </h2>
            <p className="text-danger">Follow the easy step to get started with bloodnation</p>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" name="email" ref={register({ required: true })} className="pt-4 pb-4" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" name="password" ref={register({ required: true })} className="pt-4 pb-4" />
              </Form.Group>

              <Button variant="danger" type="submit" disabled={isSubmitting} className="mb-3 pt-2 pb-2" block>
                {isSubmitting?'Loading...':'Sign In'}
              </Button>
              {error?(
                <Alert variant='warning' className="text-center">
                  {error}
                </Alert>
              ):null}
              <p className="text-center">Or Sign in with social media</p>
              <Button variant="outline-danger" className="pt-2 pb-2" block>
                Sign in with Google
              </Button>
              <Button variant="outline-danger" className="mb-3 pt-2 pb-2" block>
                Sign in with Facebook
              </Button>
            </Form>
            <h5>
              Don't have an account? <NavLink to="/signup"> Sign Up</NavLink>
            </h5>
          </div>
        </Col>
        <Col md="6" className="text-white text-center d-flex signup-red-box">
          <div className="signupbox one d-none d-md-block"></div>
          <div className="signupbox two d-none d-md-block"></div>
          <div className="signupbox five"></div>
          <div className="signupbox six"></div>
          <div className="signup-illustration-box my-auto mx-auto pt-3 pb-5">
            <h1 className="display-4 mt-4 mb-3">
              Sign In to start
              <br /> Donating
            </h1>
            <img src={illustration} className="img-fluid illustration mb-3" alt="sign up" />
            <p className="mb-4 text-white">Give blood, do something amazing and save lives</p>
            <hr className="border" />
            <h5 className="mt-4">Dont have an account?</h5>
            <Button variant="light" as={NavLink} to="/signup" className="mb-3 pt-2 pb-2" block>
              Sign Up
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
