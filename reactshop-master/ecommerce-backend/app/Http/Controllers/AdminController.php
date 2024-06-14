<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Doctor;
use Illuminate\Http\Request;
class AdminController extends Controller
{
    public function index()
    {

        $doctors = Doctor::all();
        return response()->json($doctors);
    }

    public function store(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:users,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
            'license_number' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:doctors,email',
        ]);

        $doctor = new Doctor();
        $doctor->doctor_id = $request->doctor_id;
        $doctor->first_name = $request->first_name;
        $doctor->last_name = $request->last_name;
        $doctor->specialization = $request->specialization;
        $doctor->license_number = $request->license_number;
        $doctor->phone = $request->phone;
        $doctor->email = $request->email;
        $doctor->save();

        return response()->json($doctor, 201);
    }
 public function getUsersWithRoleDoctor()
    {
        // Assuming you have a role-based system and a 'role' column in users table
        $users = User::where('role', 'doctor')->get();
        return response()->json($users);
    }

    public function getDoctorUsers()
    {
        $doctors = User::where('role', 'doctor')->get(['id', 'name']);
        return response()->json($doctors);
    }
    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
            'license_number' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:doctors,email,' . $id,
        ]);

        try {
            // Find the doctor by ID
            $doctor = Doctor::findOrFail($id);

            // Update the doctor's information
            $doctor->update($request->all());

            // Optionally, you can return the updated doctor
            return response()->json($doctor, 200);
        } catch (\Exception $e) {
            // Handle any exceptions (e.g., model not found)
            return response()->json(['message' => 'Failed to update doctor.'], 500);
        }
    }
}
