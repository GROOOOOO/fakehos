<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
     use HasFactory;
       protected $primaryKey = 'user_id';
    protected $table = 'patients';
    protected $fillable = [
        'user_id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'address', 'phone', 'email', 'emergency_contact', 'medical_history'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}