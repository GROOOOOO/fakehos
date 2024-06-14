<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
class PatientController extends Controller
{
    public function index()
    {
        // Fetch all patients
        $patients = Patient::all();
        return response()->json($patients);
    }
public function store(Request $request)
    {
        $request->validate([
            'id' => '|exists:users,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'date_of_birth' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:doctors,email',
            'emergency_contact' => 'required|string|max:255',
            'medical_history' => 'required|string|max:255',
        ]);

        $patient = new  Patient();
        $patient->id = $request->id;
        $patient->first_name = $request->first_name;
        $patient->last_name = $request->last_name;
        $patient->date_of_birth = $request->date_of_birth;
        $patient->gender = $request->gender;
        $patient->address = $request->gender;
        $patient->phone = $request->phone;
        $patient->email = $request->email;
        $patient->emergency_contact = $request->emergency_contact;
        $patient->medical_history = $request->medical_history;
        $patient->save();

        return response()->json($patient, 201);
    }


    public function getUsersWithRolePatient()
    {
        // Fetch users with the role of patient
        $users = User::where('role', 'patient')->get();
        return response()->json($users);
    }

     public function update(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:patients,email,' . $id,
            'emergency_contact' => 'required|string|max:255',
            'medical_history' => 'required|string',
        ]);

        try {
            // Find the patient by ID
            $patient = Patient::findOrFail($id);

            // Log the current state of the patient
            Log::info('Current patient data: ', $patient->toArray());

            // Log the incoming request data
            Log::info('Request data for update: ', $validatedData);

            // Update the patient's information
            $patient->update($validatedData);

            // Log the updated state of the patient
            Log::info('Updated patient data: ', $patient->toArray());

            // Optionally, you can return the updated patient
            return response()->json($patient, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('Patient not found: ' . $e->getMessage());
            return response()->json(['message' => 'Patient not found.'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Validation failed.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Failed to update patient: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update patient.'], 500);
        }
    }

    public function show($id)
    {
        // Fetch a specific patient by ID
        $patient = Patient::find($id);
        if ($patient) {
            return response()->json($patient);
        } else {
            return response()->json(['error' => 'Patient not found'], 404);
        }
    }

    public function destroy($id)
    {
        // Delete a specific patient by ID
        $patient = Patient::find($id);
        if ($patient) {
            $patient->delete();
            return response()->json(['message' => 'Patient deleted']);
        } else {
            return response()->json(['error' => 'Patient not found'], 404);
        }
    }
}