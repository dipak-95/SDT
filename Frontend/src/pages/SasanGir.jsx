import DestinationCity from "../component/DestinationCity";

export default function SasanGir() {
  const places = [
    /* ---------------------- 1. Jungle Safari ---------------------- */
    {
      name: "Gir Jungle Safari",
      img: "/junglesafari.webp",
      rating: "4.9 / 5",
      timings: "6:00 AM – 12:00 PM, 3:00 PM – 6:00 PM",
      season: "December – March (Peak wildlife sightings)",
      entry: "₹1000 – ₹5000 (depends on jeep & permit)",

      desc: [
        "The Gir Jungle Safari is the highlight of Sasan Gir, known for being the only natural habitat of Asiatic Lions.",
        "Visitors can experience a thrilling jeep safari deep into the forest.",
        "The safari is guided by trained forest officials who ensure safety and provide wildlife information.",
        "You can spot lions, leopards, deer, crocodiles, hyenas, and various bird species.",
        "Photography enthusiasts love the early morning safari due to perfect light conditions.",
        "Pre-booking is highly recommended during weekends and holidays.",
        "The safari zone is divided into different routes to manage crowd and wildlife protection.",
        "The dense forest, dry grasslands, and open plains create a cinematic experience.",
        "You may also witness lion pride resting or hunting during early hours.",
        "The safari duration is approximately 2–3 hours.",
        "Gir National Park also has interpretation zones for educational tours.",
        "A must-visit for wildlife lovers, families, and adventurers.",
      ]
    },

    /* ---------------------- 2. Shiv Villa Resort ---------------------- */
    {
      name: "Shiv Villa Resort – Sasan Gir",
      img: "/shivVillaresort.webp",
      rating: "4.8 / 5",
      timings: "Check-in: 12 PM | Check-out: 10 AM",
      season: "Ideal all around the year",
      entry: "Stay Packages From ₹2500 / Night",

      desc: [
        "Shiv Villa Resort is one of the most popular resorts in Sasan Gir for families and groups.",
        "The resort features comfortable rooms, cottages, and nature-surrounded ambiance.",
        "They offer a refreshing swimming pool where guests enjoy pool parties.",
        "Evening time includes vibrant disco bar nights with high-energy music.",
        "The highlight attraction is the world-famous Gir 'Dhamal Dance' performed during weekends.",
        "The resort is located close to the Gir Jungle Safari entry gate.",
        "Delicious local Gujarati cuisine is served in the in-house restaurant.",
        "The resort is kids-friendly with play areas and outdoor activities.",
        "Guests enjoy bonfire nights in the winter season.",
        "Rooms are spacious with garden views and modern facilities.",
        "Perfect for couples, groups, corporate outings, and family trips.",
        "Shiv Villa Resort offers a memorable blend of culture, fun, and wildlife.",
      ]
    }
  ];

  return (
    <DestinationCity
      cityName="Sasan Gir"
      places={places}
    //   heroImg="/sasangir/hero.webp"  // ⭐ Custom hero image for Sasan Gir
    />
  );
}
