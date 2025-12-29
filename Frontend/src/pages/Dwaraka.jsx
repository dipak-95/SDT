import DestinationCity from "../component/DestinationCity";

export default function Dwaraka() {
  const places = [
    /* ---------------------- 1. Dwarkadhish Temple ---------------------- */
    {
      name: "Dwarkadhish Temple",
      img: "/Dwarkamandir.webp",
      rating: "4.9 / 5",
      timings: "6:00 AM – 1:00 PM, 5:00 PM – 9:30 PM",
      season: "October – March (Best weather)",
      entry: "Free Entry",

      desc: [
        "Dwarkadhish Temple is one of the four major Char Dham pilgrimage sites.",
        "Dedicated to Lord Krishna, the temple is known for its ancient architecture.",
        "The 5-storied structure is supported by 72 beautifully carved pillars.",
        "Morning and evening Aarti attract thousands of devotees every day.",
        "The temple offers a peaceful and spiritual atmosphere perfect for meditation.",
        "The main shrine houses the idol of Lord Krishna known as Dwarkadhish.",
        "Photography is not allowed inside the temple premises.",
        "Special festivals like Janmashtami and Holi are celebrated with great energy.",
        "The temple is located close to Gomti Ghat.",
        "It is believed to be more than 2500 years old.",
        "The temple flag is changed five times a day.",
        "A must-visit for spiritual seekers and history lovers.",
      ]
    },

    /* ---------------------- 2. Rukmini Devi Temple ---------------------- */
    {
      name: "Rukmini Devi Temple",
      img: "/rukhmnimandir.webp",
      rating: "4.7 / 5",
      timings: "6:00 AM – 6:00 PM",
      season: "October – February",
      entry: "Free Entry",

      desc: [
        "Rukmini Devi Temple is dedicated to Goddess Rukmini, the wife of Lord Krishna.",
        "The temple showcases stunning carvings and ancient architectural designs.",
        "It is located 2 km away from the main Dwarkadhish Temple.",
        "The idol of Goddess Rukmini is carved beautifully in marble.",
        "Priests explain mythological stories associated with Krishna & Rukmini.",
        "The temple is believed to be almost 2500 years old.",
        "It is a peaceful and spiritually uplifting location.",
        "Visitors can enjoy quiet surroundings compared to busy temple areas.",
        "The temple architecture reflects Nagara-style influences.",
        "Festivals like Navratri are celebrated with devotion.",
      ]
    },

    /* ---------------------- 3. Gomti Ghat ---------------------- */
    {
      name: "Gomti Ghat",
      img: "/GomtiGhat.webp",
      rating: "4.6 / 5",
      timings: "Open 24 Hours",
      season: "December – February",
      entry: "Free Entry",

      desc: [
        "Gomti Ghat is a sacred riverbank located near the Dwarkadhish Temple.",
        "Pilgrims take ritual baths in the holy Gomti River.",
        "Boat rides are available for tourists to enjoy scenic views.",
        "The ghat is lined with small temples and shrines.",
        "Aarti rituals happen during the evening creating a serene atmosphere.",
        "Bird feeding is also common during the early morning.",
        "The river connects to the Arabian Sea, offering great photography spots.",
        "Camel rides and small shops are present near the ghat.",
        "A perfect place for visitors who enjoy culture and spirituality.",
      ]
    },

    /* ---------------------- 4. Bhadkeshwar Mahadev Temple ---------------------- */
    {
      name: "Bhadkeshwar Mahadev Temple",
      img: "/BhadkeshwarMahadevTemple.webp",
      rating: "4.8 / 5",
      timings: "6:00 AM – 7:00 PM",
      season: "October – March",
      entry: "Free Entry",

      desc: [
        "Bhadkeshwar Mahadev Temple is located on a small hill surrounded by the sea.",
        "During high tide, the sea water touches the steps of the temple.",
        "This temple is dedicated to Lord Shiva and offers peaceful surroundings.",
        "Evening views are breathtaking with strong sea winds.",
        "Aarti performed during Shravan month is very famous.",
        "A scenic walkway leads to the temple, making it a joyful visit.",
        "Sunset views from here attract many tourists and photographers.",
        "The temple becomes fully surrounded by water during monsoon.",
      ]
    }
  ];

  return (
    <DestinationCity
      cityName="Dwarka"
      places={places}
    //   heroImg="/dwarka/hero.webp"  // ⭐ Your custom hero image for Dwarka
    />
  );
}
