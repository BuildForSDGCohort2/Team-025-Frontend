import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./landinghero.css";
import { Link } from "react-router-dom";
import img from "../assets/images/undraw_team_work_k80m.svg";

const LandingHero = () => {
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
                <h1 className="display-4" style={{ fontSize: "3.5rem" }}>
                  Help Donate or <br />
                  Get a Pant Today
                </h1>
                <h3 className="mb-4">
                  Do something amazing and save lives <br />
                  Everyone could be a hero.
                </h3>
                <Button variant="danger" size="lg" as={Link} to="/signup">
                  Get Started
                </Button>
                <Button className="" variant="link" size="lg">
                  Learn More
                </Button>
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

export default LandingHero;
