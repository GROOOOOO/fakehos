import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useDoctor } from "../useDoctor";
import Loading from "./Loading";
import DoctorInformation from "./DoctorInformation";
import AddDoctorForm from "./Forms/AddDoctorForm";
import UpdateDoctorForm from "./Forms/UpdateDoctorForm";

const Doctor = () => {
    const { loading, doctors, add, update, remove } = useDoctor();
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [currentDoctor, setCurrentDoctor] = useState(null);

    const handleAddClose = () => {
        setAddFormVisible(false);
    };

    const handleUpdateClick = (doctor) => {
        setCurrentDoctor(doctor);
        setUpdateFormVisible(true);
    };

    const handleUpdateClose = () => {
        setUpdateFormVisible(false);
        setCurrentDoctor(null);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-md mt-5">
            <ToastContainer />
            <header className="d-flex justify-content-between mb-3">
                <h2>Doctors</h2>
                <button className="btn btn-primary" onClick={() => setAddFormVisible(true)}>Add Doctor</button>
            </header>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Specialization</th>
                            <th>License Number</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <DoctorInformation
                                key={doctor.id}
                                doctor={doctor}
                                remove={remove}
                                onUpdateClick={handleUpdateClick}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {isAddFormVisible && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="addDoctorModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addDoctorModalLabel">New Doctor</h1>
                                    <button type="button" className="btn-close" onClick={handleAddClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <AddDoctorForm addDoctor={add} onClose={handleAddClose} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {isUpdateFormVisible && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="updateDoctorModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="updateDoctorModalLabel">Update Doctor</h1>
                                    <button type="button" className="btn-close" onClick={handleUpdateClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <UpdateDoctorForm doctor={currentDoctor} update={update} onClose={handleUpdateClose} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleUpdateClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Doctor;
