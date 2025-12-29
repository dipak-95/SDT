import DestinationCity from "../component/DestinationCity";

export default function JunagadhCity() {
  const places = [

    /* ------------------ 1. Bhavnath Taleti ------------------ */
    {
      name: "Bhavnath Taleti",
      img: "/BhavnathTaleti.webp",
      rating: "4.8 / 5",
      timings: "5:00 AM – 9:00 PM",
      season: "October – February",
      entry: "Free Entry",

      desc: [
        "Bhavnath Taleti is the sacred foothill of Mount Girnar and a starting point for the pilgrimage.",
        "It is famous for the Bhavnath Mahadev Temple dedicated to Lord Shiva.",
        "Thousands of devotees gather here during the Bhavnath Mela and Maha Shivratri.",
        "The atmosphere is spiritually vibrant with chants and temple bells.",
        "Surrounded by nature, the place offers a peaceful environment for meditation.",
        "Visitors can enjoy local stalls offering food, religious items, and souvenirs.",
        "The view of Girnar from Taleti adds a majestic background.",
        "This place marks the beginning of the Girnar steps leading to various peaks.",
        "Many sadhus and spiritual monks are seen during festive periods.",
        "The area is clean, well-maintained, and easily reachable by road.",
        "Ideal for families seeking blessings and peaceful exploration.",
        "A spiritually uplifting spot in the heart of Junagadh."
      ]
    },

    /* ------------------ 2. Damodar Kund ------------------ */
    {
      name: "Damodar Kund",
      img: "/DamodarKund.webp",
      rating: "4.7 / 5",
      timings: "6:00 AM – 7:00 PM",
      season: "July – February",
      entry: "Free Entry",

      desc: [
        "Damodar Kund is a sacred lake located at the base of Mount Girnar.",
        "It is believed that taking a dip here washes away sins and brings spiritual purity.",
        "The place holds immense religious value in Hindu traditions.",
        "Surrounded by scenic mountains, the peaceful vibes attract pilgrims throughout the year.",
        "Many rituals and ceremonies are performed here, especially during festive seasons.",
        "The water is clean and the walkway around the kund is well maintained.",
        "Nearby temples add to the spiritual significance of the area.",
        "It is an important stop for Girnar pilgrims before their climb.",
        "The atmosphere is calm, serene, and perfect for spiritual reflection.",
        "Visitors enjoy capturing the natural beauty of the surroundings.",
        "Easily accessible by road with good parking space.",
        "A must-visit sacred place in Junagadh."
      ]
    },

    /* ------------------ 3. Uparkot Fort ------------------ */
    {
      name: "Uparkot Fort",
      img: "/Uparkotfort.webp",
      rating: "4.6 / 5",
      timings: "8:00 AM – 6:00 PM",
      season: "October – March",
      entry: "₹30 (Indians), ₹100 (Foreigners)",

      desc: [
        "Uparkot Fort is a historical fort built over 2300 years ago by Chandragupta Maurya.",
        "It stands high above the city, offering panoramic views of Junagadh.",
        "The fort includes ancient structures, caves, cannons, stepwells, and gateways.",
        "A major attraction is the 'Neelam' and 'Devi' cannons placed inside the fort.",
        "The fort walls and architecture reflect ancient defense techniques.",
        "Visitors enjoy exploring the deep stepwells with intricate rock carvings.",
        "The Buddhist caves inside the fort add archaeological importance.",
        "The fort remains cool even in summer due to its stone construction.",
        "Ideal spot for history lovers, photographers, and explorers.",
        "The area is large and requires walking, but is worth every moment.",
        "A symbol of Junagadh's rich cultural heritage.",
        "One of the best historical sites in Gujarat."
      ]
    },

    /* ------------------ 4. Ashoka Edicts ------------------ */
    {
      name: "Ashoka’s Rock Edicts",
      img: "/Ashokalekh.webp",
      rating: "4.5 / 5",
      timings: "9:00 AM – 6:00 PM",
      season: "October – March",
      entry: "₹25",

      desc: [
        "The Ashoka Rock Edicts are inscribed messages carved by Emperor Ashoka around 250 BCE.",
        "These inscriptions communicate values of non-violence, morality, and peace.",
        "The rock edicts are protected under the Archaeological Survey of India.",
        "A shed structure protects the stones from weather damage.",
        "History lovers admire the ancient Brahmi script engraved on the rocks.",
        "The site reflects the spread of Buddhism during Ashoka’s reign.",
        "Informational boards help visitors understand the historical context.",
        "The peaceful environment makes it a pleasant learning experience.",
        "The place is easily accessible from the main city.",
        "A remarkable evidence of India’s ancient governance system.",
        "Visitors often include this in their Uparkot Fort circuit.",
        "A must-visit for students, researchers, and explorers."
      ]
    },

    /* ------------------ 5. Buddhist Caves ------------------ */
    {
      name: "Buddhist Caves",
      img: "/Buddhistcave.webp",
      rating: "4.4 / 5",
      timings: "9:00 AM – 6:00 PM",
      season: "July – February",
      entry: "₹20",

      desc: [
        "The Buddhist Caves of Junagadh are rock-cut structures dating back to the 3rd–4th century BCE.",
        "These caves are examples of ancient monastic architecture used by Buddhist monks.",
        "Khapra Kodia caves are known for their unique water-management channels.",
        "Baba Pyare caves showcase multiple meditation chambers carved in stone.",
        "The caves reflect early signs of Buddhist settlement in the region.",
        "Historians admire the design and carving techniques used by ancient craftsmen.",
        "The site offers a peaceful environment for learning and exploration.",
        "Some chambers remain intact and display impressive stone patterns.",
        "Visitors often explore these caves along with Uparkot Fort.",
        "Ideal for photography and archaeology enthusiasts.",
        "One of the best preserved Buddhist cave complexes in Gujarat.",
        "A hidden archaeological treasure of Junagadh."
      ]
    },
    /* ------------------ ⭐ 6. Mahabat Maqbara ------------------ */
    {
      name: "Mahabat Maqbara",
      img: "/Mahabatmaqbara.webp",
      rating: "4.7 / 5",
      timings: "10:00 AM – 6:00 PM",
      season: "October – February",
      entry: "Free Entry",
      desc: [
        "Mahabat Maqbara is one of the most beautiful Indo-Islamic architectural marvels in India.",
        "Located in the heart of Junagadh, it is known for its stunning minarets and intricate carvings.",
        "The structure features a blend of Gothic, Islamic, and European styles.",
        "Its spiral staircases wrapped around minarets are world-famous.",
        "Built in the late 19th century, the monument served as a mausoleum.",
        "The exterior façade is decorated with detailed stonework and jali windows.",
        "A popular attraction for photographers due to its unique symmetry.",
        "Tourists admire the craftsmanship and heritage value of the architecture.",
        "The surrounding garden area offers peaceful seating spots.",
        "It is easily accessible from major parts of Junagadh.",
        "Visitors often pair this visit with Uparkot Fort and the Edicts of Ashoka.",
        "One of the most iconic landmarks representing Junagadh’s royal history."
      ]
    },
  ];

  
  

  return (
    <DestinationCity
      cityName="Junagadh"
      places={places}
    //   heroImg="/junagadh/hero.webp"
    />
  );
}
