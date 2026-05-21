import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { toast } from "react-toastify";
import AdminIteranary from "../components/Adminiteranary";

const BASE_URL = "https://api.sdtour.online";

/* ================= IMAGE SLIDER ================= */
const AdminImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));


  return (
    <div className="relative h-40 w-full overflow-hidden rounded-lg mb-3">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index] ? `${BASE_URL}${images[index]}` : "https://placehold.co/600x400?text=No+Image"}
          className="h-40 w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=No+Image";
          }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2
            bg-black/60 text-white p-1 rounded-full"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2
            bg-black/60 text-white p-1 rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
};

/* ================= HELPERS ================= */
const emptyForm = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  // price: "",
  days: "",
  nights: "",
  oldPrice: "",
  discount: "",
  location: "",
  images: null,
  includedTickets: [],
  ticketInput: "",
  totalSeats: 49,
  bookedSeats: 0
};

const formatInputDate = (d) =>
  d ? new Date(d).toISOString().split("T")[0] : "";

const daysNights = (s, e) => {
  const diff = Math.abs(new Date(e) - new Date(s));
  const days = Math.ceil(diff / 86400000) + 1;
  return `${days} Days / ${days - 1} Nights`;
};
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

/* ================= MAIN ================= */
const AdminGroupTour = () => {
  const [tours, setTours] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [createdTourId, setCreatedTourId] = useState(null);
  const [itineraryDays, setItineraryDays] = useState(0);
  const [modalStep, setModalStep] = useState("details"); // "details" | "itinerary"


  /* FETCH */
  const fetchTours = async () => {
    const res = await axios.get("https://api.sdtour.online/group-tours");
    setTours(res.data);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  /* ADD / UPDATE */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("startDate", form.startDate);
    fd.append("endDate", form.endDate);
    fd.append("days", form.days);
    fd.append("nights", form.nights);
    fd.append("location", form.location);
    fd.append("oldPrice", form.oldPrice);
    fd.append("discount", form.discount);
    fd.append("totalSeats", form.totalSeats !== undefined ? form.totalSeats : 49);
    fd.append("bookedSeats", form.bookedSeats !== undefined ? form.bookedSeats : 0);

    if (form.images) {
      Array.from(form.images).forEach((img) =>
        fd.append("images", img)
      );
    }

    if (form.includedTickets && form.includedTickets.length > 0) {
      form.includedTickets.forEach((t) => fd.append("includedTickets", t));
    }

    try {
      let res;

      if (editingId) {
        res = await axios.put(`${BASE_URL}/group-tours/${editingId}`, fd);
        toast.success("Group tour updated ✅");
        setOpen(false);
      } else {
        res = await axios.post(`${BASE_URL}/group-tours`, fd);
        toast.success("Group tour added 🎉");

        setCreatedTourId(res.data._id);
        setItineraryDays(Number(form.days));
        setModalStep("itinerary");
      }

      fetchTours();

    } catch (error) {
      console.error(error);
      toast.error("Operation failed ❌", { theme: "light" });
    } finally {
      setLoading(false);
    }
  };


  /* EDIT */
  const handleEdit = (tour) => {
    let calcDays = tour.days;
    let calcNights = tour.nights;
    if (!calcDays && tour.startDate && tour.endDate) {
       calcDays = Math.ceil(Math.abs(new Date(tour.endDate) - new Date(tour.startDate)) / 86400000) + 1;
       calcNights = calcDays - 1;
    }

    setForm({
      title: tour.title,
      description: tour.description,
      startDate: formatInputDate(tour.startDate),
      endDate: formatInputDate(tour.endDate),
      days: calcDays || "",
      nights: calcNights || "",
      oldPrice: tour.oldPrice,
      discount: tour.discount,
      location: tour.location,
      images: null,
      includedTickets: tour.includedTickets || [],
      totalSeats: tour.totalSeats !== undefined ? tour.totalSeats : 49,
      bookedSeats: tour.bookedSeats !== undefined ? tour.bookedSeats : 0
    });
    setEditingId(tour._id);
    setCreatedTourId(tour._id); // So itinerary knows which tour
    setItineraryDays(Number(calcDays) || 0);
    setModalStep("details");
    setOpen(true);
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour?")) return;
    await axios.delete(`https://api.sdtour.online/group-tours/${id}`);
    toast.info("Tour deleted 🗑️", { theme: "light" });
    fetchTours();
  };

  const calculateNewPrice = (oldPrice, discount) => {
    if (!discount) return oldPrice;
    return Math.round(oldPrice - (oldPrice * discount) / 100);
  };


  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#f4612b]">
          Group Tours
        </h1>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setOpen(true);
          }}
          className="bg-[#f4612b] text-white px-4 py-2 rounded-lg"
        >
          + Add Group Tour
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map((t) => (
          <div key={t._id} className="bg-white p-4 rounded-xl shadow">
            <AdminImageSlider images={t.images} />

            <h2 className="font-bold">{t.title}</h2>
            <p className="text-sm text-gray-600">{t.description}</p>
            <p className="text-sm mt-2">
              📅 {formatDate(t.startDate)} → {formatDate(t.endDate)}                     </p>
            <p className="text-sm mt-1">
              ⏱ {daysNights(t.startDate, t.endDate)}
            </p>
            {/* <p className="font-semibold text-[#f4612b]">₹ {t.price}</p> */}
            <p className="text-sm text-gray-500 mt-1">
              📍 {t.location}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="line-through text-gray-400 text-sm">
                ₹ {t.oldPrice}
              </span>

              <span className="text-lg font-bold text-[#f4612b]">
                ₹ {calculateNewPrice(t.oldPrice, t.discount)}
              </span>

              {t.discount > 0 && (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  {t.discount}% OFF
                </span>
              )}
            </div>
            
            {/* SEATS INFO CARD */}
            <div className="mt-2.5 bg-orange-50 border border-orange-100 rounded-lg p-2.5 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Total Seats:</span>
                <span className="font-bold text-gray-700">{t.totalSeats || 49}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Booked Seats:</span>
                <span className="font-bold text-orange-600">{t.bookedSeats || 0}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-orange-200 pt-1 mt-1 font-semibold">
                <span className="text-gray-600">Available Seats:</span>
                <span className={`font-bold ${(t.totalSeats || 49) - (t.bookedSeats || 0) <= 5 ? "text-red-500" : "text-green-600"}`}>
                  {(t.totalSeats || 49) - (t.bookedSeats || 0)} left
                </span>
              </div>
            </div>



            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleEdit(t)}
                className="bg-blue-50 text-blue-600 flex-1 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
              >
                <Edit size={16} /> Edit Tour
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                aria-label="Delete tour"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50
                       flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="bg-white w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-2 border-b">
                <div className="flex gap-4">
                   <button 
                     onClick={() => setModalStep("details")}
                     className={`text-lg font-bold transition-colors ${modalStep === "details" ? "text-[#f4612b]" : "text-gray-400 hover:text-gray-600"}`}
                   >
                     {editingId ? "Edit Tour" : "Add Tour"}
                   </button>
                   { (editingId || createdTourId) && (
                     <button 
                       onClick={() => setModalStep("itinerary")}
                       className={`text-lg font-bold transition-colors ${modalStep === "itinerary" ? "text-[#f4612b]" : "text-gray-400 hover:text-gray-600"}`}
                     >
                       Manage Itinerary
                     </button>
                   )}
                </div>
                <X
                  className="cursor-pointer hover:text-red-500 transition-colors"
                  onClick={() => {
                    setOpen(false);
                    setForm(emptyForm);
                    setEditingId(null);
                    setCreatedTourId(null);
                    setModalStep("details");
                  }}
                />
              </div>

              {modalStep === "details" ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded"
                />

                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Days"
                    value={form.days}
                    onChange={(e) =>
                      setForm({ ...form, days: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />

                  <input
                    type="number"
                    placeholder="Nights"
                    value={form.nights}
                    onChange={(e) =>
                      setForm({ ...form, nights: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                </div>


                {/* <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded"
                /> */}
                <input
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Old Price"
                  value={form.oldPrice}
                  onChange={(e) =>
                    setForm({ ...form, oldPrice: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Discount (%)"
                  value={form.discount}
                  onChange={(e) =>
                    setForm({ ...form, discount: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 font-bold block mb-1">Total Seats</label>
                    <input
                      type="number"
                      placeholder="Total Seats (Default 49)"
                      value={form.totalSeats !== undefined ? form.totalSeats : 49}
                      onChange={(e) =>
                        setForm({ ...form, totalSeats: Number(e.target.value) })
                      }
                      required
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-bold block mb-1">Booked Seats</label>
                    <input
                      type="number"
                      placeholder="Booked Seats (Default 0)"
                      value={form.bookedSeats !== undefined ? form.bookedSeats : 0}
                      onChange={(e) =>
                        setForm({ ...form, bookedSeats: Number(e.target.value) })
                      }
                      required
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>

                <input type="file" multiple
                  onChange={(e) => setForm({ ...form, images: e.target.files })}
                  className="w-full border p-2 rounded"
                />

                {/* 🔥 INCLUDED TICKETS SECTION */}
                <div className="border p-3 rounded-lg bg-gray-50">
                  <label className="text-sm font-bold text-[#f4612b] block mb-2">Included Tickets</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      placeholder="e.g. Sasan Safari Ticket"
                      value={form.ticketInput || ""}
                      onChange={(e) => setForm({ ...form, ticketInput: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (form.ticketInput?.trim()) {
                            const newTickets = [...(form.includedTickets || []), form.ticketInput.trim()];
                            setForm({ ...form, includedTickets: newTickets, ticketInput: "" });
                          }
                        }
                      }}
                      className="flex-1 border p-2 rounded-lg text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (form.ticketInput?.trim()) {
                          const newTickets = [...(form.includedTickets || []), form.ticketInput.trim()];
                          setForm({ ...form, includedTickets: newTickets, ticketInput: "" });
                        }
                      }}
                      className="bg-[#f4612b] text-white px-3 rounded-lg text-sm"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(form.includedTickets || []).map((t, idx) => (
                      <span key={idx} className="bg-white border border-[#f4612b] text-[#f4612b] px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        {t}
                        <X size={12} className="cursor-pointer" onClick={() => {
                          const newer = form.includedTickets.filter((_, i) => i !== idx);
                          setForm({ ...form, includedTickets: newer });
                        }} />
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-[#f4612b] text-white py-2
                             rounded-lg font-semibold"
                >
                  {loading ? "Saving..." : "Save Tour"}
                </button>
              </form>
              ) : (
                <AdminIteranary
                  tourId={createdTourId}
                  totalDays={itineraryDays}
                  type="group"
                  onClose={() => {
                    setOpen(false);
                    setForm(emptyForm);
                    setEditingId(null);
                    setCreatedTourId(null);
                    setModalStep("details");
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGroupTour; 
