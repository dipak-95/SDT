const cities = [
  "all",
  "ahmedabad",
  "sasangir",
  "vadodara",
  "junagadh",
  "dwarka",
  "somnath"
];

export default function CityFilter({ selectedCity, setSelectedCity }) {
  return (
    <div className="flex flex-wrap gap-3">
      {cities.map(city => (
        <button
          key={city}
          onClick={() => setSelectedCity(city)}
          className={`px-4 py-2 rounded-lg font-medium transition
            ${
              selectedCity === city
                ? "bg-[#F4612B] text-white"
                : "bg-white border border-[#F4612B] text-[#F4612B]"
            }
          `}
        >
          {city.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
