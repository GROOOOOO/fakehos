import React, { useState } from 'react';

import {
    Link,
    useNavigate,
} from 'react-router-dom';

export default function Login({ cartItem, userUpdate }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function signin() {
        let item = { email, password };

        let result = await fetch("http://127.0.0.1:8000/api/user_login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(item)
        });

        result = await result.json();

        if (result.error) {
            navigate('/login');
        } else {
            localStorage.setItem('user-info', JSON.stringify(result));
            userUpdate();
            cartItem();

            if (result.role === 'admin') {
                navigate('/AdminHome');
            } else if (result.role === 'doctor') {
                navigate('DoctorDashboard');
            } else if (result.role === 'receptionist') {
                navigate('ReceptionistHome');
            } else {
                navigate('/PatientHome');
            }

        }
    }

    return (
        <div className="container veiw-h">
            <div className="row my-5">
                <div className="col-md-4 m-auto bg-white rounded p-5">
                    <h4><></>PNC-HOSPITAL</h4>
                    <h6 className="fw-light">Sign in to continue.</h6>

                    <div className="form-group mt-3">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <div id="emailHelp" className="form-text">Don't have an account? <Link className="text-decoration-none text-success" to={"/register"}>Create</Link></div>
                    <div className="d-grid mt-3">
                        <button type="submit" className="btn btn-success rounded-pill" onClick={signin}>LOGIN</button>
                    </div>
                </div>
            </div>
        </div>
    );
}