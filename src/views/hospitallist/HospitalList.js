import React, { useEffect } from "react";
import useHospitals from "../../hooks/useHospitals";
import { Card, Col, Row, Table, Spinner } from 'react-bootstrap'

function HospitalList() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoading, hospitals } = useHospitals();

  return (
    <div className="">
      <h1 className="display-4 mb-4">Registered Hospitals</h1>
      <Row>
        <Col xs="12" md="12">
          <Card style={{minHeight: '400px'}}>
            <Card.Body>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hospital</th>
                    <th>State</th>
                    <th>LGA</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>address</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading?(
                    <tr>
                      <td colSpan="8" className="text-center">
                        <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      </td>
                    </tr>
                  ):(
                  <>
                  {hospitals && hospitals.length > 0 ?(
                    hospitals.map((hospital, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td className="text-capitalize">{hospital.name}</td>
                        <td className="text-capitalize">{hospital.state}</td>
                        <td className="text-capitalize">{hospital.lg}</td>
                        <td className="text-capitalize">{hospital.phone}</td>
                        <td className="">{hospital.email}</td>
                        <td className="text-capitalize">{hospital.address}</td>
                      </tr>
                    ))
                  ):(
                    <tr>
                      <td className="text-center" colSpan="9">You don't have a request</td>
                    </tr>
                  )}
                  </>
                )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HospitalList;
