import { Routes, Route } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import BrandLoader from "./component/BrandLoader";
import ScrolltoTop from "./pages/ScrolltoTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- LAZY LOADED PAGES ---
const Home = lazy(() => import("./pages/Home"));
const Faq = lazy(() => import("./pages/Faq"));
const Contact = lazy(() => import("./pages/Contact"));
const Ahmedabad = lazy(() => import("./pages/Ahmedabad"));
const Vadodara = lazy(() => import("./pages/Vadodara"));
const Dwaraka = lazy(() => import("./pages/Dwaraka"));
const SasanGir = lazy(() => import("./pages/SasanGir"));
const DiuCity = lazy(() => import("./pages/DiyCity"));
const SomnathCity = lazy(() => import("./pages/SomanathCity"));
const JunagadhCity = lazy(() => import("./pages/JunagadhCity"));
const KutchCity = lazy(() => import("./pages/KutchCity"));
const RajkotCity = lazy(() => import("./pages/RajkotCity"));
const BeachesPage = lazy(() => import("./pages/BeachesPage"));
const RelligiousPage = lazy(() => import("./pages/RelligiousPage"));
const HeritagePage = lazy(() => import("./pages/HeritagePage"));
const WildlifePage = lazy(() => import("./pages/WildlifePage"));
const FloraFaunaPage = lazy(() => import("./pages/FloraFaunaPage"));
const ShowGlowExperiance = lazy(() => import("./pages/ShowGlowExeperiance"));
const Memorablehjournys = lazy(() => import("./pages/Memorablejournys"));
const FairFestival = lazy(() => import("./pages/FairFestival"));
const ArtAndCraft = lazy(() => import("./pages/ArtandCraft"));
const ShoppingInGujarat = lazy(() => import("./pages/ShoppingInGujarat"));
const IndividualTour = lazy(() => import("./pages/IndividualTour"));
const GroupTour = lazy(() => import("./pages/GroupTour"));
const GroupTourDetail = lazy(() => import("./pages/GroupTourDetail"));
const IndividualDetailPage = lazy(() => import("./pages/IndividualDetailPage"));
const BookTour = lazy(() => import("./pages/BookTour"));
const RentalCar = lazy(() => import("./pages/RentalCar"));
const BookCar = lazy(() => import("./pages/BookCar"));

export default function App() {
  const [loading, setLoading] = useState(true);

  /* ===== GLOBAL INITIAL LOADER ===== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); // quick brand reveal

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
      <div className="h-[46px] md:h-[110px]" />

      {/* ROUTES — bottom padding on mobile for fixed bottom tab bar */}
      <div className="pb-20 md:pb-0">
        <Suspense fallback={<BrandLoader />}>
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

            {/* OTHER */}
            <Route path="/pastjournies" element={<Memorablehjournys />} />
          </Routes>
        </Suspense>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
