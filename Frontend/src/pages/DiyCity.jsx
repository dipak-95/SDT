import DestinationCity from "../component/DestinationCity";

export default function DiuCity() {
  const places = [
    /* ---------------------- 1. Diu Fort ---------------------- */
    {
      name: "Diu Fort",
      img: "/DiuFort.webp",
      rating: "4.7 / 5",
      timings: "8:00 AM – 6:00 PM",
      season: "October – March",
      entry: "Free Entry",

      desc: [
        "Diu Fort is a majestic and historic Portuguese fort built in 1535.",
        "It is surrounded by the Arabian Sea on three sides, offering stunning coastal views.",
        "The fort features stone walls, ancient cannons, and underground cellars.",
        "Visitors enjoy walking along the long pathways and ramparts overlooking the blue ocean.",
        "The lighthouse inside the fort gives a panoramic view of Diu city.",
        "Photography lovers find this place extremely scenic, especially during sunset.",
        "The architecture displays a blend of European and Indian influence.",
        "Nearby, you can also see St. Paul’s Church and old Portuguese buildings.",
        "The fort is well-maintained, making it suitable for families and tourists.",
        "Wide open courtyards allow peaceful and relaxing walks.",
        "The sea breeze adds a refreshing feel throughout the fort premises.",
        "A highly recommended spot for history lovers and nature seekers.",
      ]
    },

    /* ---------------------- 2. Nagva Beach ---------------------- */
    {
      name: "Nagva Beach",
      img: "/NagvaBeachDiu.webp",
      rating: "4.8 / 5",
      timings: "Open 24 Hours",
      season: "October – February",
      entry: "Free Entry",

      desc: [
        "Nagva Beach is one of the cleanest and most peaceful beaches in Diu.",
        "The golden sand and turquoise waters make it perfect for relaxation.",
        "It is ideal for swimming, sunbathing, photography, and long beach walks.",
        "Nagva is known for its peaceful environment, away from commercial crowds.",
        "The beach is safe and family-friendly with a calm shoreline.",
        "Morning and evening hours are the best for breathtaking views.",
        "Horse rides and camel rides are available during peak seasons.",
        "The beach offers stunning sunset views, a favorite among tourists.",
        "Cleanliness and maintenance make this beach stand out in Gujarat region.",
        "Nearby food stalls offer snacks, coconut water, and seafood.",
        "It’s a great spot for couples, families, and group outings.",
        "Perfect destination for a quiet and relaxing vacation experience.",
      ]
    }
  ];

  return (
    <DestinationCity
      cityName="Diu"
      places={places}
    //   heroImg="/diu/hero.webp"   // ⭐ Your custom hero image
    />
  );
}
