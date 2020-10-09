import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import donate from "../../assets/images/donate.PNG";
import logo from '../../assets/images/logo_transparent2.png'
import { VscRequestChanges } from 'react-icons/vsc';
import { RiBankCardLine } from 'react-icons/ri';
import { GiWaterDrop } from 'react-icons/gi';

function About() {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <div className="pb-5">
      <div className="shapes">
      <div className="box one d-none d-md-block"></div>
      <div className="box three"></div>
      <div className="box four"></div>
      <div className="box five"></div>
      <div className="box six"></div>
      <div className="box seven"></div>
        <div className="hero-box">
          <Container>
            <Row>
              <Col sm="12" md="6" className="text-center text-md-left">
                <div className="mt-3 mb-5">
                  <img src={logo} alt="doctors" className="img-fluid mb-4" />
                  <h1 className="display-4" style={{ fontSize: "3.5rem" }}>
                    About Us
                  </h1>
                  <h3 className="mb-4">
                    Do something amazing and save lives <br />
                    Everyone could be a hero.
                  </h3>
                  <Button variant="danger" className="mt-3" size="lg" as={Link} to="/signup">
                    Get Started
                  </Button>
                </div>
              </Col>
              <Col sm="12" md="6" className="pt-5">
                <img src={donate} alt="doctors" className="img-thumbnail" />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div>
        <Container>
          <Card className="mb-5 shadow-lg rounded pl-5 pr-5 pb-5 text-center">
            <Card.Body>
              <h2 className="display-4 mt-3 mb-5 text-center">Latest Bloodnation Features</h2>
              <Row>
                <Col xs="12" md="4">
                  <VscRequestChanges size="5rem" color="red"/>
                  <h3 className="mt-3 mb-3 text">Easy Request</h3>
                  <h6>Bloodnation has a very simplified and quick interface that ease your request.</h6>
                </Col>
                <Col xs="12" md="4">
                  <RiBankCardLine size="5rem" color="red"/>
                  <h3 className="mt-3 mb-3 text">Blood Banks</h3>
                  <h6>We have hundreds of hospital/blood banks nation wide and ready to take and dispatch pants of bloods</h6>
                </Col>
                <Col xs="12" md="4">
                  <GiWaterDrop size="5rem" color="red"/>
                  <h3 className="mt-3 mb-3 text">Easy Donate</h3>
                  <h6>You don't have to go through stress to donate on the platform. Hospitals are ready to accept donors immediately.</h6>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  )
}

export default About;

