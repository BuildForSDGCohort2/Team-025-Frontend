import React, { useEffect } from "react";
import { Card, Table, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useBanks from '../../../hooks/useBanks';
import { formatDateWithTime } from '../../../utils/helpers';

const Bank = () => {

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const { isLoading, pants } = useBanks();

  return (
    <div>
      <h1 className="display-4 mb-4">Blood Bank</h1>
      <Card>
        <Card.Body>
          <h6 className="mb-3">Donated Blood Pants</h6>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Added Date</th>
                <th>Donor</th>
                <th>Group</th>
                <th>Status</th>
                <th>Quantity</th>
                <th className="d-none d-md-table-cell">Beneficiary</th>
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
                  {pants && pants.length > 0?(
                    <>
                      {pants.map((pant, index) => (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{formatDateWithTime(pant.createdAt)}</td>
                          <td className="text-capitalize">{pant.donor.firstname} {pant.donor.lastname}</td>
                          <td className="text-capitalize text-danger">{pant.bloodGroup}</td>
                          <td>{pant.status}</td>
                          <td>{pant.unit}</td>
                          <td className="d-none d-md-table-cell">{(pant.beneficiary && pant.beneficiary.firstname) || "Not"} {(pant.beneficiary && pant.beneficiary.lastname) || "Assigned"}</td>
                          <td width="50"><Button className="" as={Link} to={`/h/bank/${pant.id}`} size="sm" variant="danger">More</Button></td>
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
  );
};

export default Bank;
