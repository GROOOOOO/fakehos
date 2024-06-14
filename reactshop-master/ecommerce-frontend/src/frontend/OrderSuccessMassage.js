import React from 'react';

import { Link } from 'react-router-dom';

import logo from './PNCS.png'; // Import your logo image

export default function OrderSuccessMessage() {
  return (
    <>
      {/* Checkout done section */}
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="card text-center">
          <div className="card-body">
            <img src={logo} alt="PNC Plants Logo" className="mb-4" style={{ height: '100px' }} />
            <h4 className="card-title">CHECKOUT DONE!</h4>
            <p className="card-text">THANK YOU FOR TRUSTING PNC PLANTS</p>
            <hr />
            <div className="d-grid gap-2 col-7 mx-auto">
              <Link className="btn btn-info" to="/">CONTINUE <i className="fas fa-play"></i></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
