<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\AppointmentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/logout', function () {
    Session::forget('user');
    return view('pages/login');
});
// Route::view('/register','pages.register');
Route::post('/register', [UserController::class,'register']);
Route::view('/user_login','pages.login');
Route::post('/user_login', [UserController::class,'login']);;
Route::get('/users', [UserController::class,'UserController@index']);

Route::get('/', [DoctorController::class, 'index']);
Route::get('/{id}', [DoctorController::class, 'show']);
Route::put('/{id}', [DoctorController::class, 'update']);
Route::delete('/{id}', [DoctorController::class, 'destroy']);
Route::put('/{id}', [PatientController::class, 'update']);
// User management routes
Route::group(['prefix' => 'admin'], function () {
Route::get('/users/doctors', [UserController::class, 'getDoctors']);
Route::get('/admin/users/patients', [UserController::class, 'getPatients']);
Route::get('/users', [UserController::class, 'index']);
Route::put('/users/{id}/updateRole', [UserController::class, 'updateRole']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Doctor routes
Route::post('/doctors', [DoctorController::class, 'store']);
Route::get('/users/doctors', [DoctorController::class, 'index']);
Route::get('/doctors', [DoctorController::class, 'getDoctors']);
Route::get('/doctors', [DoctorController::class, 'index']);  // List all doctors
Route::get('/doctors/{id}', [DoctorController::class, 'show']);  // Show a specific doctor
 // Add a new doctor
Route::put('/doctors/{id}', [DoctorController::class, 'update']);  // Update a doctor
Route::delete('/doctors/{id}', [DoctorController::class, 'destroy']);  // Delete a doctor

//Patient
Route::post('/patients', [PatientController::class, 'store']);
Route::get('patients', [PatientController::class, 'index']);  // List all doctors
Route::get('/patients/{id}', [PatientController::class, 'show']);
Route::put('/patients/{id}', [PatientController::class, 'update']);

Route::get('/appointments', [AppointmentController::class, 'index']);
Route::post('/appointments', [AppointmentController::class, 'store']);
Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
});