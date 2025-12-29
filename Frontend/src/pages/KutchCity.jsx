import DestinationCity from "../component/DestinationCity";

export default function KutchCity() {

//   const heroImg = "/kutch-hero.webp";

  const places = [
    {
      name: "Rann of Kutch (White Desert)",
      img: "/Greatranofkutch.webp",
      rating: 4.9,
      timings: "Open 24 Hours",
      season: "Nov – Feb (Rann Utsav)",
      entry: "₹100 – ₹200 per person",
      desc: [
        "The Great Rann of Kutch is one of the world’s largest salt deserts.",
        "It is famous for its white landscape that glows under the moonlight.",
        "Rann Utsav is the biggest attraction with cultural shows, food stalls, and luxury tents.",
        "Camel rides, paramotoring, and cultural folk dance are popular activities.",
        "The desert stretches endlessly and gives a surreal, dream-like experience.",
        "Most tourists visit during sunrise and sunset for magical views.",
        "The border area has strict entry rules; permits are required.",
        "Temperature drops heavily at night during winter.",
        "Photography lovers find endless beauty and unique textures here.",
        "Local handicrafts and Kutchi embroidery shops attract many tourists.",
        "You can enjoy local food like bajra roti, buttermilk, and Gujarati thali.",
        "BSF checkpoints are located near the entrance.",
        "White Desert gives a peaceful escape from city life.",
        "It is one of India’s most iconic tourist places.",
        "Families, couples, and adventure lovers all enjoy this magical place."
      ]
    },

    {
      name: "Mandvi Beach",
      img: "/Mandavibeach.webp",
      rating: 4.7,
      timings: "6:00 AM – 8:00 PM",
      season: "Oct – March",
      entry: "Free Entry",
      desc: [
        "Mandvi Beach is one of the cleanest and most peaceful beaches in Gujarat.",
        "Known for its golden sand and calm waves, it is perfect for relaxation.",
        "Camel rides and horse rides are popular among tourists.",
        "The beach is ideal for sunset photography and family outings.",
        "Nearby food stalls serve corn, coconut water, and Gujarati snacks.",
        "The Mandvi Windmills add a stunning backdrop for photography.",
        "Mandvi Beach is also famous for water sports during peak season.",
        "You can also explore the luxurious Vijay Vilas Palace nearby.",
        "It is a safe and peaceful place for couples and families.",
        "Early morning views are refreshing and calm.",
        "Local fishermen can be seen working with traditional boats.",
        "It is less crowded compared to other beaches.",
        "Best suited for long walks and relaxing moments.",
        "There are many resorts near the beach for an overnight stay.",
        "Mandvi Beach offers a refreshing break from city chaos."
      ]
    },

    {
      name: "Koteshwar Mahadev Temple",
      img: "/Koteshwartemple.webp",
      rating: 4.8,
      timings: "6:00 AM – 9:00 PM",
      season: "All Year",
      entry: "Free Entry",
      desc: [
        "Koteshwar Temple is a highly revered Shiva temple located at the westernmost point of India.",
        "It offers breathtaking views of the Arabian Sea.",
        "The temple’s peaceful atmosphere attracts pilgrims and tourists.",
        "During sunset, the temple glows beautifully with golden light.",
        "The wind and waves create a calming environment.",
        "A must-visit destination for spiritual seekers.",
        "Koteshwar is associated with the Ramayana era.",
        "The sea view platform is a popular photo spot.",
        "Nearby stalls sell tea, snacks, and coconut water.",
        "The journey to Koteshwar is scenic and pleasant.",
        "Perfect for meditation and peaceful evenings.",
        "Many devotees visit during Shivratri.",
        "The temple architecture is simple yet divine.",
        "Visitors can sit on rocks and watch the waves.",
        "It gives a truly heavenly oceanfront experience."
      ]
    },

    {
      name: "Narayan Sarovar",
      img: "/narayansarovar.webp",
      rating: 4.6,
      timings: "6:00 AM – 7:00 PM",
      season: "Aug – Feb",
      entry: "Free Entry",
      desc: [
        "Narayan Sarovar is one of the five sacred lakes in Hinduism.",
        "It is known for its calm water and spiritual importance.",
        "The temple complex is peaceful and well-maintained.",
        "Devotees believe the lake was created by Lord Vishnu.",
        "The architecture includes carvings and old temple structures.",
        "Many pilgrims visit throughout the year.",
        "The surrounding desert landscape is unique and beautiful.",
        "The area shows a perfect blend of culture and spirituality.",
        "Nearby locals sell devotional items and sweets.",
        "Perfect place for meditation and peaceful prayers.",
        "The sarovar area is extremely scenic during sunset.",
        "It is a rare combination of desert and water.",
        "Visitors enjoy photography of temple reflections in the lake.",
        "A must-visit for spiritual travelers.",
        "This lake is considered highly sacred in Hindu scriptures."
      ]
    },

    {
      name: "Kalo Dungar (Black Hill)",
      img: "/kalodungar.webp",
      rating: 4.7,
      timings: "7:00 AM – 7:00 PM",
      season: "Oct – Feb",
      entry: "Free Entry",
      desc: [
        "Kalo Dungar is the highest viewpoint in the Kutch region.",
        "It offers a breathtaking panoramic view of the White Desert.",
        "A famous attraction is the ‘gravity hill’ optical illusion area.",
        "Visitors also enjoy the historic Dattatreya Temple.",
        "The hilltop wind breeze feels refreshing.",
        "Photography enthusiasts love the wide landscape shots.",
        "Road trip to Kalo Dungar is scenic and beautiful.",
        "Many tourists come here during sunset.",
        "Local shops sell tea and snacks near the parking.",
        "The Indo-Pak border can be viewed from specific points.",
        "It is a perfect place for adventure and nature lovers.",
        "Wild foxes are occasionally seen near the temple area.",
        "The area is calm and culturally rich.",
        "Tourists often visit Kalo Dungar before going to White Desert.",
        "It remains a top-rated destination for scenic views."
      ]
    }
  ];

  return <DestinationCity cityName="Kutch" places={places} />;
}
