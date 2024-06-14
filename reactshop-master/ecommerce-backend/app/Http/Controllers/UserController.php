<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\Doctor;
class UserController extends Controller
{

public function index()
    {
        try {
            $users = User::all();
            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch users'], 500);
        }
    }


    public function login(Request $req)
    {
        try {
            $user = User::where(['email' => $req->email])->first();
            if ($user && Hash::check($req->password, $user->password)) {
                return response()->json($user);
            } else {
                return response()->json(['error' => 'Email or password not match'], 401);
            }
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }





    public function register(Request $req)
    {
        try {
            $validated = $req->validate([
                'name' => 'required|string|max:20',
                'email' => 'required|email|unique:users,email',
                'role' => 'nullable',
                'password' => 'required|alpha_num|min:6',
                'confirm_password'  => 'required|same:password',
            ], [
                'confirm_password.same' => 'Confirm password not match.',
            ]);

            $user = new User;
            $user->name = $req->name;
            $user->email = $req->email;
            $user->password = Hash::make($req->password);
            $user->save();

            return response()->json($user, 201);
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }





    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->update($request->all());
            return response()->json($user, 200);
        } catch (\Exception $e) {
            Log::error('Update error: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }









 public function getPatients()
    {
        $patients = User::where('role', 'patient')->get();
        return response()->json($patients);
    }



public function getUsersWithRoleDoctor()
    {
        // Assuming you have a role-based system and a 'role' column in users table
        $users = User::where('role', 'doctor')->get();
        return response()->json($users);
    }



    public function getDoctors()
    {
        try {
            // Fetch users with the role of doctor
            $doctors = User::where('role', 'doctor')->get();

            return response()->json($doctors, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching doctors'], 500);
        }
    }



// updateRole method to update the user's role
public function updateRole(Request $request, $id)
{
    try {
        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();
        return response()->json($user, 200);
    } catch (\Exception $e) {
        Log::error('Update role error: ' . $e->getMessage());
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}




// destroy method to delete a user
public function destroy($id)
{
    try {
        User::destroy($id);
        return response()->json(['message' => 'User deleted successfully'], 200);
    } catch (\Exception $e) {
        Log::error('Delete error: ' . $e->getMessage());
        return response()->json(['error' => 'Internal Server Error'], 500);
    }



}}