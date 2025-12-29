import DestinationCity from "../component/DestinationCity";

export default function Vadodara() {
  const places = [
    {
      name: "Statue of Unity",
      img: "/Statueofunity.webp",

      rating: "4.8 / 5",
      timings: "8:00 AM – 6:00 PM",
      season: "October – March",
      entry: "₹150 – ₹380 (depending on package)",

      desc: [
        "The Statue of Unity is the world's tallest statue dedicated to Sardar Vallabhbhai Patel.",
        "Standing at a height of 182 meters, it offers panoramic views of the Narmada River and surrounding hills.",
        "The site includes a museum showcasing Patel’s life, a gallery, and a viewing deck.",
        "The Unity Glow Garden and Jungle Safari nearby add to the complete tourism experience.",
        "The construction of the statue took 3.5 years and involved 3,000 workers.",
        "It is one of India's most visited tourist attractions, drawing lakhs of tourists each month.",
        "There are shuttle buses and electric vehicles to help visitors explore the area.",
        "The statue is surrounded by beautiful landscaped gardens.",
        "The viewing gallery is located at 153 meters inside the statue.",
        "Audio guides are available for a more informative experience.",
        "River rafting is also available in the nearby Narmada river during the season.",
        "Photography is allowed at most points around the complex.",
        "The food court serves multiple regional cuisines.",
        "Wheelchair accessibility is provided throughout the main pathways.",
        "A beautiful laser show happens every evening (except Monday)."
      ]
    },

    {
      name: "Statue of Unity Light Show",
      img: "/statuelightshow.webp",

      rating: "4.7 / 5",
      timings: "7:00 PM – 7:30 PM (Daily except Monday)",
      season: "All Year",
      entry: "Included with Statue of Unity ticket",

      desc: [
        "The Statue of Unity light show is a breathtaking 30-minute laser projection show.",
        "It narrates Sardar Patel’s contribution to India’s unity and development.",
        "High-quality sound and laser beams illuminate the statue in vibrant colors.",
        "Thousands of visitors attend this show every evening.",
        "The light show can be viewed from multiple points around the complex.",
        "The narration is available in multiple languages for better understanding.",
        "The visuals highlight India’s freedom struggle and national integration.",
        "Special holiday animations are shown during festivals.",
        "Heavy footfall on weekends—arriving early is recommended.",
        "Photography and videography are allowed.",
        "The show uses state-of-the-art laser mapping technology.",
        "The seating area is large but fills up fast.",
        "Children especially enjoy the dramatic animations.",
        "A perfect ending to a full-day SOU trip.",
        "The surrounding mountains glow beautifully during the show."
      ]
    },

    {
      name: "Narmada Aarti",
      img: "/narmadaAarti.webp",

      rating: "4.7 / 5",
      timings: "7:00 PM – 7:20 PM",
      season: "October – February",
      entry: "Free",

      desc: [
        "Narmada Aarti is a peaceful evening ritual performed by priests on the riverbank.",
        "The atmosphere becomes sacred with chanting and traditional instruments.",
        "Hundreds of devotees gather daily for blessings and spiritual calm.",
        "The golden reflection of diyas on the Narmada River is mesmerizing.",
        "Aarti takes place at multiple ghats near the Statue of Unity region.",
        "Visitors can participate in offering diyas and flowers.",
        "Photography is allowed but flash should be avoided.",
        "Security arrangements are well managed.",
        "The chants and dhol reverberate beautifully around the river.",
        "It is a refreshing experience after a day-long visit to tourist spots.",
        "Shops nearby sell prasad and souvenirs.",
        "The ambience becomes divine during winter evenings.",
        "People often sit quietly after the aarti to meditate.",
        "It is a must-experience ritual for spiritual seekers.",
        "Sitting near the river during aarti gives a peaceful, soul-stirring experience."
      ]
    }
  ];

  return <DestinationCity cityName="Vadodara" places={places} heroImg="/heroImg.webp" />;
}
