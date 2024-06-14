<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $table = 'doctors';

    protected $fillable = [
        'doctors_id',
        'first_name',
        'last_name',
        'specialization',
        'license_number',
        'phone',
        'email',
        'created_at',
        'updated_at',
    ];
}