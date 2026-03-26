import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function PricecalenderModal({ hotel, close }) {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [roomType, setRoomType] = useState("2-bed");
  const [prices, setPrices] = useState([]);

  const daysInMonth = new Date(year, month, 0).getDate();

  useEffect(() => {
    fetchMonthPrices();
  }, [month, year, roomType]);

  const fetchMonthPrices = async () => {
    const res = await axios.get(
      "http://72.62.195.222:7345/hotels/month-prices",
      {
        params: {
          hotelId: hotel._id,
          roomType,
          month,
          year
        }
      }
    );
    setPrices(res.data);
  };

  const handleChange = (date, value) => {
    setPrices(prev => {
      const copy = [...prev];
      const index = copy.findIndex(
        p => new Date(p.date).toDateString() === date.toDateString()
      );

      if (index > -1) copy[index].price = value;
      else copy.push({ date, price: value });

      return copy;
    });
  };

  const savePrices = async () => {
    await axios.post("http://72.62.195.222:7345/hotels/month-prices", {
      hotelId: hotel._id,
      roomType,
      prices
    });
    alert("Prices saved");
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      {/* MODAL */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          relative bg-white p-6 rounded-xl
          w-full max-w-4xl
          max-h-[90vh] overflow-y-auto hide-scrollbar
        "
      >
        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={close}
          className="
            absolute top-4 right-4
            text-gray-500 hover:text-[#F4612B]
            transition
          "
        >
          <motion.div whileHover={{ rotate: 90 }}>
            <X size={24} />
          </motion.div>
        </button>

        {/* HEADER */}
        <h2 className="text-xl font-bold mb-4">
          Manage Prices – {hotel.name}
        </h2>

        {/* CONTROLS */}
        <div className="flex flex-wrap gap-4 mb-5">
          <select
            value={roomType}
            onChange={e => setRoomType(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="2-bed">2 Bed</option>
            <option value="3-bed">3 Bed</option>
            <option value="4-bed">4 Bed</option>
          </select>

          <input
            type="month"
            value={`${year}-${String(month).padStart(2, "0")}`}
            onChange={e => {
              const [y, m] = e.target.value.split("-");
              setYear(+y);
              setMonth(+m);
            }}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* CALENDAR */}
        <div className="grid grid-cols-7 gap-3">
          {Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(year, month - 1, i + 1);
            const found = prices.find(
              p =>
                new Date(p.date).toDateString() === date.toDateString()
            );

            return (
              <div
                key={i}
                className="border rounded-lg p-2 text-sm"
              >
                <p className="font-medium mb-1">{i + 1}</p>
                <input
                  type="number"
                  placeholder="Price"
                  value={found?.price || ""}
                  onChange={e =>
                    handleChange(date, Number(e.target.value))
                  }
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={close}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={savePrices}
            className="px-4 py-2 bg-[#F4612B] text-white rounded"
          >
            Save Prices
          </button>
        </div>
      </motion.div>
    </div>
  );
}
