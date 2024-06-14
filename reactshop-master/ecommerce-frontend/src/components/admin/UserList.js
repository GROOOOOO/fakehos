import './UserList.css'; // Import CSS file for additional styling
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import React, {
    useEffect,
    useState,
} from 'react';

import {
    Alert,
    Button,
    Container,
    Dropdown,
    DropdownButton,
    Table,
} from 'react-bootstrap';

import axiosInstance from './axiosConfig';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/users');
            setUsers(response.data);
        } catch (error) {
            setError('Error fetching users');
            console.error('There was an error fetching the users:', error);
        }
    };

    const handleUpdateRole = async (id, newRole) => {
        try {
            await axiosInstance.put(`/users/${id}/updateRole`, { role: newRole });
            fetchUsers();
        } catch (error) {
            setError('Error updating role');
            console.error('There was an error updating the role:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/users/${id}`);
            fetchUsers();
        } catch (error) {
            setError('Error deleting user');
            console.error('There was an error deleting the user:', error);
        }
    };

    return (
        <Container className="mt-4">
            <h2>User List</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <DropdownButton title="Change Role" variant="success" id={`dropdown-${user.id}`} size="sm" className="d-inline-block me-2">
                                    <Dropdown.Item onClick={() => handleUpdateRole(user.id, 'admin')}>Make Admin</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleUpdateRole(user.id, 'user')}>Make User</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleUpdateRole(user.id, 'doctor')}>Make Doctor</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleUpdateRole(user.id, 'patient')}>Make Patient</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleUpdateRole(user.id, 'receptionist')}>Make Receptionist</Dropdown.Item>
                                </DropdownButton>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UserList;
