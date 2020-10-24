import React, { useEffect } from 'react';
import { Button, Card, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAdminHospitals from '../../../hooks/useAdminHospitals';

const Hospitals = () => {

  const { isLoading, hospitals } = useAdminHospitals()

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div>
      <h1 className="display-4 mb-4">All Hospitals</h1>
      <Card>
        <Card.Body>
          <Button variant="danger" as={Link} to="/a/hospitals/create-hospital" className="mb-3">
            Create Hospital
          </Button>
          <h6 className="mb-3">Hospitals</h6>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>State</th>
                <th>LGA</th>
                <th>Email</th>
                <th className="d-none d-md-table-cell">Address</th>
                <th>Phone</th>
                <th></th>
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
                  {hospitals && hospitals.length > 0?(
                    <>
                      {hospitals.map((hospital, index) => (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{hospital.name}</td>
                          <td className="text-capitalize">{hospital.state}</td>
                          <td className="text-capitalize">{hospital.lg}</td>
                          <td className="text-danger">{hospital.address}</td>
                          <td>{hospital.email}</td>
                          <td className="d-none d-md-table-cell">{hospital.phone}</td>
                          <td width="50"><Button className="" as={Link} to={`/a/hospitals/${hospital._id}`} size="sm" variant="danger">More</Button></td>
                        </tr>
                      ))}
                    </>
                  ):(
                    <tr>
                      <td colSpan="8">No Appointment</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Hospitals;

