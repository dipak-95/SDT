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
  CheckCircle,
  Users,
  Calendar,
  MapPin,
  Tag
} from "lucide-react";

const BASE_URL = "https://api.sdtour.online";

export default function AdminGroupTourSeats() {
  const [tours, setTours] = useState([]);
  const [selectedTourId, setSelectedTourId] = useState("");
  const [tourDetails, setTourDetails] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Multi-seat selection state
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState([]);
  const [bookingForm, setBookingForm] = useState({ bookingName: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detail Modal (for viewing/releasing occupied seats)
  const [modalSeat, setModalSeat] = useState(null); // { seatNumber, status, bookingName, phone }
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setSelectedSeatNumbers([]);
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
    setSelectedSeatNumbers([]);
    setBookingForm({ bookingName: "", phone: "" });
  }, [selectedTourId]);

  const handleSeatClick = (seat) => {
    if (seat.status === "available") {
      // Toggle selection
      setSelectedSeatNumbers(prev => {
        if (prev.includes(seat.seatNumber)) {
          return prev.filter(num => num !== seat.seatNumber);
        } else {
          return [...prev, seat.seatNumber].sort((a, b) => a - b);
        }
      });
    } else {
      // Booked - show details
      setModalSeat(seat);
      setIsModalOpen(true);
    }
  };

  const handleBookOffline = async (e) => {
    e.preventDefault();
    if (selectedSeatNumbers.length === 0) return;
    setIsSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/group-tours/${selectedTourId}/seats/book-offline`, {
        seatNumbers: selectedSeatNumbers,
        bookingName: bookingForm.bookingName,
        phone: bookingForm.phone
      });
      toast.success(`${selectedSeatNumbers.length} seat(s) booked offline! ✅`);
      setSelectedSeatNumbers([]);
      setBookingForm({ bookingName: "", phone: "" });
      fetchSeats(selectedTourId);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Booking failed ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReleaseSeat = async () => {
    if (!modalSeat) return;
    if (!window.confirm(`Are you sure you want to release Seat ${modalSeat.seatNumber}?`)) return;
    setIsSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/group-tours/${selectedTourId}/seats/release-offline`, {
        seatNumber: modalSeat.seatNumber
      });
      toast.info(`Seat ${modalSeat.seatNumber} is now available 🔓`);
      setIsModalOpen(false);
      fetchSeats(selectedTourId);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Release failed ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearSelection = () => {
    setSelectedSeatNumbers([]);
    setBookingForm({ bookingName: "", phone: "" });
  };

  // Get counts
  const availableCount = seats.filter(s => s.status === "available").length;
  const onlineCount = seats.filter(s => s.status === "booked_online").length;
  const offlineCount = seats.filter(s => s.status === "booked_offline").length;

  const renderSeatButton = (seat) => {
    if (!seat) return <div key="empty" className="w-12 h-12"></div>;

    const isSelected = selectedSeatNumbers.includes(seat.seatNumber);
    let bgClass = "bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:bg-orange-50/30";
    let iconColor = "text-gray-400 group-hover:text-orange-500";

    if (seat.status === "booked_online") {
      bgClass = "bg-purple-100 border border-purple-300 text-purple-800 hover:bg-purple-200/80 cursor-pointer";
      iconColor = "text-purple-600";
    } else if (seat.status === "booked_offline") {
      bgClass = "bg-blue-100 border border-blue-300 text-blue-800 hover:bg-blue-200/80 cursor-pointer";
      iconColor = "text-blue-600";
    } else if (isSelected) {
      bgClass = "bg-orange-600 border border-orange-700 text-white hover:bg-orange-700";
      iconColor = "text-white";
    }

    return (
      <button
        key={seat.seatNumber}
        onClick={() => handleSeatClick(seat)}
        className={`group relative flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-200 shadow-sm min-h-[56px] ${bgClass}`}
      >
        <Armchair className={`w-5 h-5 mb-0.5 ${iconColor}`} />
        <span className="text-[10px] font-bold">Seat {seat.seatNumber}</span>
        {seat.bookingName && (
          <span className="text-[8px] font-medium truncate max-w-full block text-center px-1">
            {seat.bookingName}
          </span>
        )}
        {isSelected && (
          <span className="text-[8px] font-black uppercase text-orange-200">
            Selected
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
            {paddedSeats.map((seat) => renderSeatButton(seat))}
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
    return <div className="space-y-1 bg-white p-4 rounded-2xl border border-gray-200 max-w-md mx-auto shadow-md">{rows}</div>;
  };

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Group Tour <span className="text-orange-600">Seats Manager</span></h1>
          <p className="text-sm text-gray-500">Book multiple seats offline at once, configure seat maps, and view live occupancy.</p>
        </div>

        <div className="w-full md:w-80">
          <label className="text-xs text-gray-400 font-black uppercase tracking-wider block mb-1">Select Active Tour</label>
          <select
            value={selectedTourId}
            onChange={(e) => setSelectedTourId(e.target.value)}
            className="w-full border-2 border-gray-200 p-3 rounded-2xl bg-white shadow-sm font-bold text-gray-700 focus:border-orange-500 outline-none transition-all"
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
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-500 text-sm font-semibold">Loading live seat data...</p>
        </div>
      ) : selectedTourId ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: INFO, STATS & MULTI-BOOK FORM */}
          <div className="lg:col-span-1 space-y-6">
            {tourDetails && (
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl space-y-4">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest block w-max">Active Tour</span>
                <h3 className="font-black text-gray-900 text-xl tracking-tight leading-tight">{tourDetails.title}</h3>
                
                <div className="space-y-3 pt-2 border-t text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>
                      {new Date(tourDetails.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} - {new Date(tourDetails.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{tourDetails.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="font-bold">₹{tourDetails.finalPrice || tourDetails.oldPrice}</span>
                  </div>
                </div>
              </div>
            )}

            {/* SEAT STATISTICS */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl space-y-4">
              <h4 className="font-black text-gray-800 text-xs tracking-wider uppercase">Live Seating Status</h4>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 border border-green-100 p-3 rounded-2xl text-center">
                  <span className="text-green-600 font-black text-xl block">{availableCount}</span>
                  <span className="text-[9px] text-green-700 font-bold uppercase tracking-wider">Vacant</span>
                </div>
                <div className="bg-purple-50 border border-purple-100 p-3 rounded-2xl text-center">
                  <span className="text-purple-600 font-black text-xl block">{onlineCount}</span>
                  <span className="text-[9px] text-purple-700 font-bold uppercase tracking-wider">Online</span>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl text-center">
                  <span className="text-blue-600 font-black text-xl block">{offlineCount}</span>
                  <span className="text-[9px] text-blue-700 font-bold uppercase tracking-wider">Offline</span>
                </div>
              </div>
            </div>

            {/* MULTI-BOOK FORM CARD (Appears only when available seats selected) */}
            <AnimatePresence>
              {selectedSeatNumbers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-white p-6 rounded-3xl border-2 border-orange-500 shadow-2xl space-y-4"
                >
                  <div className="flex justify-between items-center pb-2 border-b">
                    <h3 className="font-black text-gray-900 text-lg">Group Offline Book</h3>
                    <button 
                      onClick={clearSelection}
                      className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                    >
                      Clear Selection
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 py-1">
                    <span className="text-xs font-bold text-gray-400 uppercase mr-1">Booking:</span>
                    {selectedSeatNumbers.map(num => (
                      <span key={num} className="bg-orange-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                        Seat {num}
                      </span>
                    ))}
                  </div>

                  <form onSubmit={handleBookOffline} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-bold uppercase">Passenger Group Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sharma Family (3 Seats)"
                          value={bookingForm.bookingName}
                          onChange={(e) => setBookingForm({ ...bookingForm, bookingName: e.target.value })}
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 pl-10 pr-4 py-3.5 rounded-2xl outline-none font-semibold transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-bold uppercase">Contact Phone (Optional)</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="e.g. 9876543210"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 pl-10 pr-4 py-3.5 rounded-2xl outline-none font-semibold transition-all text-sm"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-xl transition-all uppercase tracking-wider text-xs flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Booking Group...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Book {selectedSeatNumbers.length} Seats
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SEAT LEGEND */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl space-y-4">
              <h4 className="font-black text-gray-800 text-xs tracking-wider uppercase">Seating Map Legend</h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-lg bg-white border border-gray-300 flex items-center justify-center">
                    <Armchair className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <span className="text-gray-600 font-medium">Available / Vacant</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-lg bg-orange-600 flex items-center justify-center">
                    <Armchair className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-gray-600 font-medium">Selected for Group Booking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-lg bg-purple-100 border border-purple-300 flex items-center justify-center">
                    <Armchair className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <span className="text-gray-600 font-medium">Booked Online (Razorpay)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center">
                    <Armchair className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-gray-600 font-medium">Booked Offline (Admin block)</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: BUS LAYOUT GRID */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-xs font-bold text-orange-700 flex items-center gap-2.5 max-w-md mx-auto shadow-sm">
              <Info className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Click available seats to select multiple. Click online/offline seats to view details/release.</span>
            </div>

            {/* Front of Bus indicator */}
            <div className="max-w-md mx-auto bg-gray-900 text-white py-2 rounded-t-2xl text-center font-black text-xs uppercase tracking-widest shadow-md">
              🚌 Front / Driver Row
            </div>
            
            {renderSeatsGrid()}

            <div className="max-w-md mx-auto bg-gray-200 text-gray-400 py-1.5 rounded-b-2xl text-center text-[10px] font-bold uppercase shadow-inner">
              Back / Exit Row
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-dashed rounded-3xl p-16 text-center max-w-xl mx-auto shadow-md mt-8">
          <Armchair className="w-20 h-20 text-gray-300 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-black text-gray-800">No Tour Selected</h3>
          <p className="text-gray-500 text-sm mt-2">Please choose an active group tour from the top right dropdown list to view or configure its seating chart layout.</p>
        </div>
      )}

      {/* VIEW DETAIL MODAL */}
      <AnimatePresence>
        {isModalOpen && modalSeat && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border"
            >
              {/* Header */}
              <div className="bg-gray-50 p-5 border-b flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <Armchair className={`w-6 h-6 ${modalSeat.status === 'booked_online' ? 'text-purple-600' : 'text-blue-600'}`} />
                  <span className="font-black text-gray-900 text-xl">Seat Number {modalSeat.seatNumber}</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-4">
                {modalSeat.status === "booked_online" ? (
                  <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 text-xs text-purple-800 font-semibold flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 shrink-0" />
                    <div>
                      This seat is occupied via <strong>Online Booking</strong>. Standard online reservations cannot be released from seat maps to prevent invoicing discrepancies.
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-800 font-semibold flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      This seat is occupied via <strong>Offline Booking</strong>. You can release this seat to make it vacant again.
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-2xl p-5 border space-y-3.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Booking Status</span>
                    <span className={`font-black uppercase text-xs ${modalSeat.status === 'booked_online' ? 'text-purple-600' : 'text-blue-600'}`}>
                      {modalSeat.status === 'booked_online' ? 'Booked Online' : 'Booked Offline'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Passenger Name</span>
                    <span className="font-bold text-gray-800">{modalSeat.bookingName || "Offline Group"}</span>
                  </div>
                  {modalSeat.phone && (
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-black uppercase text-[10px]">Phone Number</span>
                      <span className="font-bold text-gray-800">{modalSeat.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 px-4 border-2 rounded-2xl text-gray-700 font-bold hover:bg-gray-50 transition-all text-xs"
                  >
                    Close Window
                  </button>
                  {modalSeat.status === "booked_offline" && (
                    <button
                      onClick={handleReleaseSeat}
                      disabled={isSubmitting}
                      className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg transition-all text-xs flex justify-center items-center gap-1.5"
                    >
                      <Unlock className="w-4 h-4" /> {isSubmitting ? "Releasing..." : "Release Seat"}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
