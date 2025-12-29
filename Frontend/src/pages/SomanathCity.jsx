import DestinationCity from "../component/DestinationCity";

export default function SomnathCity() {
  const places = [

    /* ------------------ 1. Somnath Temple ------------------ */
    {
      name: "Somnath Temple",
      img: "/SomanathTemple.webp",
      rating: "5.0 / 5",
      timings: "6:00 AM – 10:00 PM",
      season: "October – March",
      entry: "Free Entry",

      desc: [
        "Somnath Temple is one of the 12 Jyotirlingas and a sacred pilgrimage site of India.",
        "The temple stands majestically on the shores of the Arabian Sea.",
        "It is known for its rich history and spiritual significance spanning thousands of years.",
        "The famous ‘Aarti’ and sound & light show attract thousands of visitors daily.",
        "The temple's intricate carvings and architecture showcase ancient craftsmanship.",
        "The sea waves constantly hitting the temple boundary create a divine atmosphere.",
        "Devotees from all over the world visit Somnath for blessings and peace.",
        "Security arrangements and queues are very well maintained for visitors.",
        "Photography is not allowed inside, preserving its spiritual ambiance.",
        "The temple complex is clean, spacious, and beautifully maintained.",
        "Evening aarti and night view of the temple are must-see experiences.",
        "A truly divine and unforgettable place for all devotees."
      ]
    },

    /* ------------------ 2. Ram Temple Somnath ------------------ */
    {
      name: "Ram Temple (Somnath Pran Pratishtha Area)",
      img: "/RamMandirSomnath.webp",
      rating: "4.9 / 5",
      timings: "7:00 AM – 9:00 PM",
      season: "October – March",
      entry: "Free Entry",

      desc: [
        "Ram Temple near Somnath holds great mythological significance connected to Lord Rama’s journey.",
        "The temple architecture is inspired by classical Indian stone craftsmanship.",
        "The surrounding gardens and peaceful atmosphere make it ideal for meditation.",
        "Devotees visit to experience spiritual calmness and blessings of Lord Ram.",
        "The temple is built in a pure traditional style with detailed carvings.",
        "Many visitors include this temple as part of their Somnath pilgrimage circuit.",
        "The temple area is surrounded by clean walkways and greenery.",
        "Evening arti adds a divine charm to the environment.",
        "A perfect place for peaceful prayers and family visits.",
        "The air feels spiritually uplifting throughout the temple area.",
        "It reflects cultural values and devotion toward Lord Rama.",
        "A serene spiritual spot near Somnath Temple."
      ]
    },

    /* ------------------ 3. Bhalka Tirth Temple ------------------ */
    {
      name: "Bhalka Tirth Temple",
      img: "/bhalkamandir.webp",
      rating: "4.8 / 5",
      timings: "6:00 AM – 8:00 PM",
      season: "July – March",
      entry: "Free Entry",

      desc: [
        "Bhalka Tirth is the sacred place where Lord Krishna was struck by the hunter Jara.",
        "The temple symbolizes the final moments of Lord Krishna’s earthly presence.",
        "The peaceful garden and temple area allow devotees to sit and pray calmly.",
        "The idol of Lord Krishna lying under a tree is a major attraction.",
        "Visitors experience a deep spiritual connection at this divine location.",
        "The environment is peaceful with greenery and clean surroundings.",
        "A must-visit spot for those exploring Krishna’s life journey.",
        "The temple holds strong mythological importance in Hindu scriptures.",
        "Easy accessibility and peaceful atmosphere make it ideal for families.",
        "Many pilgrims continue their journey from here to Somnath Temple.",
        "The place beautifully depicts the final chapter of Krishna’s avatar.",
        "A spiritually enriching experience for every visitor."
      ]
    },

    /* ------------------ 4. Triveni Ghat ------------------ */
    {
      name: "Triveni Ghat",
      img: "/TriveniGhatSomnath.webp",
      rating: "4.6 / 5",
      timings: "All Day (Best: Sunrise & Sunset)",
      season: "October – February",
      entry: "Free Entry",

      desc: [
        "Triveni Ghat is the holy confluence of three rivers — Hiran, Kapila, and Saraswati.",
        "It is believed that taking a dip here cleanses sins and purifies the soul.",
        "The peaceful ambience attracts devotees throughout the year.",
        "Morning and evening aarti at the ghat is deeply spiritual and mesmerizing.",
        "The calm water and cool breeze make it perfect for meditation.",
        "Pilgrims often visit the ghat before going to Somnath Temple.",
        "The surrounding area has small temples and spiritual spots.",
        "Photographers love capturing the serene river during sunrise.",
        "The ghat is maintained well with clean walkways and sitting areas.",
        "An important spiritual location in Somnath tourism.",
        "A must-visit for devotees looking for peace and divine blessings.",
        "The flowing water creates a soothing atmosphere ideal for reflection."
      ]
    }
  ];

  return (
    <DestinationCity
      cityName="Somnath"
      places={places}
    //   heroImg="/somnath/hero.webp"
    />
  );
}
