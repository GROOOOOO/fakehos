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

import axiosInstance from './axiosConfig3';

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formVisible, setFormVisible] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        patient_id: '',
        doctor_id: '',
        appointment_date: '',
        status: 'scheduled',
        reason: ''
    });

    useEffect(() => {
        fetchDoctors();
        fetchPatients();
        fetchAppointments();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axiosInstance.get('/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setError('Failed to fetch doctors');
        } finally {
            setLoading(false);
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await axiosInstance.get('/patients');
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setError('Failed to fetch patients');
        } finally {
            setLoading(false);
        }
    };

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

    const handleShow = (doctorId) => {
        setFormData({ ...formData, doctor_id: doctorId });
        setFormVisible(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('http://localhost:8000/api/admin/appointments', formData);
            setAppointments([...appointments, response.data]);
            setFormVisible(false);
            setFormData({
                id: '',
                patient_id: '',
                doctor_id: '',
                appointment_date: '',
                status: 'scheduled',
                reason: ''
            });
        } catch (error) {
            console.error('Error creating appointment:', error);
            setError('Failed to create appointment');
        }
    };

    return (
        <div className="container">
            <h1>Book an Appointment</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <div className="d-flex justify-content-center mt-3">
                    <Spinner animation="border" />
                </div>
            ) : (
                <>
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Specialization</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map(doctor => (
                                <tr key={doctor.id}>
                                    <td>{doctor.id}</td>
                                    <td>{doctor.first_name}</td>
                                    <td>{doctor.last_name}</td>
                                    <td>{doctor.specialization}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleShow(doctor.id)}>Book Appointment</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {formVisible && (
                        <div className="mt-3">
                            <h2>Book an Appointment with Doctor ID: {formData.doctor_id}</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formPatient">
                                    <Form.Label>Patient</Form.Label>
                                    <Form.Control as="select" name="patient_id" value={formData.patient_id} onChange={handleChange} required>
                                        <option value="">Select Patient</option>
                                        {patients.map(patient => (
                                            <option key={patient.id} value={patient.id}>{patient.first_name} {patient.last_name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formDate">
                                    <Form.Label>Appointment Date</Form.Label>
                                    <Form.Control type="datetime-local" name="appointment_date" value={formData.appointment_date} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="formReason">
                                    <Form.Label>Reason</Form.Label>
                                    <Form.Control as="textarea" name="reason" value={formData.reason} onChange={handleChange} required />
                                </Form.Group>
                                <Button variant="success" type="submit">Book Appointment</Button>
                                <Button variant="secondary" onClick={() => setFormVisible(false)}>Cancel</Button>
                            </Form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Appointment;
