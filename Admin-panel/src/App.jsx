import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Hotel from "./pages/Hotel";

import AdminLogin from "./pages/AdminLogin";
import AdminGroupTour from "./pages/AdminGroupTour";
import AdminIndividualTour from "./pages/AdminIndividualTour";
import AdminGroupIteranary from "./pages/AdminGroupIteranary";
import AdmincarBooking from "./pages/AdmincarBooking";
import AdminHotelBooking from "./pages/AdminHotelBooking";
import ContactEnquiry from "./pages/ContactEnquiry";
import QuickEnquiry from "./pages/QuickEnquiry";
import AdminCars from "./pages/AdminCar";
import AdminCar from "./pages/AdminCar";


function App() {
  return (
    <>
      {/* ✅ TOAST MUST BE OUTSIDE ROUTES */}
      <ToastContainer position="top-right" />

      <Routes>
        {/* ✅ PUBLIC ROUTE */}
        <Route path="/" element={<AdminLogin />} />

        {/* ✅ PROTECTED ADMIN ROUTES */}
        <Route element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/bookings" element={<Bookings />} />
            <Route path="/admin/grouptours" element={<AdminGroupTour />} />
            <Route path="/admin/individualtours" element={<AdminIndividualTour />} />
            <Route path="/admin/hotel" element={<Hotel />} />
            <Route path="/admin/add-group-iteranary" element={<AdminGroupIteranary />} />
            <Route path="/admin/car-bookings" element={<AdmincarBooking />} />
            <Route path="/admin/hotel-booking" element={<AdminHotelBooking />} />
            <Route path="/admin/ContactEnquiry" element={<ContactEnquiry />} />
            <Route path="/admin/QuickEnquiry" element={<QuickEnquiry />} />
            <Route path="/admin/Car" element={<AdminCar />} />
           
            
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
