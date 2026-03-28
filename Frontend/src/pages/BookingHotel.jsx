import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Baby, BedDouble, CalendarDays, CheckCircle2,
  Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = "https://api.sdtour.online";

/* ───── helpers ───── */
function bedsPerRoom(type) {
  const t = type?.toLowerCase() || "";
  if (t.includes("4")) return 4;
  if (t.includes("3")) return 3;
  if (t.includes("2")) return 2;
  return 1;
}

function buildSuggestions(rooms, adults) {
  if (!rooms?.length || !adults) return [];

  // Build unique room types with capacity
  const types = rooms
    .map(r => ({ room: r, cap: bedsPerRoom(r.type) }))
    .filter(t => t.cap >= 1);

  if (!types.length) return [];

  const results = [];
  const seen = new Set();

  // DFS / backtracking to generate ALL combinations
  function dfs(idx, counts, totalCap) {
    // pruning: no point going beyond 3× adults capacity
    if (totalCap > adults * 3) return;

    if (idx === types.length) {
      if (totalCap < adults) return; // can't cover all guests
      const parts = counts
        .map((n, i) => n > 0 ? { room: types[i].room, count: n, cap: types[i].cap } : null)
        .filter(Boolean);
      if (!parts.length) return;
      // dedupe key sorted by room type
      const key = parts.map(p => `${p.room.type}×${p.count}`).sort().join("|");
      if (!seen.has(key)) {
        seen.add(key);
        results.push({ parts, waste: totalCap - adults, totalCapacity: totalCap });
      }
      return;
    }

    const remaining = adults - totalCap;
    // try 0 rooms up to the minimum needed to cover remaining guests (+ 1 for slight overfit)
    const maxN = Math.max(0, Math.ceil(remaining / types[idx].cap)) + 1;

    for (let n = 0; n <= maxN; n++) {
      counts[idx] = n;
      dfs(idx + 1, counts, totalCap + n * types[idx].cap);
    }
    counts[idx] = 0;
  }

  dfs(0, new Array(types.length).fill(0), 0);

  if (!results.length) return [];

  // Prefer exact fits (waste === 0); fallback to min-waste
  const exactFits = results.filter(r => r.waste === 0);
  const minWaste = results.reduce((m, r) => Math.min(m, r.waste), Infinity);
  const valid = exactFits.length > 0
    ? exactFits
    : results.filter(r => r.waste === minWaste);

  // Sort: fewest total rooms first, then by waste
  return valid
    .sort((a, b) => {
      const ra = a.parts.reduce((s, p) => s + p.count, 0);
      const rb = b.parts.reduce((s, p) => s + p.count, 0);
      return ra - rb || a.waste - b.waste;
    })
    .map(opt => ({
      parts: opt.parts,                                            // [{room, count, cap}]
      primaryRoom: opt.parts[0].room,                              // for price ref
      totalRooms: opt.parts.reduce((s, p) => s + p.count, 0),
      waste: opt.waste,
      totalCapacity: opt.totalCapacity,
      label: opt.parts.map(p => `${p.room.type} × ${p.count}`).join(" + "),
      desc: opt.waste > 0
        ? `Covers ${opt.totalCapacity} guests (${opt.waste} extra spot${opt.waste > 1 ? "s" : ""})`
        : `Perfect fit for ${adults} guests`
    }));
}

