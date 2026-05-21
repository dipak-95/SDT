import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  Armchair,
  X,
  Phone,
  User,
  Info,
  Unlock,
  CheckCircle
} from "lucide-react";

const BASE_URL = "https://api.sdtour.online";

export default function AdminGroupTourSeats() {
  const [tours, setTours] = useState([]);
  const [selectedTourId, setSelectedTourId] = useState("");
  const [tourDetails, setTourDetails] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [selectedSeat, setSelectedSeat] = useState(null); // { seatNumber, status, bookingName, phone }
  const [bookingForm, setBookingForm] = useState({ bookingName: "", phone: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all tours
  const fetchTours = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/group-tours`);
      setTours(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load group tours ❌");
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Fetch seats for selected tour
  const fetchSeats = async (tourId) => {
    if (!tourId) {
      setSeats([]);
      setTourDetails(null);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/group-tours/${tourId}/seats`);
      setSeats(res.data.seats || []);
      
      const tourRes = await axios.get(`${BASE_URL}/group-tours/${tourId}`);
      setTourDetails(tourRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load seats ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats(selectedTourId);
  }, [selectedTourId]);

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
    if (seat.status === "available") {
      setBookingForm({ bookingName: "", phone: "" });
    } else {
      setBookingForm({ bookingName: seat.bookingName || "", phone: seat.phone || "" });
    }
    setIsModalOpen(true);
  };

  const handleBookOffline = async (e) => {
    e.preventDefault();
    if (!selectedSeat) return;
    setIsSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/group-tours/${selectedTourId}/seats/book-offline`, {
        seatNumber: selectedSeat.seatNumber,
        bookingName: bookingForm.bookingName,
        phone: bookingForm.phone
      });
      toast.success(`Seat ${selectedSeat.seatNumber} booked offline! ✅`);
      setIsModalOpen(false);
      fetchSeats(selectedTourId);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Booking failed ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReleaseSeat = async () => {
    if (!selectedSeat) return;
    if (!window.confirm(`Are you sure you want to release Seat ${selectedSeat.seatNumber}?`)) return;
    setIsSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/group-tours/${selectedTourId}/seats/release-offline`, {
        seatNumber: selectedSeat.seatNumber
      });
      toast.info(`Seat ${selectedSeat.seatNumber} is now available 🔓`);
      setIsModalOpen(false);
      fetchSeats(selectedTourId);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Release failed ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get counts
  const availableCount = seats.filter(s => s.status === "available").length;
  const onlineCount = seats.filter(s => s.status === "booked_online").length;
  const offlineCount = seats.filter(s => s.status === "booked_offline").length;

  const renderSeatButton = (seat) => {
    if (!seat) return <div className="w-12 h-12"></div>;

    let bgClass = "bg-white border border-gray-200 text-gray-700 hover:border-green-400 hover:bg-green-50";
    let iconColor = "text-gray-400 group-hover:text-green-500";
    if (seat.status === "booked_online") {
      bgClass = "bg-purple-100 border border-purple-300 text-purple-800 hover:bg-purple-200";
      iconColor = "text-purple-600";
    } else if (seat.status === "booked_offline") {
      bgClass = "bg-blue-100 border border-blue-300 text-blue-800 hover:bg-blue-200";
      iconColor = "text-blue-600";
    }

    return (
      <button
        key={seat.seatNumber}
        onClick={() => handleSeatClick(seat)}
        className={`group relative flex flex-col items-center justify-center p-1.5 rounded-lg transition-all duration-200 shadow-sm cursor-pointer min-h-[56px] ${bgClass}`}
      >
        <Armchair className={`w-5 h-5 mb-0.5 ${iconColor}`} />
        <span className="text-[10px] font-bold">Seat {seat.seatNumber}</span>
        {seat.bookingName && (
          <span className="text-[8px] font-medium truncate max-w-full block text-center px-1">
            {seat.bookingName}
          </span>
        )}
      </button>
    );
  };

  const renderSeatsGrid = () => {
    if (seats.length === 0) return null;
    const rows = [];
    const total = seats.length;
    let seatIndex = 0;

    while (seatIndex < total) {
      const isLastRow = total - seatIndex <= 5;
      if (isLastRow) {
        const rowSeats = seats.slice(seatIndex);
        const paddedSeats = [...rowSeats];
        while (paddedSeats.length < 5) paddedSeats.push(null);
        rows.push(
          <div key="row-last" className="grid grid-cols-5 gap-2 mt-2">
            {paddedSeats.map((seat, idx) => renderSeatButton(seat))}
          </div>
        );
        break;
      } else {
        const rowSeats = seats.slice(seatIndex, seatIndex + 4);
        rows.push(
          <div key={`row-${seatIndex}`} className="grid grid-cols-5 gap-2 mt-2">
            {renderSeatButton(rowSeats[0])}
            {renderSeatButton(rowSeats[1])}
            <div className="flex items-center justify-center">
              <span className="text-[8px] text-gray-300 font-bold uppercase tracking-wider select-none rotate-90 md:rotate-0">
                Aisle
              </span>
            </div>
            {renderSeatButton(rowSeats[2])}
            {renderSeatButton(rowSeats[3])}
          </div>
        );
        seatIndex += 4;
      }
    }
    return <div className="space-y-1 bg-white p-4 rounded-xl border border-gray-200 max-w-md mx-auto shadow-sm">{rows}</div>;
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#f4612b]">Group Tour Seats</h1>
          <p className="text-sm text-gray-500">Manage online & offline bookings and seat layout mappings</p>
        </div>

        <div className="w-full md:w-72">
          <label className="text-xs text-gray-500 font-bold block mb-1">Select Tour</label>
          <select
            value={selectedTourId}
            onChange={(e) => setSelectedTourId(e.target.value)}
            className="w-full border border-gray-300 p-2.5 rounded-lg bg-white shadow-sm font-medium focus:ring-2 focus:ring-orange-500 outline-none"
          >
            <option value="">-- Choose a Group Tour --</option>
            {tours.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title} ({new Date(t.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-[#f4612b] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-500 text-sm font-medium">Fetching seat configurations...</p>
        </div>
      ) : selectedTourId ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: INFO & LEGEND */}
          <div className="lg:col-span-1 space-y-6">
            {tourDetails && (
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-800 text-lg border-b pb-2">{tourDetails.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 font-semibold block">START DATE</span>
                    <span className="text-gray-700 font-bold">
                      {new Date(tourDetails.startDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block">END DATE</span>
                    <span className="text-gray-700 font-bold">
                      {new Date(tourDetails.endDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block">LOCATION</span>
                    <span className="text-gray-700 font-bold">{tourDetails.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block">BASE PRICE</span>
                    <span className="text-gray-700 font-bold">₹{tourDetails.oldPrice}</span>
                  </div>
                </div>
              </div>
            )}

            {/* SEAT STATISTICS */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h4 className="font-bold text-gray-800 text-sm tracking-wider uppercase">Seat Status Statistics</h4>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 border border-green-100 p-3 rounded-xl text-center">
                  <span className="text-green-600 font-bold text-lg block">{availableCount}</span>
                  <span className="text-[10px] text-green-700 font-semibold uppercase">Available</span>
                </div>
                <div className="bg-purple-50 border border-purple-100 p-3 rounded-xl text-center">
                  <span className="text-purple-600 font-bold text-lg block">{onlineCount}</span>
                  <span className="text-[10px] text-purple-700 font-semibold uppercase">Online</span>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-center">
                  <span className="text-blue-600 font-bold text-lg block">{offlineCount}</span>
                  <span className="text-[10px] text-blue-700 font-semibold uppercase">Offline</span>
                </div>
              </div>

              {/* LEGEND MAP */}
              <div className="border-t pt-4 space-y-2.5 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-white border border-gray-300 flex items-center justify-center">
                    <Armchair className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <span className="text-gray-600 font-medium">Available (Vacant seat)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-purple-100 border border-purple-300 flex items-center justify-center">
                    <Armchair className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <span className="text-gray-600 font-medium">Booked Online (Customer paid via website)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-blue-100 border border-blue-300 flex items-center justify-center">
                    <Armchair className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-gray-600 font-medium">Booked Offline (Manually set by admin)</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: BUS LAYOUT GRID */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-center font-bold text-gray-500 uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 mb-2">
              <Info className="w-4 h-4 text-orange-500" /> Click on any seat to add booking or view information
            </div>

            {/* Front of Bus indicator */}
            <div className="max-w-md mx-auto bg-gray-200 text-gray-600 py-1.5 rounded-t-xl text-center font-bold text-xs uppercase tracking-widest shadow-sm">
              🚌 Front / Driver Row
            </div>
            
            {renderSeatsGrid()}

            <div className="max-w-md mx-auto bg-gray-100 text-gray-400 py-1 rounded-b-xl text-center text-[10px] font-bold uppercase shadow-inner">
              Back / Exit Row
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-dashed rounded-2xl p-12 text-center max-w-xl mx-auto shadow-sm mt-8">
          <Armchair className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-700">No Tour Selected</h3>
          <p className="text-gray-500 text-sm mt-1">Please select a group tour from the dropdown list to manage its seating configuration.</p>
        </div>
      )}

      {/* SEAT BOOKING / DETAILS MODAL */}
      <AnimatePresence>
        {isModalOpen && selectedSeat && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border"
            >
              {/* Header */}
              <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Armchair className={`w-5 h-5 ${selectedSeat.status === 'booked_online' ? 'text-purple-600' : selectedSeat.status === 'booked_offline' ? 'text-blue-600' : 'text-green-600'}`} />
                  <span className="font-bold text-gray-800 text-lg">Seat Number {selectedSeat.seatNumber}</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              {selectedSeat.status === "available" ? (
                <form onSubmit={handleBookOffline} className="p-5 space-y-4">
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-xs text-green-800 font-medium">
                    This seat is currently vacant. Fill the details below to book this seat offline.
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 font-bold block mb-1">Customer Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          required
                          placeholder="Enter passenger name"
                          value={bookingForm.bookingName}
                          onChange={(e) => setBookingForm({ ...bookingForm, bookingName: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 font-bold block mb-1">Phone Number (Optional)</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Enter contact number"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3 border-t">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-2 px-4 border rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors flex justify-center items-center gap-1.5"
                    >
                      {isSubmitting ? "Booking..." : "Book Offline"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-5 space-y-4">
                  {selectedSeat.status === "booked_online" ? (
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-xs text-purple-800 font-medium flex items-start gap-1.5">
                      <CheckCircle className="w-4.5 h-4.5 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        This seat is occupied via <strong>Online Booking</strong>. Standard online reservations cannot be released from seat maps to prevent invoicing discrepancies.
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-800 font-medium flex items-start gap-1.5">
                      <CheckCircle className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        This seat is occupied via <strong>Offline Booking</strong>. You can release this seat to make it vacant again.
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-xl p-4 border space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-semibold">Status:</span>
                      <span className={`font-bold capitalize ${selectedSeat.status === 'booked_online' ? 'text-purple-600' : 'text-blue-600'}`}>
                        {selectedSeat.status === 'booked_online' ? 'Booked Online' : 'Booked Offline'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-semibold">Passenger:</span>
                      <span className="font-bold text-gray-700">{selectedSeat.bookingName || "Offline Group"}</span>
                    </div>
                    {selectedSeat.phone && (
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-semibold">Phone:</span>
                        <span className="font-bold text-gray-700">{selectedSeat.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-3 border-t">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-2 px-4 border rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Close Window
                    </button>
                    {selectedSeat.status === "booked_offline" && (
                      <button
                        onClick={handleReleaseSeat}
                        disabled={isSubmitting}
                        className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors flex justify-center items-center gap-1.5"
                      >
                        <Unlock className="w-4 h-4" /> {isSubmitting ? "Releasing..." : "Release Seat"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
