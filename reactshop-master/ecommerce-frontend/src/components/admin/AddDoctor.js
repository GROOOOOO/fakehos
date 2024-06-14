import 'bootstrap/dist/css/bootstrap.min.css';

import React, {
    useEffect,
    useState,
} from 'react';

import {
    Alert,
    Button,
    Collapse,
    Dropdown,
    DropdownButton,
    Form,
    Spinner,
    Table,
} from 'react-bootstrap';

import axiosInstance from './axiosConfig';

const AddDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        user_id: '',
        first_name: '',
        last_name: '',
        specialization: '',
        license_number: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/users');
            const doctors = response.data.filter(user => user.role === 'doctor');
            setDoctors(doctors);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setError('Failed to fetch doctors');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor({ ...newDoctor, [name]: value });
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('http://localhost:8000/api/admin/doctors', newDoctor);
            setDoctors([...doctors, response.data]);
            setFormVisible(false);
            setNewDoctor({
                doctor_id: '',
                first_name: '',
                last_name: '',
                specialization: '',
                license_number: '',
                phone: '',
                email: ''
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

    const handleSelectDoctorId = (id) => {
        setNewDoctor({ ...newDoctor, doctor_id: id });
    };

    return (
        <div className="container mt-4">
            <h1>Doctors</h1>
            <Button variant="success" onClick={() => setFormVisible(!formVisible)}>Add Doctor</Button>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {loading ? (
                <div className="d-flex justify-content-center mt-3">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>{doctor.id}</td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <Collapse in={formVisible}>
                <div className="mt-4">
                    <Form onSubmit={handleAddDoctor}>
                        <Form.Group controlId="formDoctorId">
                            <Form.Label>User ID</Form.Label>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={newDoctor.doctor_id ? newDoctor.doctor_id : 'Select User ID'}
                                onSelect={handleSelectDoctorId}
                            >
                                {doctors.map((user) => (
                                    <Dropdown.Item key={user.id} eventKey={user.id}>
                                        {user.id} - {user.name}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Form.Group>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={newDoctor.first_name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={newDoctor.last_name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formSpecialization">
                            <Form.Label>Specialization</Form.Label>
                            <Form.Control
                                type="text"
                                name="specialization"
                                value={newDoctor.specialization}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formLicenseNumber">
                            <Form.Label>License Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="license_number"
                                value={newDoctor.license_number}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={newDoctor.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={newDoctor.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">Add Doctor</Button>
                    </Form>
                </div>
            </Collapse>
        </div>
    );
};

export default AddDoctor;