/* ───── counter ───── */
function Counter({ label, icon: Icon, value, onChange, min = 0 }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
      <div className="flex items-center gap-2 text-gray-700 font-semibold">
        <Icon size={18} className="text-[#F4612B]" />
        {label}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:border-[#F4612B] hover:text-[#F4612B] transition active:scale-95"
        >
          <Minus size={14} />
        </button>
        <span className="w-6 text-center font-bold text-gray-900">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F4612B] text-white hover:bg-[#e65a0f] transition active:scale-95"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

/* ───── MINI CALENDAR ───── */
const MONTHS = ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];
const DAYS  = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function MiniCalendar({ selected, onSelect, disabledBefore, bookedDates = [], getTotalPerNight, label, onViewChange }) {
  const initDate = selected || disabledBefore || new Date();
  const [view, setView] = useState(new Date(initDate.getFullYear(), initDate.getMonth(), 1));
  const year  = view.getFullYear();
  const month = view.getMonth();

  useEffect(() => {
    if (onViewChange) onViewChange(view);
  }, [view, onViewChange]);

  const today      = new Date(); today.setHours(0,0,0,0);
  const bookedSet  = new Set(bookedDates.map(d => d.toDateString()));
  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMon  = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMon }, (_, i) => i + 1)
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
      {/* ── header ── */}
      <div className="bg-gradient-to-r from-[#F4612B] to-orange-400 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-orange-100 text-[11px] font-semibold uppercase tracking-widest flex items-center gap-1">
            <CalendarDays size={12} /> {label}
          </p>
          <p className="text-white font-bold text-base mt-0.5">
            {selected ? selected.toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : "Not selected"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setView(new Date(year, month-1, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white transition active:scale-90">
            <ChevronLeft size={16}/>
          </button>
          <span className="text-white font-bold text-sm px-2 min-w-[110px] text-center">
            {MONTHS[month]} {year}
          </span>
          <button type="button" onClick={() => setView(new Date(year, month+1, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white transition active:scale-90">
            <ChevronRight size={16}/>
          </button>
        </div>
      </div>

      {/* ── day names ── */}
      <div className="grid grid-cols-7 bg-orange-50 border-b border-orange-100">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-orange-400 uppercase py-2">{d}</div>
        ))}
      </div>

      {/* ── cells ── */}
      <div className="grid grid-cols-7 gap-0 p-3">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />;
          const date = new Date(year, month, day);
          date.setHours(0,0,0,0);
          const disabled  = date < today || (disabledBefore && date < disabledBefore) || bookedSet.has(date.toDateString());
          const isSel     = selected && date.toDateString() === selected.toDateString();
          const isToday   = date.toDateString() === today.toDateString();
          const nightPx   = getTotalPerNight ? getTotalPerNight(date) : 0;

          return (
            <button
              key={day} type="button" disabled={disabled}
              onClick={() => !disabled && onSelect(date)}
              className={`relative flex flex-col items-center justify-center h-11 rounded-xl mx-0.5 my-0.5 transition-all text-xs font-semibold
                ${ isSel
                    ? "bg-[#F4612B] text-white shadow-md shadow-orange-200 scale-105"
                    : disabled
                      ? "text-gray-200 cursor-not-allowed"
                      : isToday
                        ? "bg-orange-50 text-[#F4612B] ring-1 ring-orange-300"
                        : "hover:bg-orange-50 text-gray-700 hover:text-[#F4612B]"
                }`}
            >
              <span>{day}</span>
              {nightPx > 0 && !disabled && (
                <span className={`text-[8px] leading-none font-semibold ${ isSel ? "text-orange-100" : "text-[#F4612B]"}`}>
                  {nightPx >= 1000 ? `₹${(nightPx/1000).toFixed(1)}k` : `₹${nightPx}`}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───── main ───── */
export default function BookingHotel() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const hotel = state?.hotel;

  /* guest fields */
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  /* selected room option */
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  /* price / availability */
  const [calView, setCalView] = useState(selectedSuggestion || new Date());
  const [priceMaps, setPriceMaps] = useState({}); // { roomType: { dateString: price } }
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* redirect if no hotel */
  useEffect(() => {
    if (!hotel) navigate("/hotels");
  }, [hotel, navigate]);

  /* fetch booked dates + prices for ALL room types in selected combo */
  useEffect(() => {
    if (!hotel?._id || !selectedSuggestion?.parts) return;

    // booked dates from primary room
    axios
      .get(`${API_BASE}/hotels/calendar`, {
        params: { hotelId: hotel._id, roomType: selectedSuggestion.primaryRoom.type }
      })
      .then(res => setBookedDates(res.data.map(d => new Date(d))))
      .catch(() => {});

    // Fetch price maps for EVERY room type in the combo for the VISIBLE month
    const uniqueTypes = [...new Set(selectedSuggestion.parts.map(p => p.room.type))];

    Promise.all(
      uniqueTypes.map(roomType =>
        axios
          .get(`${API_BASE}/hotels/month-prices`, {
            params: {
              hotelId: hotel._id,
              roomType,
              month: calView.getMonth() + 1,
              year: calView.getFullYear()
            }
          })
          .then(res => {
            const map = {};
            (res.data || []).forEach(p => {
              map[new Date(p.date).toDateString()] = Number(p.price);
            });
            return { roomType, map };
          })
          .catch(() => ({ roomType, map: {} }))
      )
    ).then(results => {
      setPriceMaps(prev => {
        const next = { ...prev };
        results.forEach(({ roomType, map }) => {
          next[roomType] = { ...(next[roomType] || {}), ...map };
        });
        return next;
      });
    });
  }, [hotel?._id, selectedSuggestion, calView]);

  /* suggestions */
  const suggestions = useMemo(
    () => buildSuggestions(hotel?.rooms || [], adults),
    [hotel?.rooms, adults]
  );

  /* combined price for a date across ALL parts in the combo */
  const getTotalPerNight = (date) => {
    if (!selectedSuggestion?.parts) return 0;
    return selectedSuggestion.parts.reduce((sum, part) => {
      const map = priceMaps[part.room.type] || {};
      const pricePerRoom = map[date.toDateString()] ?? part.room?.price ?? 0;
      return sum + pricePerRoom * part.count;
    }, 0);
  };

  /* total */
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, (checkOut - checkIn) / 86400000);
  }, [checkIn, checkOut]);

  const totalAmount = useMemo(() => {
    if (!checkIn || !checkOut || !selectedSuggestion) return 0;
    let sum = 0;
    let d = new Date(checkIn);
    while (d < checkOut) {
      sum += getTotalPerNight(d);
      d.setDate(d.getDate() + 1);
    }
    return sum;   // no extra multiply – getTotalPerNight already accounts for room count
  }, [checkIn, checkOut, selectedSuggestion, priceMaps]);

  const disabledDays = [{ before: new Date() }, ...bookedDates];

  /* submit */
  const handleSubmit = async () => {
    if (!form.name || !form.phone) return toast.error("Name and Phone are required");
    if (!checkIn || !checkOut) return toast.error("Please select check-in & check-out dates");
    if (!selectedSuggestion) return toast.error("Please select a room option");

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/bookings/create`, {
        hotelId: hotel._id,
        // primary room for booking slot tracking
        roomType: selectedSuggestion.primaryRoom.type,
        roomsBooked: selectedSuggestion.totalRooms,
        // full combo description for admin visibility
        roomCombo: selectedSuggestion.label,
        checkIn,
        checkOut,
        adults,
        children,
        totalAmount,
        user: { name: form.name, email: form.email, phone: form.phone }
      });
      setSubmitted(true);
      toast.success("Enquiry sent! Our team will contact you soon.");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) return null;

  const images = hotel.images?.length > 0
    ? hotel.images.map(img => `${API_BASE}${img}`)
    : ["/BookHotel.webp"];

  /* ── SUCCESS SCREEN ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Submitted!</h2>
          <p className="text-gray-500 mb-6">
            Thank you <b>{form.name}</b>! Our team will contact you at{" "}
            <b>{form.phone}</b> within 3 hours.
          </p>
          <button
            onClick={() => navigate("/hotels")}
            className="w-full py-3 bg-[#F4612B] text-white font-bold rounded-xl hover:bg-[#e65a0f] transition"
          >
            Back to Hotels
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 overflow-x-hidden"
    >
      {/* ── HERO ── */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <img src={images[0]} alt={hotel.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 py-8">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 text-white">
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-wide mb-1">
              Hotel Enquiry
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold">{hotel.name}</h1>
            <p className="flex items-center gap-1 mt-2 text-gray-200 text-sm">
              <MapPin size={14} className="text-orange-400" />
              {hotel.location || hotel.city}
            </p>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* ── STEP 1: GUEST DETAILS ── */}
        <Section number="1" title="Your Details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field
              placeholder="Full Name *"
              value={form.name}
              onChange={v => setForm({ ...form, name: v })}
            />
            <Field
              placeholder="Phone Number *"
              type="tel"
              value={form.phone}
              onChange={v => setForm({ ...form, phone: v })}
            />
            <Field
              placeholder="Email (optional)"
              type="email"
              value={form.email}
              onChange={v => setForm({ ...form, email: v })}
            />
          </div>
        </Section>

        {/* ── STEP 2: GUESTS ── */}
        <Section number="2" title="Number of Guests">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Counter
              label="Adults"
              icon={Users}
              value={adults}
              onChange={v => { setAdults(v); setSelectedSuggestion(null); }}
              min={1}
            />
            <Counter
              label="Children"
              icon={Baby}
              value={children}
              onChange={setChildren}
              min={0}
            />
          </div>
        </Section>

        {/* ── STEP 3: ROOM OPTIONS (smart suggestions) ── */}
        <Section number="3" title="Choose Room Option">
          {suggestions.length === 0 ? (
            <p className="text-gray-400 italic text-sm text-center py-4">
              No room options available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestions.map((s, i) => (
                <motion.button
                  key={i}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedSuggestion(s);
                    setCheckIn(null);
                    setCheckOut(null);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedSuggestion?.label === s.label
                      ? "border-[#F4612B] bg-orange-50 shadow-md shadow-orange-100"
                      : "border-gray-200 bg-white hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <BedDouble
                      size={26}
                      className={selectedSuggestion?.label === s.label ? "text-[#F4612B]" : "text-gray-400"}
                    />
                    {selectedSuggestion?.label === s.label && (
                      <CheckCircle2 size={20} className="text-[#F4612B] mt-0.5" />
                    )}
                  </div>
                  <p className="mt-3 font-bold text-gray-900 text-lg capitalize">{s.label}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{s.desc}</p>
                </motion.button>
              ))}
            </div>
          )}
        </Section>

        {/* ── STEP 4: DATES (only if room selected) ── */}
        <AnimatePresence>
          {selectedSuggestion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Section number="4" title="Select Dates">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MiniCalendar
                    label="Check-In"
                    selected={checkIn}
                    onSelect={d => { setCheckIn(d); setCheckOut(null); }}
                    disabledBefore={new Date()}
                    bookedDates={bookedDates}
                    getTotalPerNight={getTotalPerNight}
                    onViewChange={setCalView}
                  />
                  <MiniCalendar
                    label="Check-Out"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabledBefore={checkIn
                      ? new Date(checkIn.getTime() + 86400000)   // strictly after check-in
                      : new Date(Date.now() + 86400000)
                    }
                    bookedDates={bookedDates}
                    getTotalPerNight={getTotalPerNight}
                    onViewChange={setCalView}
                  />
                </div>
              </Section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOOKING SUMMARY + SUBMIT ── */}
        <AnimatePresence>
          {selectedSuggestion && checkIn && checkOut && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-900">Booking Summary</h3>

              <div className="space-y-2 text-sm text-gray-600">
                <Row label="Hotel" value={hotel.name} />
                <Row label="Room" value={selectedSuggestion.label} />
                <Row
                  label="Guests"
                  value={`${adults} Adults${children > 0 ? `, ${children} Children` : ""}`}
                />
                <Row label="Check-In" value={checkIn.toDateString()} />
                <Row label="Check-Out" value={checkOut.toDateString()} />
                <Row label="Nights" value={nights} />
              </div>

              {/* date-wise price breakdown – per room type */}
              <div className="max-h-44 overflow-y-auto space-y-2 border-t pt-3 text-sm">
                {(() => {
                  let d = new Date(checkIn);
                  const rows = [];
                  while (d < checkOut) {
                    const dateStr = d.toDateString();
                    const parts = selectedSuggestion.parts.map(part => {
                      const map = priceMaps[part.room.type] || {};
                      const pricePerRoom = map[dateStr] ?? part.room?.price ?? 0;
                      return { label: `${part.room.type} × ${part.count}`, subtotal: pricePerRoom * part.count };
                    });
                    const nightTotal = parts.reduce((s, p) => s + p.subtotal, 0);

                    rows.push(
                      <div key={dateStr} className="border border-gray-100 rounded-xl p-3 space-y-1 bg-gray-50">
                        <div className="flex justify-between text-gray-600 font-semibold">
                          <span>{dateStr}</span>
                          <span className="text-[#F4612B]">₹{nightTotal.toLocaleString()}</span>
                        </div>
                        {parts.map(p => (
                          <div key={p.label} className="flex justify-between text-gray-400 text-xs pl-2">
                            <span>{p.label}</span>
                            <span>₹{p.subtotal.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    );
                    d.setDate(d.getDate() + 1);
                  }
                  return rows;
                })()}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-orange-200 text-lg font-bold text-[#F4612B]">
                <span>Total Estimate</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-[#F4612B] text-white text-base font-bold rounded-2xl
                           hover:bg-[#e65a0f] active:scale-[0.98] transition-all
                           shadow-lg shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Enquiry 🏨"}
              </button>

              <p className="text-center text-xs text-gray-400">
                Our team will contact you within 3 hours to confirm your booking.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}

/* ─── small helpers ─── */
function Section({ number, title, children }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-5">
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 flex items-center justify-center bg-[#F4612B] text-white text-sm font-bold rounded-full">
          {number}
        </span>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({ placeholder, type = "text", value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                 focus:outline-none focus:ring-2 focus:ring-[#F4612B] focus:border-transparent
                 bg-gray-50 placeholder-gray-400 transition"
    />
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold text-gray-800 capitalize">{value}</span>
    </div>
  );
}
