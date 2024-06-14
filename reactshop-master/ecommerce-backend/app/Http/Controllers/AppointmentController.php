<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use Illuminate\Support\Facades\Log;

class AppointmentController extends Controller
{
    public function index()
    {
        try {
            $appointments = Appointment::all();
            return response()->json($appointments, 200);
        } catch (\Exception $e) {
            Log::error('Failed to fetch appointments: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch appointments.'], 500);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date_format:Y-m-d\TH:i',
            'status' => 'required|string|max:255',
            'reason' => 'required|string'
        ]);

        try {
            $appointment = Appointment::create($validatedData);
            return response()->json($appointment, 201);
        } catch (\Exception $e) {
            Log::error('Failed to create appointment: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to create appointment.'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date_format:Y-m-d\TH:i',
            'status' => 'required|string|max:255',
            'reason' => 'required|string'
        ]);

        try {
            $appointment = Appointment::findOrFail($id);
            $appointment->update($validatedData);
            return response()->json($appointment, 200);
        } catch (\Exception $e) {
            Log ::error('Failed to update appointment: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update appointment.'], 500);
        }
    }
}