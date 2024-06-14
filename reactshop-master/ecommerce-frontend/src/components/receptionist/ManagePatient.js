import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  Alert,
  Button,
  Form,
  Spinner,
  Table,
} from 'react-bootstrap';

import axiosInstance from './axiosConfig2';

const ManagePatient = () => {
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        emergency_contact: '',
        medical_history: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

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

    const handleUpdateClick = (patient) => {
        setFormData({
            id: patient.id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            date_of_birth: patient.date_of_birth,
            gender: patient.gender,
            address: patient.address,
            phone: patient.phone,
            email: patient.email,
            emergency_contact: patient.emergency_contact,
            medical_history: patient.medical_history
        });
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/admin/patients/${formData.id}`, formData);
            const updatedPatient = response.data;
            const updatedPatients = patients.map(pat => pat.id === updatedPatient.id ? updatedPatient : pat);
            setPatients(updatedPatients);
            setFormData({
                id: '',
                first_name: '',
                last_name: '',
                date_of_birth: '',
                gender: '',
                address: '',
                phone: '',
                email: '',
                emergency_contact: '',
                medical_history: ''
            });
        } catch (error) {
            console.error('Error updating patient:', error);
            setError('Failed to update patient');
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
            <h1>Manage Patients</h1>
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
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Emergency Contact</th>
                            <th>Medical History</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.id === formData.id ? (
                                    <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                                ) : patient.first_name}</td>
                                <td>{patient.id === formData.id ? (
                                    <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                                ) : patient.last_name}</td>
                                <td>{patient.id === formData.id ? (
                                    <Form.Control type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
                                ) : patient.date_of_birth}</td>
                                <td>{patient.id === formData.id ? (
                                    <Form.Control type="text" name="gender" value={formData.gender} onChange={handleChange} required />
                                ) : patient.gender}</td>
                                <td>{patient.id === formData.id ? (
                                    <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
                                ) : patient.address}</td>
                                <td>{patient.id === formData.id ? (
                                    <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                                ) : patient.phone}</td>
                                <td>{patient.id === formData.id ? (
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                                ) : patient.email}</td>
                                <td>{patient.id === formData.id ? (
                                    <Form.Control type="text" name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} required />
                                ) : patient.emergency_contact}</td>
                                <td>{patient.id === formData.id ? (
                                    <Form.Control as="textarea" name="medical_history" value={formData.medical_history} onChange={handleChange} required />
                                ) : patient.medical_history}</td>
                                <td>
                                    {patient.id === formData.id ? (
                                        <Button variant="success" onClick={handleSubmitUpdate}>Save</Button>
                                    ) : (
                                        <Button variant="primary" onClick={() => handleUpdateClick(patient)}>Update</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ManagePatient;
