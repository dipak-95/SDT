// import { Routes, Route } from "react-router-dom";
// import Navbar from "./component/Navbar";
// import Faq from "./pages/Faq";
// import Contact from "./pages/Contact";
// import Ahmedabad from "./pages/Ahmedabad";
// import Vadodara from "./pages/Vadodara";
// import Dwaraka from "./pages/Dwaraka";
// import SasanGir from "./pages/SasanGir";
// import DiuCity from "./pages/DiyCity";
// import SomnathCity from "./pages/SomanathCity";
// import JunagadhCity from "./pages/JunagadhCity";
// import KutchCity from "./pages/KutchCity";
// import RajkotCity from "./pages/RajkotCity";
// import BeachesPage from "./pages/BeachesPage";
// import RelligiousPage from "./pages/RelligiousPage";
// import HeritagePage from "./pages/HeritagePage";
// import WildlifePage from "./pages/WildlifePage";
// import FloraFaunaPage from "./pages/FloraFaunaPage";
// import ShowGlowExperiance from "./pages/ShowGlowExeperiance";
// import Memorablehjournys from "./pages/Memorablejournys";
// import FairFestival from "./pages/FairFestival";
// import ArtAndCraft from "./pages/ArtandCraft";
// import ShoppingInGujarat from "./pages/ShoppingInGujarat";
// import Footer from "./component/Footer";
// import IndividualTour from "./pages/IndividualTour";
// import GroupTour from "./pages/GroupTour";
// import Home from "./pages/Home";
// import RentalCar from "./pages/RentalCar";
// import GroupTourDetail from "./pages/GroupTourDetail";
// import IndividualDetailPage from "./pages/IndividualDetailPage";
// import BookTour from "./pages/BookTour";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import BookCar from "./pages/BookCar";
// import Hotel from "./pages/Hotel";
// import BookingHotel from "./pages/BookingHotel";
// import ScrolltoTop from "./pages/ScrolltoTop";

// export default function App() {
//   return (
//      <>
//       <ScrolltoTop />

//       <ToastContainer
//         position="bottom-right"
//         autoClose={3000}
//         newestOnTop
//         pauseOnHover
//         theme="light"
//       />

//       {/* FIXED NAVBAR */}
//       <Navbar />

//       {/* SPACER FOR FIXED NAVBAR */}
//       <div className="h-[55px] md:h-[110px]" />

//       {/* ROUTES */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/rentalcar" element={<RentalCar />} />
//         <Route path="/faq" element={<Faq />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* DESTINATIONS */}
//         <Route path="/destinations/Ahmedabad" element={<Ahmedabad />} />
//         <Route path="/destinations/vadodara" element={<Vadodara />} />
//         <Route path="/destinations/Dwarka" element={<Dwaraka />} />
//         <Route path="/destinations/Sasan" element={<SasanGir />} />
//         <Route path="/destinations/diu" element={<DiuCity />} />
//         <Route path="/destinations/Somnath" element={<SomnathCity />} />
//         <Route path="/destinations/Junagadh" element={<JunagadhCity />} />
//         <Route path="/destinations/Kutch" element={<KutchCity />} />
//         <Route path="/destinations/Rajkot" element={<RajkotCity />} />

//         {/* ACTIVITIES */}
//         <Route path="/activities/Beaches" element={<BeachesPage />} />
//         <Route path="/activities/Relligious-site" element={<RelligiousPage />} />
//         <Route path="/activities/Heritages-site" element={<HeritagePage />} />
//         <Route path="/activities/Wildlife" element={<WildlifePage />} />
//         <Route path="/activities/Flora-Fauna" element={<FloraFaunaPage />} />
//         <Route path="/activities/ShowandGlow" element={<ShowGlowExperiance />} />
//         <Route path="/activities/FairFestival" element={<FairFestival />} />
//         <Route path="/activities/ShoppinginGujarat" element={<ShoppingInGujarat />} />
//         <Route path="/activities/ArtandCraft" element={<ArtAndCraft />} />

//         {/* TOURS */}
//         <Route path="/tours/indivisual" element={<IndividualTour />} />
//         <Route path="/tours/group" element={<GroupTour />} />
//         <Route path="/group-tour/:id" element={<GroupTourDetail />} />
//         <Route path="/individual-tour/:id" element={<IndividualDetailPage />} />

//         {/* BOOKINGS */}
//         <Route path="/book-tour/:id" element={<BookTour />} />
//         <Route path="/car-book/:id" element={<BookCar />} />

//         {/* HOTELS */}
//         <Route path="/hotels" element={<Hotel />} />
//         <Route path="/hotels/:city" element={<Hotel />} />
//         <Route path="/hotels/:hotelId/book" element={<BookingHotel />} />

