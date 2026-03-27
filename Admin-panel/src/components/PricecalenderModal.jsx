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
      "https://api.sdtour.online/hotels/month-prices",
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

  const normalize = (d) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleChange = (date, value) => {
    const dateStr = normalize(date);
    setPrices(prev => {
      const copy = [...prev];
      const index = copy.findIndex(p => normalize(p.date) === dateStr);

      if (index > -1) copy[index].price = value;
      else copy.push({ date: dateStr, price: value });

      return copy;
    });
  };

  const savePrices = async () => {
    // ensure all dates are normalized strings
    const payload = prices.map(p => ({ date: normalize(p.date), price: p.price }));
    await axios.post("https://api.sdtour.online/hotels/month-prices", {
      hotelId: hotel._id,
      roomType,
      prices: payload
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
          relative bg-white p-10 rounded-3xl
          w-full max-w-5xl
          max-h-[90vh] overflow-y-auto hide-scrollbar
        "
      >
        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={close}
          className="
            absolute top-6 right-6
            text-gray-400 hover:text-[#F4612B]
            transition
          "
        >
          <motion.div whileHover={{ rotate: 90 }}>
            <X size={28} />
          </motion.div>
        </button>

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Manage Nightly Prices
          </h2>
          <p className="text-gray-500 font-medium">{hotel.name} — {hotel.city}</p>
        </div>

        {/* CONTROLS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Room Category</label>
            <select
              value={roomType}
              onChange={e => setRoomType(e.target.value)}
              className="w-full border-2 border-white bg-white shadow-sm px-4 py-3 rounded-xl outline-none focus:border-[#F4612B] font-bold text-gray-700 capitalize"
            >
              {hotel.rooms?.map(r => (
                <option key={r.type} value={r.type}>{r.type}</option>
              )) || [
                <option value="1-bed">1 Bed</option>,
                <option value="2-bed">2 Bed</option>,
                <option value="3-bed">3 Bed</option>,
                <option value="4-bed">4 Bed</option>
              ]}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Month & Year</label>
            <input
              type="month"
              value={`${year}-${String(month).padStart(2, "0")}`}
              onChange={e => {
                const [y, m] = e.target.value.split("-");
                setYear(+y);
                setMonth(+m);
              }}
              className="w-full border-2 border-white bg-white shadow-sm px-4 py-3 rounded-xl outline-none focus:border-[#F4612B] font-bold text-gray-700 uppercase"
            />
          </div>
        </div>

        {/* CALENDAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(year, month - 1, i + 1);
            const dateStr = normalize(date);
            const found = prices.find(p => normalize(p.date) === dateStr);

            return (
              <div
                key={i}
                className={`border-2 rounded-2xl p-3 transition-all ${
                  found?.price 
                    ? "border-orange-100 bg-orange-50/30" 
                    : "border-gray-50 bg-gray-50/50"
                }`}
              >
                <p className="text-xs font-bold text-gray-400 mb-2">{i + 1}</p>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    placeholder="Rate"
                    value={found?.price || ""}
                    onChange={e =>
                      handleChange(date, Number(e.target.value))
                    }
                    className="w-full bg-white border border-transparent focus:border-orange-200 shadow-sm rounded-lg pl-6 pr-2 py-2 text-sm font-bold text-gray-800 outline-none"
                  />
                </div>
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
