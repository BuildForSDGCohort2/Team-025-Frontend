import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./landinghero.css";
import { Link } from "react-router-dom";
import img from "../assets/images/undraw_team_work_k80m.svg";

const Contactsection = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (data) => {
    console.log("Submited");
    // try {
    //   setIsSubmitting(true);
    //   setError('');
    //   dispatch({type: AUTH_FETCH})
    //   const endpoint = `${process.env.REACT_APP_API}/signup`;

    //   const response = await serverRequest().post(endpoint, data);
    //   if(response.data.status === 'success'){
    //     setSuccess(true)
    //     setIsSubmitting(false);
    //   } else {
    //     setError("registration error");
    //     setIsSubmitting(false);
    //   }
    // } catch (error) {
    //   const err = error.response.data.message || error.response.data.data;
    //   setError(err);
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div className="shapes">
      <div className="box one d-none d-md-block"></div>
      <div className="box two d-none d-md-block"></div>
      <div className="box three"></div>
      <div className="box four"></div>
      <div className="box five"></div>
      <div className="box six"></div>
      <div className="box seven"></div>
      <div className="hero-box">
        <Container>
          <Row>
            <Col sm="12" md="5" className="text-center text-md-left">
              <div className="mt-3 mb-5">
                <h1 className="display-4">Contact us</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="formBasicName">
                    <Form.Control
                      type="text"
                      ref={register({ required: true })}
                      placeholder="Full name"
                      name="name"
                      className="pt-4 pb-4"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      ref={register({ required: true })}
                      placeholder="Email address"
                      name="email"
                      className="pt-4 pb-4"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicSubject">
                    <Form.Control
                      type="text"
                      ref={register({ required: true })}
                      placeholder="Subject"
                      name="subject"
                      className="pt-4 pb-4"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicMessage">
                    <Form.Control
                      as="textarea"
                      rows="4"
                      ref={register({ required: true })}
                      placeholder="Message"
                      name="message"
                      className="pt-4 pb-4"
                    />
                  </Form.Group>

                  <Button variant="danger" type="submit" className="mb-3 pt-2 pb-2" block>
                    {"Submit"}
                  </Button>
                </Form>
              </div>
            </Col>
            <Col sm="12" md="7">
              <img src={img} alt="doctors" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Contactsection;
