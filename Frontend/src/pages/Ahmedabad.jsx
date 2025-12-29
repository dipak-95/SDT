import DestinationCity from "../component/DestinationCity";

export default function Ahmedabad() {
  const places = [
    {
      name: "Adalaj Stepwell",
      img: "/AdalajStepwell.webp",
      rating: "4.7 / 5",
      timings: "8:00 AM – 6:00 PM",
      season: "November – February (Winter)",
      entry: "Free",
      desc: [
        "Adalaj Stepwell is a stunning architectural masterpiece built in 1499.",
        "It features intricate carvings showcasing Indo-Islamic architecture.",
        "The stepwell was designed to provide water and serve as a resting place for travelers.",
        "Cool air flows inside even during hot summers due to its unique structure.",
        "The five-story stepwell is supported by beautifully carved pillars.",
        "Mythological and cultural carvings adorn its walls and ceilings.",
        "It was also a social and cultural gathering spot in ancient times.",
        "The stepwell represents the engineering brilliance of ancient Gujarat.",
        "Morning light entering through the octagonal opening creates magical visuals.",
        "The site offers excellent photography opportunities for tourists.",
        "It is a calm and peaceful escape from the busy city life.",
        "Local guides are available to share historical stories.",
        "The monument is maintained by the Archaeological Survey of India.",
        "Adalaj Stepwell is a must-visit for history and architecture lovers.",
        "Best time to visit is early morning or before sunset."
      ]
    },

    {
      name: "Akshardham Temple",
      img: "/AkshardhamTemple.webp",
      rating: "4.8 / 5",
      timings: "9:30 AM – 7:30 PM",
      season: "October – March",
      entry: "Free (Water Show: ₹200 – ₹400)",
      desc: [
        "Akshardham Temple is one of the most spiritual attractions in Gujarat.",
        "Built from 6,000 tons of pink sandstone, it is a symbol of peace and devotion.",
        "The temple complex includes a grand Hindu mandir dedicated to Bhagwan Swaminarayan.",
        "The exhibition halls showcase Indian culture and spirituality.",
        "The Sat-Chit-Anand Water Show is a breathtaking nighttime laser show.",
        "Beautiful gardens surround the temple, creating a serene environment.",
        "Photography inside the temple is restricted for security and respect.",
        "It attracts thousands of visitors daily due to its beauty and spiritual atmosphere.",
        "Well-maintained pathways make it comfortable for families and seniors.",
        "Security and facilities are excellent, including food courts and shops.",
        "The architecture represents a blend of tradition and creativity.",
        "Visitors can learn about Indian heritage through interactive displays.",
        "The campus is extremely clean, peaceful, and inspiring.",
        "Morning and evening are the best times to experience the temple's beauty.",
        "A perfect place for meditation, reflection, and spiritual learning."
      ]
    },

    {
      name: "Sabarmati Ashram",
      img: "/SabarmatiAashram.webp",
      rating: "4.6 / 5",
      timings: "8:30 AM – 6:00 PM",
      season: "All Year (Pleasant weather October–February)",
      entry: "Free",
      desc: [
        "Sabarmati Ashram was the residence of Mahatma Gandhi from 1917 to 1930.",
        "It is located on the peaceful banks of the Sabarmati River.",
        "The ashram played a crucial role in India's freedom struggle.",
        "Dandi March, one of the biggest movements, was initiated from here.",
        "Visitors can explore Gandhi’s cottage (Hriday Kunj).",
        "Original letters, photographs, and personal items of Gandhi are preserved.",
        "The museum explains Gandhi’s principles of truth and non-violence.",
        "A library inside the campus contains thousands of books.",
        "The ashram is extremely clean and well-preserved for tourists.",
        "Meditation areas allow visitors to sit peacefully and reflect.",
        "Guides are available to explain historical events in detail.",
        "It is a popular place for students and history lovers.",
        "A calm and spiritual environment makes it a relaxing visit.",
        "The riverfront view behind the ashram is an added attraction.",
        "Sabarmati Ashram is a powerful reminder of India’s freedom journey."
      ]
    }
  ];

  return <DestinationCity cityName="Ahmedabad" places={places} />;
}
