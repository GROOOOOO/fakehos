import { useState, useEffect } from "react";
import { toast, Slide } from 'react-toastify';

export function useDoctor() {
    // Store and setter for doctors.
    const [doctors, setDoctors] = useState([]);

    // State for displaying a loading page. Used for fetching data first before render.
    const [loading, setLoading] = useState(true);

    const notify = (message, status) => {
        if(status === "success") {
            toast.success(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            return true;
        } else if (status === "error") {
            toast.error(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            return false;
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/doctors/");
            const data = await response.json();

            if (response.ok) {
                setDoctors(data.data);
            } else {
                throw new Error("Failed to fetch doctors.");
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        } finally {
            // Set loading to false after fetching data, regardless of success or failure
            setLoading(false); 
        }
    };

    const add = async (doctor) => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/doctors/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(doctor),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add doctor.");
            }

            fetchDoctors();
            return notify("Successfully added the doctor.", "success");
        } catch (error) {
            console.error("Error adding doctor:", error);
        }
    };

    const update = async (doctorId, updatedDoctorData) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/doctors/update/${doctorId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedDoctorData),
                }
            );
    
            if (!response.ok) {
                throw new Error("Failed to update doctor.");
            }

            // After successfully updating the doctor, fetch the updated list of doctors
            fetchDoctors();
            return notify("Successfully updated the doctor.", "success");
        } catch (error) {
            console.error("Error updating doctor:", error);
        }
    };

    const remove = async (doctorId) => {
        if (window.confirm("Are you sure you want to remove this doctor?")) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/doctors/remove/${doctorId}`,
                    {
                        method: "DELETE",
                    }
                );
                
                if (!response.ok) {
                    throw new Error("Failed to remove doctor.");
                }

                fetchDoctors();
                return notify("Successfully deleted the doctor.", "success");
            } catch (error) {
                console.error("Error removing doctor:", error);
            }
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return { loading, doctors, setDoctors, add, update, remove};
}
