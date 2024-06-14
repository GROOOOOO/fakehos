import './App.css';
import './assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import AddDoctor from './components/admin/AddDoctor';
import AdminHome from './components/admin/AdminHome';
import ManageDoctor from './components/admin/ManageDoctor';
import UserList from './components/admin/UserList';
import Appointment from './components/patient/Appointment';
import PatientHome from './components/patient/PatientHome';
import AddPatient from './components/receptionist/AddPatient';
import ManagePatient from './components/receptionist/ManagePatient';
import ReceptionistHome from './components/receptionist/ReceptionistHome';
import Schedule from './components/receptionist/Schedule';
import Header from './frontend/includes/Header';
import Login from './frontend/Login';
import Logout from './frontend/Logout';
import Registration from './frontend/Registration';

function App() {
  const [cart, setCart] = useState(0);
  const [searchData, setSearchData] = useState([]);
  let user = JSON.parse(localStorage.getItem('user-info'));
  let userId = user ? user.id : '';

  function userUpdate() {
    user = JSON.parse(localStorage.getItem('user-info'));
    userId = user ? user.id : '';
  }
  useEffect(() => {
    cartItems();
  }, []);

  async function cartItems() {
    let result = await fetch('http://127.0.0.1:8000/api/cartitem/' + userId);
    result = await result.json();
    setCart(result);
  }

  function emptyCart() {
    setCart(0);
  }

  return (
    <BrowserRouter> {console.log(searchData)}
      <Header />

      <Routes>
        <Route>
          <Route path="/Schedule" element={<Schedule />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/axoisConfig" element={<axoisConfig />} />
          <Route path="/ManagePatient" element={<ManagePatient />} />
          <Route path="/ReceptionistHome" element={<ReceptionistHome />} />
          <Route path="/AddPatient" element={<AddPatient />} />
          <Route path="/ManageDoctor" element={<ManageDoctor />} />
          <Route path="/PatientHome" element={<PatientHome />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/login" element={<Login cartItem={cartItems} userUpdate={userUpdate} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/logout" element={<Logout emptyCart={emptyCart} />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/AddDoctor" element={<AddDoctor />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
