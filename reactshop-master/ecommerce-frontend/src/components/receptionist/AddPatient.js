import React, {
    useEffect,
    useState,
} from 'react';

import {
    Alert,
    Button,
    Collapse,
    Form,
    Spinner,
    Table,
} from 'react-bootstrap';

import axiosInstance from './axiosConfig2';

const AddPatient = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [newPatient, setNewPatient] = useState({
        users_id: '',
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

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/users');
            const patients = response.data.filter(user => user.role === 'patient');
            setPatients(patients);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setError('Failed to fetch patients');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatient({ ...newPatient, [name]: value });
    };

    const handleAddPatient = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('http://localhost:8000/api/admin/patients', newPatient);
            setPatients([...patients, response.data]);
            setFormVisible(false);
            setNewPatient({
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
            console.error('Error adding patient:', error);
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Failed to add patient');
                console.log('Validation Errors:', error.response.data.errors);
            } else {
                setError('Failed to add patient');
            }
        }
    };


    return (
        <div className="container mt-4">
            <h1>Patients</h1>
            <Button variant="success" onClick={() => setFormVisible(!formVisible)}>Add Patient</Button>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {loading ? (
                <div className="d-flex justify-content-center mt-3">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Patient Acc Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.name}</td>
                                <td>{patient.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <Collapse in={formVisible}>
                <div className="mt-4">
                    <Form onSubmit={handleAddPatient}>
                        <Form.Group controlId="formUserId">

                        </Form.Group>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={newPatient.first_name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={newPatient.last_name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDateOfBirth">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="date_of_birth"
                                value={newPatient.date_of_birth}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                type="text"
                                name="gender"
                                value={newPatient.gender}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={newPatient.address}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={newPatient.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={newPatient.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmergencyContact">
                            <Form.Label>Emergency Contact</Form.Label>
                            <Form.Control
                                type="text"
                                name="emergency_contact"
                                value={newPatient.emergency_contact}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMedicalHistory">
                            <Form.Label>Medical History</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="medical_history"
                                value={newPatient.medical_history}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">Add Patient</Button>
                    </Form>
                </div>
            </Collapse>
        </div>
    );
};

export default AddPatient;
