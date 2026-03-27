// import { motion } from "framer-motion";
// import { useState } from "react";
// import axios from "axios";
// import { X } from "lucide-react";
// import { toast } from "react-toastify";

// const API_BASE = "https://api.sdtour.online";

// export default function HotelFormModel({ close, refresh, editData }) {
//   const [form, setForm] = useState(
//     editData || {
//       name: "",
//       city: "",
//       location: "",
//       amenities: {
//         wifi: false,
//         pool: false,
//         meal: false,
//         parking: false,
//         ac: false
//       },
//       rooms: [
//         { type: "2-bed", totalRooms: 5 },
//         { type: "3-bed", totalRooms: 5 },
//         { type: "4-bed", totalRooms: 5 }
//       ]
//     }
//   );

//   const [images, setImages] = useState([]);
//   const [preview, setPreview] = useState([]);

//   /* HANDLE IMAGE SELECT */
//   const handleImages = e => {
//     const files = Array.from(e.target.files);
//     setImages(files);
//     setPreview(files.map(file => URL.createObjectURL(file)));
//   };

//   /* SUBMIT FORM */
// const submit = async () => {
//   try {
//     const formData = new FormData();

//     formData.append("name", form.name);
//     formData.append("city", form.city);
//     formData.append("location", form.location);

//     // ✅ STRINGIFY THESE
//     formData.append(
//       "amenities",
//       JSON.stringify(form.amenities)
//     );

//     formData.append(
//       "rooms",
//       JSON.stringify(form.rooms)
//     );

//     images.forEach(img => {
//       formData.append("images", img);
//     });

//     await axios.post(
//       "https://api.sdtour.online/hotels/add",
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" }
//       }
//     );

//     toast.success("Hotel added successfully");
//     onClose();
//   } catch (err) {
//     console.error("FORM SUBMIT ERROR:", err);
//     toast.error("Failed to add hotel");
//   }
// };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <motion.div
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         className="
//           relative bg-white w-full max-w-2xl p-6 rounded-xl
//           overflow-y-auto max-h-[90vh]
//           scrollbar-hide
//         "
//       >
//         {/* ❌ CLOSE BUTTON */}
//         <button
//           onClick={close}
//           className="absolute top-4 right-4 z-50
//                      text-gray-500 hover:text-[#F4612B]"
//         >
//           <motion.div whileHover={{ rotate: 90 }}>
//             <X size={22} />
//           </motion.div>
//         </button>

//         <h2 className="text-xl font-bold text-[#F4612B] mb-4">
//           {editData ? "Edit Hotel" : "Add Hotel"}
//         </h2>

//         {/* BASIC INFO */}
//         <input
//           placeholder="Hotel Name"
//           className="input"
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           placeholder="City"
//           className="input mt-2"
//           value={form.city}
//           onChange={e => setForm({ ...form, city: e.target.value })}
//         />

//         <input
//           placeholder="Location"
//           className="input mt-2"
//           value={form.location}
//           onChange={e =>
//             setForm({ ...form, location: e.target.value })
//           }
//         />

//         {/* AMENITIES */}
//         <div className="grid grid-cols-2 gap-2 mt-4">
//           {Object.keys(form.amenities).map(a => (
//             <label key={a} className="flex gap-2">
//               <input
//                 type="checkbox"
//                 checked={form.amenities[a]}
//                 onChange={e =>
//                   setForm({
//                     ...form,
//                     amenities: {
//                       ...form.amenities,
//                       [a]: e.target.checked
//                     }
//                   })
//                 }
//               />
//               {a.toUpperCase()}
//             </label>
//           ))}
//         </div>

//         {/* IMAGE INPUT */}
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleImages}
//           className="
//             mt-4 w-full border px-3 py-2 rounded
//             focus:outline-none focus:border-[#F4612B]
//           "
//         />

//         {/* IMAGE PREVIEW */}
//         {preview.length > 0 && (
//           <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
//             {preview.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 className="h-20 w-32 object-cover rounded"
//               />
//             ))}
//           </div>
//         )}

//         {/* ACTION BUTTONS */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={close}
//             className="border px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={submit}
//             className="bg-[#F4612B] text-white px-4 py-2 rounded"
//           >
//             Save
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
import { Settings, MapPin, X, Info, Plus, ChevronDown } from "lucide-react";

const API_BASE = "https://api.sdtour.online";

