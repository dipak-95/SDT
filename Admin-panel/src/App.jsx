import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLayout from "./components/AdminLayout";
import BrandLoader from "./components/BrandLoader"; // Reusable loader from frontend pattern

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminGroupTour = lazy(() => import("./pages/AdminGroupTour"));
const AdminIndividualTour = lazy(() => import("./pages/AdminIndividualTour"));
const AdminGroupIteranary = lazy(() => import("./pages/AdminGroupIteranary"));
const AdmincarBooking = lazy(() => import("./pages/AdmincarBooking"));
const ContactEnquiry = lazy(() => import("./pages/ContactEnquiry"));
const QuickEnquiry = lazy(() => import("./pages/QuickEnquiry"));
const AdminCar = lazy(() => import("./pages/AdminCar"));
const AdminGroupTourSeats = lazy(() => import("./pages/AdminGroupTourSeats"));


function App() {
  return (
    <>
      {/* ✅ TOAST MUST BE OUTSIDE ROUTES */}
      <ToastContainer position="top-right" />

      <Suspense fallback={<BrandLoader />}>
        <Routes>
          {/* ✅ PUBLIC ROUTE */}
          <Route path="/" element={<AdminLogin />} />

          {/* ✅ PROTECTED ADMIN ROUTES */}
          <Route element={<ProtectedAdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/bookings" element={<Bookings />} />
              <Route path="/admin/grouptours" element={<AdminGroupTour />} />
              <Route path="/admin/group-tour-seats" element={<AdminGroupTourSeats />} />
              <Route path="/admin/individualtours" element={<AdminIndividualTour />} />
              <Route path="/admin/add-group-iteranary" element={<AdminGroupIteranary />} />
              <Route path="/admin/car-bookings" element={<AdmincarBooking />} />
              <Route path="/admin/ContactEnquiry" element={<ContactEnquiry />} />
              <Route path="/admin/QuickEnquiry" element={<QuickEnquiry />} />
              <Route path="/admin/Car" element={<AdminCar />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