//         {/* OTHER */}
//         <Route path="/pastjournies" element={<Memorablehjournys />} />
//       </Routes>
  

//       {/* FOOTER */}
//       <Footer />
//     </>
//   );
// }
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import BrandLoader from "./component/BrandLoader";

import ScrolltoTop from "./pages/ScrolltoTop";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Ahmedabad from "./pages/Ahmedabad";
import Vadodara from "./pages/Vadodara";
import Dwaraka from "./pages/Dwaraka";
import SasanGir from "./pages/SasanGir";
import DiuCity from "./pages/DiyCity";
import SomnathCity from "./pages/SomanathCity";
import JunagadhCity from "./pages/JunagadhCity";
import KutchCity from "./pages/KutchCity";
import RajkotCity from "./pages/RajkotCity";
import BeachesPage from "./pages/BeachesPage";
import RelligiousPage from "./pages/RelligiousPage";
import HeritagePage from "./pages/HeritagePage";
import WildlifePage from "./pages/WildlifePage";
import FloraFaunaPage from "./pages/FloraFaunaPage";
import ShowGlowExperiance from "./pages/ShowGlowExeperiance";
import Memorablehjournys from "./pages/Memorablejournys";
import FairFestival from "./pages/FairFestival";
import ArtAndCraft from "./pages/ArtandCraft";
import ShoppingInGujarat from "./pages/ShoppingInGujarat";
import IndividualTour from "./pages/IndividualTour";
import GroupTour from "./pages/GroupTour";
import GroupTourDetail from "./pages/GroupTourDetail";
import IndividualDetailPage from "./pages/IndividualDetailPage";
import BookTour from "./pages/BookTour";
import RentalCar from "./pages/RentalCar";
import BookCar from "./pages/BookCar";
import Hotel from "./pages/Hotel";
import BookingHotel from "./pages/BookingHotel";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  /* ===== GLOBAL INITIAL LOADER ===== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300); // smooth brand reveal

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <BrandLoader />;
  }

  return (
    <>
      <ScrolltoTop />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        theme="light"
      />

      {/* NAVBAR */}
      <Navbar />

      {/* SPACER FOR FIXED NAVBAR */}
      <div className="h-[55px] md:h-[110px]" />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rentalcar" element={<RentalCar />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />

        {/* DESTINATIONS */}
        <Route path="/destinations/Ahmedabad" element={<Ahmedabad />} />
        <Route path="/destinations/vadodara" element={<Vadodara />} />
        <Route path="/destinations/Dwarka" element={<Dwaraka />} />
        <Route path="/destinations/Sasan" element={<SasanGir />} />
        <Route path="/destinations/diu" element={<DiuCity />} />
        <Route path="/destinations/Somnath" element={<SomnathCity />} />
        <Route path="/destinations/Junagadh" element={<JunagadhCity />} />
        <Route path="/destinations/Kutch" element={<KutchCity />} />
        <Route path="/destinations/Rajkot" element={<RajkotCity />} />

        {/* ACTIVITIES */}
        <Route path="/activities/Beaches" element={<BeachesPage />} />
        <Route
          path="/activities/Relligious-site"
          element={<RelligiousPage />}
        />
        <Route
          path="/activities/Heritages-site"
          element={<HeritagePage />}
        />
        <Route path="/activities/Wildlife" element={<WildlifePage />} />
        <Route path="/activities/Flora-Fauna" element={<FloraFaunaPage />} />
        <Route
          path="/activities/ShowandGlow"
          element={<ShowGlowExperiance />}
        />
        <Route path="/activities/FairFestival" element={<FairFestival />} />
        <Route
          path="/activities/ShoppinginGujarat"
          element={<ShoppingInGujarat />}
        />
        <Route path="/activities/ArtandCraft" element={<ArtAndCraft />} />

        {/* TOURS */}
        <Route path="/tours/indivisual" element={<IndividualTour />} />
        <Route path="/tours/group" element={<GroupTour />} />
        <Route path="/group-tour/:id" element={<GroupTourDetail />} />
        <Route
          path="/individual-tour/:id"
          element={<IndividualDetailPage />}
        />

        {/* BOOKINGS */}
        <Route path="/book-tour/:id" element={<BookTour />} />
        <Route path="/car-book/:id" element={<BookCar />} />

        {/* HOTELS */}
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/hotels/:city" element={<Hotel />} />
        <Route path="/hotels/:hotelId/book" element={<BookingHotel />} />

        {/* OTHER */}
        <Route path="/pastjournies" element={<Memorablehjournys />} />
      </Routes>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
