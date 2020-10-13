import React, { useEffect } from 'react';
import { Button, Card, ProgressBar, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useHospitalAppointments from '../../hooks/useHospitalAppointments';
import { formatDateWithTime, appointmentStatus } from '../../utils/helpers';

function HospitalAppointmentHistory() {

  const { isLoading, appointments } = useHospitalAppointments();

  useEffect(() => {
  }, [])

  return (
    <div>
      <Card>
        <Card.Body>
          <h6 className="mb-3">Donation Appointments</h6>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Appointment Date</th>
                <th>For</th>
                <th>Status</th>
                <th>Donor</th>
                <th>Blood Group</th>
                <th className="d-none d-md-table-cell">Phone</th>
                <th className="d-none d-md-table-cell">Progress</th>
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
                  {appointments && appointments.length > 0?(
                    <>
                      {appointments.map((appointment, index) => (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{formatDateWithTime(appointment.date)}</td>
                          <td className="text-capitalize">{appointment.type}</td>
                          <td className="text-capitalize">{appointmentStatus(appointment.status)}</td>
                          <td>{appointment.user.firstname} {appointment.user.lastname}</td>
                          <td className="text-danger">{appointment.user.bloodGroup}</td>
                          <td className="d-none d-md-table-cell">{appointment.user.phone}</td>
                          <td className="d-none d-md-table-cell"><ProgressBar variant="danger" now={appointment.progress} label={appointment.progress} /></td>
                          <td width="50"><Button className="" as={Link} to={`/h/donation/${appointment._id}`} size="sm" variant="danger">More</Button></td>
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

export default HospitalAppointmentHistory

