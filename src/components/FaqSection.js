import React, { useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./landinghero.css";
import "./faqsection.css";
import { Link } from "react-router-dom";
import img from "../assets/images/undraw_team_work_k80m.svg";
import ngQnA from "../utils/ngQnA";

const FaqSection = () => {
  const here = useRef(null);

  const expand = async (index) => {
    if ("expanded-content" === here.current.children[index].children[1].className) {
      here.current.children[index].children[1].className = "colapsed-content";
    } else {
      here.current.children[index].children[1].className = "expanded-content";
    }
  };
  const QnAHtml = ngQnA.map((QnA, index) => (
    <section className="expandable" key={index}>
      <div
        className={"expandable-header "}
        onClick={() => {
          expand(index);
        }}
      >
        <h4 className="expandable-title">{QnA.question}</h4>
      </div>
      <div className={"colapsed-content " + index}>
        <div className="expandable-body">
          <p>{QnA.answer}</p>
        </div>
      </div>
    </section>
  ));

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
            <Col sm="12" md="7" className="text-center text-md-left">
              <div className="mt-3 mb-5">
                <h1 className="display-4">Frequently Asked Questions</h1>
                <div ref={here} className="faq">
                  {QnAHtml}
                </div>
                <Button variant="danger" size="lg" as={Link} to="/contactus">
                  ASK A QUESTION
                </Button>
              </div>
            </Col>
            <Col sm="12" md="5">
              <img src={img} alt="doctors" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default FaqSection;
