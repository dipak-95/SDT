import axios from "axios";

const AddGroupItinerary = ({ tourId }) => {
  const [days, setDays] = useState([
    { title: "", stay: "", points: "", images: [] }
  ]);

  /* ADD NEW DAY */
  const addDay = () => {
    setDays([
      ...days,
      { title: "", stay: "", points: "", images: [] }
    ]);
  };

  /* UPDATE DAY FIELD */
  const updateDay = (index, key, value) => {
    const updated = [...days];
    updated[index][key] = value;
    setDays(updated);
  };

  /* SAVE ITINERARY */
  const saveItinerary = async () => {
    const formData = new FormData();

    const itineraryPayload = days.map((day, index) => ({
      day: index + 1,
      title: day.title,
      stay: day.stay, // ✅ HOTEL SAVED
      points: day.points.split("\n")
    }));

    formData.append("tourId", tourId);
    formData.append(
      "itinerary",
      JSON.stringify(itineraryPayload)
    );

    // images
    days.forEach((day, index) => {
      Array.from(day.images || []).forEach((file) => {
        formData.append(`images_${index + 1}`, file);
      });
    });

    await axios.post(
      "http://72.62.195.222:7345/group-tours/itinerary",
      formData
    );

    alert("Itinerary saved successfully");
  };

  return (
    <div className="space-y-6">
      {days.map((day, index) => (
        <div
          key={index}
          className="border rounded-xl p-4 space-y-3 bg-white"
        >
          <h3 className="font-semibold text-orange-600">
            Day {index + 1}
          </h3>

          {/* DAY TITLE */}
          <input
            className="w-full border p-2 rounded"
            placeholder="Day Title"
            value={day.title}
            onChange={(e) =>
              updateDay(index, "title", e.target.value)
            }
          />

          {/* 🏨 HOTEL / STAY (THIS IS WHAT YOU WANTED) */}
          <input
            className="w-full border p-2 rounded"
            placeholder="Hotel / Stay (e.g. Hotel Somnath Inn)"
            value={day.stay}
            onChange={(e) =>
              updateDay(index, "stay", e.target.value)
            }
          />

          {/* POINTS */}
          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            placeholder="Points (one per line)"
            value={day.points}
            onChange={(e) =>
              updateDay(index, "points", e.target.value)
            }
          />

          {/* IMAGES */}
          <input
            type="file"
            multiple
            onChange={(e) =>
              updateDay(index, "images", e.target.files)
            }
          />
        </div>
      ))}

      <div className="flex gap-4">
        <button
          onClick={addDay}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          + Add Day
        </button>

        <button
          onClick={saveItinerary}
          className="px-6 py-2 bg-green-600 text-white rounded"
        >
          Save Itinerary
        </button>
      </div>
    </div>
  );
};

export default AddGroupItinerary;

