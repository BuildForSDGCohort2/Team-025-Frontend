import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { GiHealing, GiHealthPotion } from "react-icons/gi";
import { SiWorldhealthorganization } from "react-icons/si";
import { Link } from "react-router-dom";

const Aboutsection = () => {
  return (
    <div>
      <Container className="pb-5">
        <Row>
          <Col className="text-center">
            <h2 className="mt-5 display-4">Donation with benefits</h2>
            <p>
              Blood donors are grouped into voluntary donors and beneficiaries. The safest of these is the voluntary
              donor blood. Blood banking is highly regulated to ensure both donor and recipient safety. The goal of
              blood banking is to provide adequate and safe blood to recipients at no risk to donors.
            </p>
            <div className="ruler mb-5"></div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs="12" sm="6" md="6" lg="4">
            <Card className="p-4 border border-dark mb-4">
              <GiHealing size="4rem" color="coral" />
              <h3 className="display-4">Social media</h3>
              <p>
                Social media badges are some of the latest sharing tools developed. These can be shared with anybody to
                display live number counts for donations.
              </p>
              <hr style={{ borderTop: "1px solid rgb(27 20 20 / 70%)" }} />
              <div className="d-flex justify-content-between">
                <h5 className="text-secondary text-danger">
                  <small>Social Badges</small>
                </h5>
                <h6>100%</h6>
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="6" lg="4">
            <Card className="p-4 border border-dark mb-4">
              <GiHealthPotion size="4rem" color="coral" />
              <h3 className="display-4">Free Health Care</h3>
              <p>
                Free health care policies aim to reduce the financial barriers that people may experience when trying to
                access health services.
              </p>
              <hr style={{ borderTop: "1px solid rgb(27 20 20 / 70%)" }} />
              <div className="d-flex justify-content-between">
                <h5 className="text-secondary text-danger">
                  <small>Free Care</small>
                </h5>
                <h6>100%</h6>
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="6" lg="4">
            <Card className="p-4 border border-dark">
              <SiWorldhealthorganization size="4rem" color="coral" />
              <h3 className="display-4">World Recognition</h3>
              <p>You have the opportunity to have an international Recognition after donation.</p>
              <hr style={{ borderTop: "1px solid rgb(27 20 20 / 70%)" }} />
              <div className="d-flex justify-content-between">
                <h5 className="text-secondary text-danger">
                  <small>Int Recognition</small>
                </h5>
                <h6>100%</h6>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button variant="danger" className="mb-5" size="lg" as={Link} to="/signup">
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Aboutsection;
