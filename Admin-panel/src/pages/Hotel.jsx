import { useEffect, useState } from "react";
import axios from "axios";
import CityFilter from "../components/CityFilters";
import HotelCard from "../components/HotelCards";
import HotelFormModal from "../components/HotelFormModel";

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [selectedCity, setSelectedCity] = useState("all");
  const [openForm, setOpenForm] = useState(false);
  const [editHotel, setEditHotel] = useState(null);

  const fetchHotels = async () => {
    const res = await axios.get("https://sdt-7.onrender.com/hotels");
    setHotels(res.data);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  /* 🔥 FILTER LOGIC */
  const filteredHotels =
    selectedCity === "all"
      ? hotels
      : hotels.filter(hotel => hotel.city === selectedCity);

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <CityFilter
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />

        <button
          onClick={() => setOpenForm(true)}
          className="bg-[#F4612B] text-white px-5 py-2 rounded-lg"
        >
          + Add Hotel
        </button>
      </div>

      {/* HOTEL CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredHotels.map(hotel => (
          <HotelCard
            key={hotel._id}
            hotel={hotel}
            refresh={fetchHotels}
            onEdit={() => {
              setEditHotel(hotel);
              setOpenForm(true);
            }}
          />
        ))}
      </div>

      {/* MODAL */}
      {openForm && (
        <HotelFormModal
          close={() => {
            setOpenForm(false);
            setEditHotel(null);
          }}
          editData={editHotel}
          refresh={fetchHotels}
        />
      )}
    </div>
  );
}
