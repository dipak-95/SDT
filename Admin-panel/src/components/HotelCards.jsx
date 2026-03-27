import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

const API_BASE = "https://api.sdtour.online";

export default function HotelCard({
  hotel,
  refresh,
  onEdit,
  onPrice
}) {
  const [index, setIndex] = useState(0);
  const [roomCount, setRoomCount] = useState({});

  const deleteHotel = async () => {
    try {
      await axios.delete(`${API_BASE}/hotels/${hotel._id}`);
      toast.success("Hotel deleted successfully 🗑️");
      refresh();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  const addMoreRooms = async roomType => {
    const count = roomCount[roomType] || 1;
    try {
      await axios.put(
        `${API_BASE}/hotels/add-rooms/${hotel._id}`,
        { roomType, count }
      );
      toast.success(`${count} rooms added to ${roomType}`);
      refresh();
    } catch {
      toast.error("Failed to add rooms");
    }
  };

  const images = hotel.images || [];

  const prevImage = () =>
    setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setIndex(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="
        bg-white rounded-2xl shadow
        p-5 w-full overflow-hidden
        grid grid-cols-1 lg:grid-cols-1 mt-8 gap-4
      "
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden rounded-xl">
        {images.length ? (
          <>
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index] ? `${API_BASE}${images[index]}` : ""}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400?text=No+Image";
                }}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-1 rounded-full"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-1 rounded-full"
                >
                  ›
                </button>
              </>
            )}
          </>
        ) : (
          <div className="h-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col">
        {/* INFO */}
        <div>
          <h3 className="text-lg font-bold text-[#F4612B]">
            {hotel.name}
          </h3>

          <p className="text-sm text-gray-600 capitalize">
            📍 {hotel.city}
          </p>

          <p className="text-sm mt-1 flex flex-wrap items-center gap-1">
            <span>{hotel.location}</span>
            {hotel.mapLink && (
              <a href={hotel.mapLink} target="_blank" rel="noopener noreferrer" className="ml-1 text-[#F4612B] underline text-xs font-semibold hover:text-orange-600">
                (Explore on Map)
              </a>
            )}
          </p>

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
        </div>

        {/* ROOMS */}
        <div className="mt-4 space-y-3">
          {hotel.rooms.map(room => {
            const available =
              room.availableRooms ?? room.totalRooms;

            return (
              <div
                key={room.type}
                className="border rounded-lg p-3 w-full"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium capitalize">
                    {room.type}
                  </span>
                  <span
                    className={`font-semibold ${available === 0
                        ? "text-red-500"
                        : "text-green-600"
                      }`}
                  >
                    {available} left
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
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
                    onClick={() => {
                      toast.info("Open price manager 📅");
                      onPrice();
                    }}
                    className="border border-[#F4612B] text-[#F4612B] px-3 py-1 rounded text-sm"
                  >
                    Manage Prices
                  </button>

                  <button
                    onClick={() => addMoreRooms(room.type)}
                    className="bg-[#F4612B] text-white px-3 py-1 rounded text-sm"
                  >
                    Add Rooms
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={onEdit}
            className="bg-[#F4612B] text-white px-4 py-2 rounded w-full"
          >
            Edit
          </button>
          <button
            onClick={deleteHotel}
            className="border border-[#F4612B] text-[#F4612B] px-4 py-2 rounded w-full"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}
