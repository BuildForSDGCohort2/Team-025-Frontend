import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./landinghero.css";
import img from "../assets/images/undraw_team_work_k80m.svg";
import emailjs from "emailjs-com";

const Contactsection = () => {
  const { register } = useForm();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    try {
      const result = await emailjs.sendForm("gmail", "template_gf2appn", e.target, "user_obidpFtNW5NtkIU1Xr7gH");
      console.log(result.text);
    } catch (error) {
      console.log(error.text);
    }
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
                <Form onSubmit={onSubmit}>
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
                    {"SEND"}
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
