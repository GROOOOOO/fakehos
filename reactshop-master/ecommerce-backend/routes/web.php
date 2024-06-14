<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DoctorController;
 use App\Http\Controllers\backend\ProductManageController;
 use App\Http\Controllers\backend\AdminController;
 use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/logout', function () {
//     Session::forget('user');
//     return view('pages/login');
// });
// Route::view('/register','pages.register');
Route::post('/register', [UserController::class,'register']);
// Route::view('/user_login','pages.login');
// Route::post('/user_login', [UserController::class,'login']);
// Route::get('/', [ProductController::class,'index']);
// Route::get('detail/{id}', [ProductController::class,'detail']);
// Route::get('search', [ProductController::class,'search']);
// Route::post('add_to_cart', [ProductController::class,'addToCart']);
// Route::get('/cartlist', [ProductController::class,'cartList']);
// Route::get('/removeitem/{id}', [ProductController::class,'removeCart']);
// Route::get('/checkout', [ProductController::class,'checkOut']);
// Route::post('/orderplace', [ProductController::class,'orderPlace']);
// Route::view('/about','pages.about');
// Route::view('/contact','pages.contact');
// Route::view('/orderstatus','pages.orderstatus');

Route::group(['prefix' => 'admin'], function() {
    Route::post('/login', [AdminController::class, 'login']);
    Route::post('/logout', [AdminController::class, 'logout']);
Route::get('/users', [UserController::class, 'getDoctors']);
    Route::middleware(['admin.auth'])->group(function() {
        Route::get('/products', [ProductManageController::class, 'productList']);
        Route::post('/products', [ProductManageController::class, 'addProduct']);
        Route::get('/products/{id}', [ProductManageController::class, 'editProduct']);
        Route::post('/products/{id}', [ProductManageController::class, 'updateProduct']);
        Route::delete('/products/{id}', [ProductManageController::class, 'delProduct']);
    });
});
  Auth::routes();
 Route::group(['prefix'=>'admin'], function(){
    Route::group(['middleware'=>'admin.guest'], function(){
         Route::view('/login','admin.login')->name('admin.login');
         Route::post('/login',[AdminController::class,'login'])->name('admin.auth');
     });


Route::get('/logout',[AdminController::class,'logout'])->name('admin.logout');
Route::get('/add-doctors', 'DoctorController@showForm')->name('add-doctors');
Route::post('/add-doctors', 'DoctorController@addDoctor')->name('store-doctor');
Route::put('/update-doctors', 'DoctorController@updateDoctor')->name('update-doctor');
Route::get('/admin/users/doctors', 'App\Http\Controllers\AdminController@getDoctorUsers');
Route::get('/users', [UserController::class, 'getDoctors']);
Route::put('/update-patients', 'Patient@updatePatient')->name('update-patient');
Route::put('/update-appointments', 'Appointments@Appointments')->name('update-appointments');
    });