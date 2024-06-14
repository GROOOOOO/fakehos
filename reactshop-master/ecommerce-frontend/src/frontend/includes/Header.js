import React, {
    useEffect,
    useState,
} from 'react';

import {
    Link,
    useNavigate,
} from 'react-router-dom';

export default function Header({ setSearchData }) {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user-info'));
    const isAdmin = user && user.role === 'admin';
    const isPatient = user && user.role === 'patient';
    const isDoctor = user && user.role === 'doctor';
    const isReceptionist = user && user.role === 'receptionist';
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        if (user) {
            fetchUsers();
        }
    }, [user]);

    async function search() {
        try {
            const result = await fetch('http://127.0.0.1:8000/api/search/' + query);
            const searchData = await result.json();

            if (searchData) {
                setSearchData(searchData);
                navigate("/search");
            } else {
                console.log(searchData);
                navigate('/massage');
            }
        } catch (error) {
            console.error('Error searching:', error);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-white">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/PNCS.png" alt="Logo" style={{ width: '60px', height: '60px', marginRight: '10px' }} />
                    <span style={{ color: 'green', fontFamily: 'Lato', fontWeight: 'bold' }}>PNC-FAKE_H0SPITAL</span>
                </Link>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {isAdmin && <Link className="nav-link text-success fw-bold" to="/AdminHome">Admin Home</Link>}
                        </li>
                        <li className="nav-item">
                            {isAdmin && <Link className="nav-link text-success fw-bold" to="/UserList">User List</Link>}
                        </li>
                        <li className="nav-item">
                            {isAdmin && <Link className="nav-link text-success fw-bold" to="/AddDoctor">Add Doctor</Link>}
                        </li>
                        <li className="nav-item">
                            {isAdmin && <Link className="nav-link text-success fw-bold" to="/ManageDoctor">Manage Doctor</Link>}
                        </li>
                        <li className="nav-item">
                            {isPatient && <Link className="nav-link text-success fw-bold" to="/PatientHome">Patient Home</Link>}
                        </li>
                        <li className="nav-item">
                            {isPatient && <Link className="nav-link text-success fw-bold" to="/Appointment">Appointment</Link>}
                        </li>
                        <li className="nav-item">
                            {isDoctor && <Link className="nav-link text-success fw-bold" to="/DoctorHome">Doctor Home</Link>}
                        </li>
                        <li className="nav-item">
                            {isReceptionist && <Link className="nav-link text-success fw-bold" to="/ReceptionistHome">Receptionist Home</Link>}
                        </li>
                        <li className="nav-item">
                            {isReceptionist && <Link className="nav-link text-success fw-bold" to="/AddPatient">Add Patient</Link>}
                        </li>
                        <li className="nav-item">
                            {isReceptionist && <Link className="nav-link text-success fw-bold" to="/ManagePatient">Manage Patient</Link>}
                        </li>
                        <li className="nav-item">
                            {isReceptionist && <Link className="nav-link text-success fw-bold" to="/Schedule">Appointment List</Link>}
                        </li>
                        <li className="nav-item dropdown">
                            {user ? (
                                <div className="nav-link dropdown-toggle text-success" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.name}
                                </div>
                            ) : (
                                <Link className="nav-link text-success" to="/login">Login</Link>
                            )}
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {users.map(u => (
                                    <li key={u.id}><Link className="dropdown-item" to="#">{u.name}</Link></li>
                                ))}
                                <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                            </ul>
                        </li>
                        {!user && (
                            <li className="nav-item">
                                <Link className="nav-link text-success" to="/register">Register</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
