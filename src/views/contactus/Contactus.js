import React, { useEffect } from 'react';
import { Contactsection } from "../../components";
// import { Button, Card, Col, Row, Table, Spinner } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import useRequests from "../../hooks/useRequests";

const Contactus = () => {
  // const { isLoading, requests } = useRequests();
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <div style={{ marginTop: "72px", minHeight: "600px" }}>
      <Contactsection />
    </div>
  );
};

export default Contactus;
