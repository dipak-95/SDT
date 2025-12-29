// import { motion } from "framer-motion";
// import { useState } from "react";
// import axios from "axios";
// import { X } from "lucide-react";
// import { toast } from "react-toastify";

// const API_BASE = "http://127.0.0.1:1005";

// export default function HotelFormModel({ close, refresh, editData }) {
//   const [form, setForm] = useState(
//     editData || {
//       name: "",
//       city: "",
//       location: "",
//       price: "",
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
//   const submit = async () => {
//     try {
//       const data = new FormData();

//       data.append("name", form.name);
//       data.append("city", form.city);
//       data.append("location", form.location);
//       data.append("price", form.price);
//       data.append("amenities", JSON.stringify(form.amenities));
//       data.append("rooms", JSON.stringify(form.rooms));

//       images.forEach(file => {
//         data.append("images", file);
//       });

//       if (editData) {
//         await axios.put(
//           `${API_BASE}/hotels/${editData._id}`,
//           data,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         toast.success("Hotel updated successfully ✅");
//       } else {
//         await axios.post(
//           `${API_BASE}/hotels/add`,
//           data,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         toast.success("Hotel added successfully 🎉");
//       }

//       refresh();
//       close();
//     } catch (err) {
//       console.error("FORM SUBMIT ERROR:", err);
//       toast.error("Failed to save hotel ❌");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <motion.div
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         className="relative bg-white w-full max-w-2xl p-6 rounded-xl overflow-y-auto max-h-[90vh]"
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

//         {/* INPUTS */}
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
//           onChange={e => setForm({ ...form, location: e.target.value })}
//         />

//         <input
//           placeholder="Price"
//           className="input mt-2"
//           value={form.price}
//           onChange={e => setForm({ ...form, price: e.target.value })}
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
//           className="mt-3 w-full border px-3 py-2 rounded focus:outline-none focus:border-[#F4612B]"
//         />

//         {/* IMAGE PREVIEW */}
//         {preview.length > 0 && (
//           <div className="flex gap-2 mt-3 overflow-x-auto">
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
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const API_BASE = "http://127.0.0.1:1005";

export default function HotelFormModel({ close, refresh, editData }) {
  const [form, setForm] = useState(
    editData || {
      name: "",
      city: "",
      location: "",
      amenities: {
        wifi: false,
        pool: false,
        meal: false,
        parking: false,
        ac: false
      },
      rooms: [
        { type: "2-bed", price: "", totalRooms: 5 },
        { type: "3-bed", price: "", totalRooms: 5 },
        { type: "4-bed", price: "", totalRooms: 5 }
      ]
    }
  );

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  /* HANDLE IMAGE SELECT */
  const handleImages = e => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map(file => URL.createObjectURL(file)));
  };

  /* HANDLE ROOM PRICE CHANGE */
  const handleRoomPriceChange = (index, value) => {
    const updatedRooms = [...form.rooms];
    updatedRooms[index].price = value;
    setForm({ ...form, rooms: updatedRooms });
  };

  /* SUBMIT FORM */
  const submit = async () => {
    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("city", form.city);
      data.append("location", form.location);
      data.append("amenities", JSON.stringify(form.amenities));
      data.append("rooms", JSON.stringify(form.rooms));

      images.forEach(file => {
        data.append("images", file);
      });

      if (editData) {
        await axios.put(
          `${API_BASE}/hotels/${editData._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Hotel updated successfully ✅");
      } else {
        await axios.post(
          `${API_BASE}/hotels/add`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Hotel added successfully 🎉");
      }

      refresh();
      close();
    } catch (err) {
      console.error("FORM SUBMIT ERROR:", err);
      toast.error("Failed to save hotel ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="relative bg-white w-full max-w-2xl p-6 rounded-xl overflow-y-auto max-h-[90vh]"
      >
        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={close}
          className="absolute top-4 right-4 z-50
                     text-gray-500 hover:text-[#F4612B]"
        >
          <motion.div whileHover={{ rotate: 90 }}>
            <X size={22} />
          </motion.div>
        </button>

        <h2 className="text-xl font-bold text-[#F4612B] mb-4">
          {editData ? "Edit Hotel" : "Add Hotel"}
        </h2>

        {/* BASIC INFO */}
        <input
          placeholder="Hotel Name"
          className="input"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="City"
          className="input mt-2"
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
        />

        <input
          placeholder="Location"
          className="input mt-2"
          value={form.location}
          onChange={e =>
            setForm({ ...form, location: e.target.value })
          }
        />

        {/* ROOM PRICES */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Room Prices</h3>

          {form.rooms.map((room, index) => (
            <div
              key={room.type}
              className="flex items-center gap-3 mb-2"
            >
              <span className="w-16 font-medium">
                {room.type}
              </span>

              <input
                type="number"
                placeholder="Price"
                className="input"
                value={room.price}
                onChange={e =>
                  handleRoomPriceChange(index, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        {/* AMENITIES */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {Object.keys(form.amenities).map(a => (
            <label key={a} className="flex gap-2">
              <input
                type="checkbox"
                checked={form.amenities[a]}
                onChange={e =>
                  setForm({
                    ...form,
                    amenities: {
                      ...form.amenities,
                      [a]: e.target.checked
                    }
                  })
                }
              />
              {a.toUpperCase()}
            </label>
          ))}
        </div>

        {/* IMAGE INPUT */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
          className="mt-3 w-full border px-3 py-2 rounded focus:outline-none focus:border-[#F4612B]"
        />

        {/* IMAGE PREVIEW */}
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
