import DestinationCity from "../component/DestinationCity";

export default function RajkotCity() {

//   const heroImg = "/rajkothero.webp";

  const places = [
    {
      name: "Watson Museum",
      img: "/watsonmesuam.webp",
      rating: 4.7,
      timings: "9:00 AM – 6:00 PM",
      season: "All Year",
      entry: "₹20 – ₹50 per person",
      desc: [
        "Watson Museum is one of the oldest and most prestigious museums in Gujarat.",
        "It showcases historical artifacts, sculptures, coins, and paintings from various eras.",
        "The museum highlights the rich heritage and royal history of the Saurashtra region.",
        "Visitors can explore exhibits related to Indus Valley Civilization as well.",
        "The building architecture itself reflects European influence from the colonial era.",
        "Rajkot's royal family collections are preserved with great care here.",
        "Tourists enjoy the peaceful environment and educational atmosphere.",
        "Many school and college groups visit frequently for historical learning.",
        "The textile and embroidery section displays vibrant traditional craftwork.",
        "You can also find old maps, manuscripts, and royal portraits.",
        "The museum promotes rich culture and heritage of Rajkot and Gujarat.",
        "Photography inside is limited as per museum rules.",
        "Guides are available to give deeper insights into the artifacts.",
        "A must-visit for history lovers and culture seekers.",
        "The museum provides a calm experience away from city rush."
      ]
    },

    {
      name: "Kaba Gandhi No Delo",
      img: "/Kabagandhinodelo.webp",
      rating: 4.8,
      timings: "9:00 AM – 6:00 PM",
      season: "All Year",
      entry: "Free Entry",
      desc: [
        "Kaba Gandhi No Delo is the childhood home of Mahatma Gandhi.",
        "The heritage house is now converted into a museum showcasing Gandhiji’s early life.",
        "The traditional Saurashtra style architecture makes the site unique.",
        "Visitors can see personal belongings, photographs, and handwritten letters.",
        "The spinning wheel (charkha) display is an important highlight.",
        "A small library with Gandhian literature is open for public reading.",
        "Cultural programs and handicraft events are often held here.",
        "The peaceful atmosphere gives a glimpse of Gandhiji's simplicity.",
        "Local women also run sewing and craft training classes inside the campus.",
        "Visitors can learn about Gandhiji’s principles of truth and non-violence.",
        "The heritage site is well-preserved and organized beautifully.",
        "Great place for students and researchers to understand his early life.",
        "The museum staff provides helpful guidance to visitors.",
        "Photography is allowed in several sections.",
        "This is one of Rajkot’s most important cultural landmarks."
      ]
    },

    {
      name: "Atal Sarovar",
      img: "/AtalSarovar.webp",
      rating: 4.6,
      timings: "5:30 AM – 9:00 PM",
      season: "Oct – March",
      entry: "Free Entry",
      desc: [
        "Atal Sarovar is a beautiful lake and recreational spot in Rajkot.",
        "It is popular among joggers, walkers, and families for relaxation.",
        "The lake area is well-maintained with greenery and clean pathways.",
        "Evening lighting enhances the beauty of the lake.",
        "People come here for peaceful morning walks and fresh air.",
        "Several benches and seating areas make it a comfortable hangout spot.",
        "Migratory birds can be seen during winter season.",
        "The lake offers amazing sunset views.",
        "Local food stalls nearby serve tea, snacks, and street food.",
        "A family-friendly place suitable for adults, kids, and elders.",
        "Cycling tracks around the lake are also popular.",
        "The calm environment is perfect for meditation and yoga.",
        "Photography lovers enjoy capturing reflections on the water.",
        "It is a great escape from the busy city life.",
        "Atal Sarovar is one of Rajkot’s best leisure destinations."
      ]
    },

    {
      name: "ISKCON Temple Rajkot",
      img: "/Iscontemple.webp",
      rating: 4.9,
      timings: "4:30 AM – 9:00 PM",
      season: "All Year",
      entry: "Free Entry",
      desc: [
        "ISKCON Rajkot is a stunning spiritual temple dedicated to Lord Krishna.",
        "The temple architecture is beautiful with white marble carvings.",
        "Devotees experience peace through bhajans and chanting sessions.",
        "The temple conducts daily aarti and spiritual programs.",
        "The garden area and clean surroundings enhance its beauty.",
        "Visitors enjoy peaceful meditation inside the temple hall.",
        "Prasadam distribution happens regularly for devotees.",
        "The temple is especially crowded during Janmashtami festival.",
        "Gift shop inside sells spiritual books and souvenirs.",
        "The temple’s environment feels divine and uplifting.",
        "Many tourists visit for architecture and peaceful atmosphere.",
        "The temple maintains high cleanliness and discipline.",
        "Photography is allowed only in selected areas.",
        "ISKCON Rajkot is a perfect blend of devotion and beauty.",
        "A must-visit place for spiritual travelers."
      ]
    },

    {
      name: "Ramnath Mahadev Temple",
      img: "/ramnathmahadev.webp",
      rating: 4.7,
      timings: "6:00 AM – 9:00 PM",
      season: "All Year",
      entry: "Free Entry",
      desc: [
        "Ramnath Mahadev is a historic Shiva temple in Rajkot.",
        "The temple ambiance is peaceful and spiritually uplifting.",
        "Devotees frequently visit during festivals like Mahashivratri.",
        "The temple architecture reflects traditional Hindu craftsmanship.",
        "Evening aarti is a major attraction for visitors.",
        "The surrounding area is clean and maintained well.",
        "The temple complex also includes smaller shrines.",
        "Meditation inside the temple hall feels deeply calming.",
        "Many locals visit daily for offering prayers.",
        "The temple is surrounded by greenery and open spaces.",
        "Photography is allowed outside main sanctum.",
        "A holy water pond near the temple adds to its beauty.",
        "Visitors enjoy the peaceful and divine environment.",
        "Good place for families seeking spiritual time.",
        "It remains one of Rajkot’s important Shiva temples."
      ]
    }
  ];

  return <DestinationCity cityName="Rajkot" places={places} />;
}