export default function HotelFormModel({ close, refresh, editData }) {
  const [cities, setCities] = useState([]);
  const [facilities, setFacilities] = useState([]);
  
  const [form, setForm] = useState(
    editData || {
      name: "",
      city: "",
      location: "",
      amenities: {},
      rooms: [
        { type: "2-bed", totalRooms: 5 },
        { type: "3-bed", totalRooms: 5 },
        { type: "4-bed", totalRooms: 5 }
      ]
    }
  );

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      const [cityRes, facRes] = await Promise.all([
        axios.get(`${API_BASE}/cities`),
        axios.get(`${API_BASE}/facilities`)
      ]);
      setCities(cityRes.data);
      setFacilities(facRes.data);
      
      // If adding new, initialize amenities from fetched facilities
      if (!editData) {
        const initialAm = {};
        facRes.data.forEach(f => initialAm[f.name] = false);
        setForm(prev => ({ ...prev, amenities: initialAm }));
      }
    } catch (err) {
      toast.error("Failed to load cities/facilities");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= IMAGE HANDLER ================= */
  const handleImages = e => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map(file => URL.createObjectURL(file)));
  };

  /* ================= SUBMIT ================= */
  const submit = async () => {
    try {
      if (!form.name || !form.city || !form.location) {
        toast.error("Please fill all required fields");
        return;
      }

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("city", form.city);
      formData.append("location", form.location);

      // ✅ stringify objects
      formData.append(
        "amenities",
        JSON.stringify(form.amenities)
      );

      formData.append(
        "rooms",
        JSON.stringify(form.rooms)
      );

      images.forEach(img => {
        formData.append("images", img);
      });

      if (editData) {
        await axios.put(
          `${API_BASE}/hotels/${editData._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Hotel updated successfully");
      } else {
        await axios.post(
          `${API_BASE}/hotels/add`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Hotel added successfully");
      }

      refresh && refresh();
      close();
    } catch (err) {
      console.error("FORM SUBMIT ERROR:", err);
      toast.error(
        err.response?.data?.msg || "Failed to save hotel"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white w-full max-w-2xl p-6 rounded-xl max-h-[90vh] overflow-y-auto"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#F4612B]"
        >
          <motion.div whileHover={{ rotate: 90 }}>
            <X size={22} />
          </motion.div>
        </button>

        <h2 className="text-xl font-bold text-[#F4612B] mb-4">
          {editData ? "Edit Hotel" : "Add Hotel"}
        </h2>

        {/* BASIC INFO */}
        <div className="space-y-3">
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F4612B] transition-colors">
              <Plus size={18} />
            </span>
            <input
              placeholder="Hotel Name"
              className="w-full border-2 border-gray-100 px-10 py-3 rounded-2xl focus:border-[#F4612B] outline-none transition-all font-semibold"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-semibold">
            {/* CITY SELECT */}
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F4612B] transition-colors pointer-events-none">
                <MapPin size={18} />
              </span>
              <select
                className="w-full border-2 border-gray-100 flex appearance-none pl-10 pr-10 py-3 rounded-2xl focus:border-[#F4612B] outline-none transition-all capitalize"
                value={form.city}
                onChange={e => setForm({ ...form, city: e.target.value })}
              >
                <option value="">Select City</option>
                {cities.map(c => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <ChevronDown size={18} />
              </span>
            </div>

            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F4612B] transition-colors pointer-events-none">
                <Settings size={18} />
              </span>
              <input
                placeholder="Specific Location"
                className="w-full border-2 border-gray-100 pl-10 pr-4 py-3 rounded-2xl focus:border-[#F4612B] outline-none transition-all"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* DYNAMIC AMENITIES / FACILITIES */}
        <div className="mt-8">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Settings size={16} /> Hotel Facilities
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {facilities.map(fac => {
              // We'll use the map from before to show icons if possible
              // but since icons are dynamic, we just show name and checkbox for now
              return (
                <label 
                  key={fac._id} 
                  className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    form.amenities?.[fac.name] 
                      ? "border-[#F4612B] bg-orange-50 text-[#F4612B]" 
                      : "border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={!!form.amenities?.[fac.name]}
                    onChange={e =>
                      setForm({
                        ...form,
                        amenities: {
                          ...(form.amenities || {}),
                          [fac.name]: e.target.checked
                        }
                      })
                    }
                  />
                  <span className="font-semibold capitalize text-sm">{fac.name}</span>
                </label>
              );
            })}
          </div>
          {facilities.length === 0 && (
             <p className="text-gray-400 text-xs italic">Go to 'Manage Facility' to add amenities</p>
          )}
        </div>

        {/* IMAGES */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
          className="mt-4 w-full border px-3 py-2 rounded"
        />

        {/* PREVIEW */}
        {preview.length > 0 && (
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {preview.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-20 w-32 object-cover rounded"
              />
            ))}
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={close}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="bg-[#F4612B] text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
