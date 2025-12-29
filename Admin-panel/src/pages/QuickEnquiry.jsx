import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, User, Phone, Mail, MessageSquare, Bell } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const BASE_URL = "http://localhost:1005";

export default function QuickEnquiry() {
  const [enquiries, setEnquiries] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/Enquiry/admin/quick-enquiry`);
    setEnquiries(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;

    await axios.delete(
      `${BASE_URL}/Enquiry/admin/quick-enquiry/${id}`
    );

    toast.success("Deleted");
    setEnquiries((prev) => prev.filter((e) => e._id !== id));
  };

  return (
    <motion.div className="p-6 bg-[#f8f8f8] min-h-screen">
      <h1 className="text-3xl font-bold text-[#F4612B] mb-6 flex gap-2">
        <Bell /> Quick Enquiries
      </h1>

      <div className="space-y-6">
        {enquiries.map((e) => (
          <motion.div
            key={e._id}
            whileHover={{ scale: 1.01 }}
            className="
              bg-white rounded-2xl shadow-md
              border-l-4 border-[#F4612B]
              p-6 grid lg:grid-cols-4 gap-6
            "
          >
            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="font-bold flex gap-2">
                <User size={16} /> {e.name}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p className="flex gap-2">
                <Phone size={16} /> {e.phone}
              </p>
              {e.email && (
                <p className="flex gap-2 text-sm mt-1">
                  <Mail size={14} /> {e.email}
                </p>
              )}
            </div>

            <div>
              <p className="text-xs text-gray-400">Message</p>
              <p className="text-sm">{e.message || "—"}</p>
            </div>

            <div className="flex justify-end items-end">
              <button
                onClick={() => deleteEnquiry(e._id)}
                className="flex gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg"
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
