import React, { useState } from 'react';

export default function AdminHome() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState('');

    async function fetchUsers() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'HTTP error');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching users:', error.message);

            // Handle specific error messages
            if (error.message.includes('Unexpected token')) {
                console.error('The server response is not valid JSON.');
            } else {
                console.error('An unexpected error occurred.');
            }
        }
    }

    fetchUsers();

    const handleEdit = (user) => {
        setSelectedUser(user);
        setNewRole(user.role || ''); // Pre-fill the role if it exists
    };

    const handleRoleChange = async () => {
        try {
            const result = await fetch(`http://127.0.0.1:8000/api/users/${selectedUser.id}/update-role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });
            const updatedUser = await result.json();
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setSelectedUser(null);
            setNewRole('');
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <h2>User Management</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleEdit(user)}>Edit Role</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedUser && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Edit Role for {selectedUser.name}</h3>
                            <select
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="doctor">Doctor</option>
                                <option value="admin">Admin</option>
                                <option value="patient">Patient</option>
                                <option value="receptionist">Receptionist</option>
                            </select>
                            <button className="btn btn-success" onClick={handleRoleChange}>Save</button>
                            <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
