<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class ProductManageController extends Controller
{
    public function productList()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function addProduct(Request $req)
    {
        $product = new Product;
        $product->name = $req->name;
        $product->price = $req->price;
        $product->category = $req->category;
        $product->description = $req->description;

        if ($req->hasFile('gallery')) {
            $file_name = $req->file('gallery')->store('public/gallery');
            $product->gallery = basename($file_name);
        }

        if ($product->save()) {
            return response()->json(['status' => 'Product added successfully'], 201);
        } else {
            return response()->json(['status' => 'Failed to add product'], 500);
        }
    }

    public function editProduct($id)
    {
        $product = Product::find($id);
        return response()->json($product);
    }

    public function updateProduct(Request $req, $id)
    {
        $product = Product::find($id);
        $product->name = $req->name;
        $product->price = $req->price;
        $product->category = $req->category;
        $product->description = $req->description;

        if ($req->hasFile('gallery')) {
            $file_name = $req->file('gallery')->store('public/gallery');
            $product->gallery = basename($file_name);
        }

        if ($product->save()) {
            return response()->json(['status' => 'Product updated successfully']);
        } else {
            return response()->json(['status' => 'Failed to update product'], 500);
        }
    }

    public function delProduct($id)
    {
        $product = Product::find($id);

        if ($product->gallery) {
            Storage::delete('public/gallery/' . $product->gallery);
        }

        if ($product->delete()) {
            return response()->json(['status' => 'Product deleted successfully']);
        } else {
            return response()->json(['status' => 'Failed to delete product'], 500);
        }
    }
}