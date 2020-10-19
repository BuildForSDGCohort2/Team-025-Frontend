import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from '../../assets/images/logo_2.png';
import illustration from "../../assets/images/undraw_team_work_k80m.svg";
import { serverRequest } from "../../utils/serverRequest";
import "../signup/signup.css";

const ResetPasswordConfirm = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [error, setError] = useState()
  const [tokenError, setTokenError] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const [success, setSuccess] = useState(false);

  const { search } = useLocation();
  const params = new URLSearchParams(search)
  const token = params.get('token');
  const email = params.get('email');

  useEffect(() => {
    window.scrollTo(0,0);
    const verifyToken = async () => {
      try {
        setIsCheckingToken(true);
        const endpoint = `${process.env.REACT_APP_API}/reset/${token}`;
        const response = await serverRequest().get(endpoint);
        if(response.data.status === 'success'){
          setTokenError(false)
          setIsCheckingToken(false);
        }
      } catch (error) {
        setTokenError(true);
        setIsCheckingToken(false);
      }
    }
    verifyToken();
  }, [token])

  const onSubmit = async data => {
    try {
      setIsSubmitting(true);
      setError('');
      const endpoint = `${process.env.REACT_APP_API}/reset/${token}`;

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
              Reset <br />
              Password
            </h2>
            <p className="text-danger">Please input your new password</p>
            <p>{email}</p>
            {isCheckingToken?(
              <div className="mt-5 mb-5">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ):(
              <>
                {tokenError?(
                  <Alert variant='danger' className="text-center">
                    Password reset token is invalid or has expired.
                    <Button variant="primary" as={NavLink} to="/reset" className=" mt-3 mb-3 pt-2 pb-2" block>
                      Resend Link
                    </Button>
                  </Alert>
                ):(
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control type="hidden" placeholder="Enter email" defaultValue={email} disabled={true} name="email" ref={register({ required: true })} className="pt-4 pb-4" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control type="password" name="password" ref={register({ required: true })} placeholder="Password" className="pt-4 pb-4" />
                    </Form.Group>

                    <Form.Group controlId="formBasicComfirmPassword">
                      <Form.Control type="password" name="confirmpassword" ref={register({ required: true, validate: (value) => value === watch('password') })} placeholder="Confirm Password" className="pt-4 pb-4" />
                      {errors.confirmpassword && <Form.Text className="text-danger" muted>Password do not match</Form.Text>}
                    </Form.Group>

                    <Button variant="danger" type="submit" disabled={isSubmitting} className="mb-3 pt-2 pb-2" block>
                      {isSubmitting?'Loading...':'Reset Password'}
                    </Button>
                    {error?(
                      <Alert variant='warning' className="text-center">
                        {error}
                      </Alert>
                    ):null}
                    {success?(
                      <Alert variant='info' className="text-center">
                        Congratulation, your password reset was successful. Please login to continue.
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
                )}
              </>
            )}

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
            <h5 className="mt-4">Already have an account?</h5>
            <Button variant="light" as={NavLink} to="/signin" className="mb-3 pt-2 pb-2" block>
              Sign In
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordConfirm;
