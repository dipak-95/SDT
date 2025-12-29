import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* ✅ SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar open={open} setOpen={setOpen} />
      </aside>

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 md:ml-64 flex flex-col overflow-hidden">
        
        {/* TOPBAR */}
        <Topbar setOpen={setOpen} />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>

      {/* ✅ MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        pauseOnHover
      />
    </div>
  );
};

export default AdminLayout;
