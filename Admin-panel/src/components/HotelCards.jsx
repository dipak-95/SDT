import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

const API_BASE = "https://sdt-7.onrender.com";

export default function HotelCard({ hotel, refresh, onEdit }) {
  const [index, setIndex] = useState(0);
  const [loadingRoom, setLoadingRoom] = useState(null);
  const [roomCount, setRoomCount] = useState({});


  /* DELETE HOTEL */
  const deleteHotel = async () => {
    try {
      await axios.delete(`${API_BASE}/hotels/${hotel._id}`);
      toast.success("Hotel deleted successfully 🗑️");
      refresh();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  /* ADD MORE ROOMS (PER ROOM TYPE) */
 const addMoreRooms = async (roomType) => {
  const count = roomCount[roomType] || 1;

  try {
    await axios.put(
      `${API_BASE}/hotels/add-rooms/${hotel._id}`,
      {
        roomType,
        count
      }
    );

    toast.success(`${count} rooms added to ${roomType}`);
    refresh();
  } catch {
    toast.error("Failed to add rooms");
  }
};

  /* IMAGE SLIDER */
  const images = hotel.images || [];

  const prevImage = () =>
    setIndex(i => (i === 0 ? images.length - 1 : i - 1));

  const nextImage = () =>
    setIndex(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow p-5"
    >
      {/* IMAGE SLIDER */}
      <div className="relative h-40 w-full overflow-hidden rounded-lg">
        {images.length ? (
          <>
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={`${API_BASE}${images[index]}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-1 rounded-full shadow"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-1 rounded-full shadow"
                >
                  ›
                </button>
              </>
            )}
          </>
        ) : (
          <div className="h-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
            No Images
          </div>
        )}
      </div>

      {/* HOTEL INFO */}
      <h3 className="text-lg font-bold text-[#F4612B] mt-3">
        {hotel.name}
      </h3>

      <p className="text-sm text-gray-600 capitalize">
        📍 {hotel.city}
      </p>

      <p className="text-sm mt-1">{hotel.location}</p>

      {/* AMENITIES */}
      {hotel.amenities && (
        <div className="flex flex-wrap gap-2 text-xs mt-2">
          {Object.entries(hotel.amenities)
            .filter(([, value]) => value)
            .map(([key]) => (
              <span
                key={key}
                className="bg-orange-50 text-[#F4612B] px-2 py-1 rounded"
              >
                {key}
              </span>
            ))}
        </div>
      )}

      {/* ROOMS */}
      <div className="mt-3 space-y-2">
        {hotel.rooms.map(room => {
  const available =
    room.totalRooms - room.bookedRooms;

  return (
    <div
      key={room.type}
      className="border rounded-lg p-3 space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="font-medium capitalize">
          {room.type}
        </span>

        <span className="text-[#F4612B] font-semibold">
          ₹{room.price}
        </span>

        <span
          className={`font-semibold ${
            available === 0
              ? "text-red-500"
              : "text-green-600"
          }`}
        >
          {available} left
        </span>
      </div>

      {/* ADMIN CONTROLS */}
      {available === 0 && (
        <div className="flex items-center gap-2">
          <select
            value={roomCount[room.type] || 1}
            onChange={e =>
              setRoomCount(prev => ({
                ...prev,
                [room.type]: Number(e.target.value)
              }))
            }
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={1}>+1</option>
            <option value={2}>+2</option>
            <option value={3}>+3</option>
            <option value={5}>+5</option>
            <option value={10}>+10</option>
          </select>

          <button
            onClick={() => addMoreRooms(room.type)}
            className="bg-[#F4612B] text-white px-3 py-1 rounded text-sm"
          >
            Add Rooms
          </button>
        </div>
      )}
    </div>
  );
})}

      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="bg-[#F4612B] text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={deleteHotel}
          className="border border-[#F4612B] text-[#F4612B] px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
