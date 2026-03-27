import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Trash2,
  MessageSquare,
  User,
  Phone,
  Mail,
  CalendarDays
} from "lucide-react";

const BASE_URL = "https://api.sdtour.online";

export default function AdminContactEnquiry() {
  const [enquiries, setEnquiries] = useState([]);

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/Contact/admin/enquiries`);
      setEnquiries(res.data);
    } catch {
      toast.error("Failed to load enquiries");
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry permanently?")) return;

    try {
      await axios.delete(`${BASE_URL}/Contact/admin/enquiries/${id}`);
      toast.success("Enquiry deleted successfully");
      fetchEnquiries();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-[#f8f8f8] min-h-screen"
    >
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F4612B] flex items-center gap-2">
          <MessageSquare /> Contact Enquiries
        </h1>
        <p className="text-gray-600 mt-1">
          Manage all user contact enquiries
        </p>
      </div>

      {/* EMPTY STATE */}
      {enquiries.length === 0 && (
        <div className="bg-white rounded-xl shadow p-12 text-center text-gray-500">
          No enquiries found
        </div>
      )}

      {/* ENQUIRY LIST */}
      <div className="space-y-6">
        {enquiries.map((e) => (
          <motion.div
            key={e._id}
            whileHover={{ scale: 1.01 }}
            className="
              bg-white
              rounded-2xl
              shadow-md
              border-l-4
              border-[#F4612B]
              p-6
              grid
              grid-cols-1
              lg:grid-cols-5
              gap-6
            "
          >
            {/* USER INFO */}
            <div>
              <p className="text-xs text-gray-400 mb-1">User</p>
              <p className="font-bold text-lg flex items-center gap-2">
                <User size={18} />
                {e.name}
              </p>
            </div>

            {/* CONTACT INFO */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Contact</p>
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <Phone size={14} /> {e.phone || "—"}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-2 mt-1">
                <Mail size={14} /> {e.email}
              </p>
            </div>

            {/* MESSAGE */}
            <div className="lg:col-span-2">
              <p className="text-xs text-gray-400 mb-1">Message</p>
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                {e.message}
              </p>
            </div>

            {/* DATE + ACTION */}
            <div className="flex flex-col justify-between items-end border-l pl-6">
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1 font-bold uppercase tracking-wider">Received On</p>
                <p className="text-sm font-bold text-gray-800 flex items-center gap-2 justify-end">
                  <CalendarDays size={16} className="text-orange-500" />
                  {new Date(e.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-orange-400 font-medium text-right mt-1">
                  at {new Date(e.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <button
                onClick={() => deleteEnquiry(e._id)}
                className="
                  mt-4
                  flex items-center gap-1
                  px-4 py-2
                  text-sm
                  bg-red-100
                  text-red-700
                  rounded-lg
                  hover:bg-red-200
                "
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
