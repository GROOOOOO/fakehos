import React, {
    useEffect,
    useState,
} from 'react';

import axios from 'axios';
import {
    Button,
    Form,
    Table,
} from 'react-bootstrap';

const ManageDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        specialization: '',
        license_number: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleUpdateClick = (doctor) => {
        setFormData({
            id: doctor.id,
            first_name: doctor.first_name,
            last_name: doctor.last_name,
            specialization: doctor.specialization,
            license_number: doctor.license_number,
            phone: doctor.phone,
            email: doctor.email
        });
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/admin/doctors/${formData.id}`, formData);
            const updatedDoctor = response.data;
            const updatedDoctors = doctors.map(doc => doc.id === updatedDoctor.id ? updatedDoctor : doc);
            setDoctors(updatedDoctors);
            setFormData({
                id: '',
                first_name: '',
                last_name: '',
                specialization: '',
                license_number: '',
                phone: '',
                email: ''
            });
        } catch (error) {
            console.error('Error updating doctor:', error);
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
            <h1>Manage Doctors</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Specialization</th>
                        <th>License Number</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(doctor => (
                        <tr key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.id === formData.id ? (
                                <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                            ) : doctor.first_name}</td>
                            <td>{doctor.id === formData.id ? (
                                <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                            ) : doctor.last_name}</td>
                            <td>{doctor.id === formData.id ? (
                                <Form.Control type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
                            ) : doctor.specialization}</td>
                            <td>{doctor.id === formData.id ? (
                                <Form.Control type="text" name="license_number" value={formData.license_number} onChange={handleChange} required />
                            ) : doctor.license_number}</td>
                            <td>{doctor.id === formData.id ? (
                                <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                            ) : doctor.phone}</td>
                            <td>{doctor.id === formData.id ? (
                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                            ) : doctor.email}</td>
                            <td>
                                {doctor.id === formData.id ? (
                                    <Button variant="success" onClick={handleSubmitUpdate}>Save</Button>
                                ) : (
                                    <Button variant="primary" onClick={() => handleUpdateClick(doctor)}>Update</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManageDoctor;
