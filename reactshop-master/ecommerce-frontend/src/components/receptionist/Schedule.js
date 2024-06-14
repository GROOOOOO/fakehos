import React, {
    useEffect,
    useState,
} from 'react';

import {
    Alert,
    Button,
    Form,
    Spinner,
    Table,
} from 'react-bootstrap';

import axiosInstance from './axiosConfig2';

const Schedule = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        id: '',
        appointment_date: '',
    });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axiosInstance.get('/appointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError('Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (appointment) => {
        setFormData({
            id: appointment.id,
            appointment_date: appointment.appointment_date,
        });
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axiosInstance.put(`/appointments/${formData.id}`, {
                appointment_date: formData.appointment_date,
            });
            const updatedAppointment = response.data;
            const updatedAppointments = appointments.map(app => app.id === updatedAppointment.id ? updatedAppointment : app);
            setAppointments(updatedAppointments);
            setFormData({
                id: '',
                appointment_date: '',
            });
        } catch (error) {
            console.error('Error updating appointment:', error);
            setError('Failed to update appointment');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="container">
            <h1>Schedule</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <div className="d-flex justify-content-center mt-3">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>Appointment Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map(appointment => (
                                <tr key={appointment.id}>
                                    <td>{appointment.id}</td>
                                    <td>{appointment.patient ? `${appointment.patient.first_name} ${appointment.patient.last_name}` : 'Unknown'}</td>
                                    <td>{appointment.doctor ? `${appointment.doctor.first_name} ${appointment.doctor.last_name}` : 'Unknown'}</td>
                                    <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleEditClick(appointment)}>Edit Time</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No appointments found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}

            {/* Edit Modal */}
            <Form onSubmit={handleSubmitEdit}>
                <Form.Group controlId="formAppointmentDate">
                    <Form.Label>Appointment Date</Form.Label>
                    <Form.Control type="datetime-local" name="appointment_date" value={formData.appointment_date} onChange={handleChange} required />
                </Form.Group>
                <Button variant="success" type="submit">Save</Button>
            </Form>
        </div>
    );
};

export default Schedule;
