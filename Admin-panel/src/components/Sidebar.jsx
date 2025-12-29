// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   ClipboardList,
//   Map,
//   PlusSquare,
//   Hotel,
//   X,
//   CarTaxiFront,
//   MessageSquare,
//   Bell
// } from "lucide-react";

// const Sidebar = ({ open, setOpen }) => {
//   return (
//     <div
//       className={`
//         fixed md:static z-40
//         h-screen w-64
//         bg-gray-900 text-white
//         transform transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//       `}
//     >
//       {/* TOP SECTION */}
//       <div className="flex items-center justify-between p-4">
//         <h2 className="text-xl font-bold text-[#f4612b]">
//           Admin Panel
//         </h2>

//         {/* ❌ CLOSE ICON (MOBILE ONLY) */}
//         <button
//           className="md:hidden"
//           onClick={() => setOpen(false)}
//         >
//           <X className="text-white" />
//         </button>
//       </div>

//       {/* MENU */}
//       <nav className="flex flex-col gap-1 px-3">
//         <Menu link="/admin/dashboard" icon={<LayoutDashboard />} text="Dashboard" setOpen={setOpen} />
//         <Menu link="/admin/bookings" icon={<ClipboardList />} text="TourBooking" setOpen={setOpen} />
//         <Menu link="/admin/grouptours" icon={<Map />} text="GroupTours" setOpen={setOpen} />
//         <Menu link="/admin/individualtours" icon={<PlusSquare />} text="IndividualTours" setOpen={setOpen} />
//         <Menu link="/admin/hotel" icon={<Hotel />} text="Hotels" setOpen={setOpen} />
//         <Menu link="/admin/hotel-booking" icon={<ClipboardList />} text="HotelBooking" setOpen={setOpen} />
//         <Menu link="/admin/ContactEnquiry" icon={<MessageSquare />} text="ContactEnquiry" setOpen={setOpen} />
//         <Menu link="/admin/QuickEnquiry" icon={<Bell />} text="QuickEnquiry" setOpen={setOpen} />
        
//         <Menu
//   link="/admin/car-bookings"
//   icon={<CarTaxiFront />}
//   text="Car Rental"
//   setOpen={setOpen}
// />
//       </nav>
//     </div>
//   );
// };

// const Menu = ({ link, icon, text, setOpen }) => (
//   <NavLink
//     to={link}
//     onClick={() => setOpen(false)} // ✅ auto-close on click (mobile)
//     className={({ isActive }) =>
//       `flex items-center gap-3 p-3 rounded-lg
//        transition-all duration-200
//        hover:bg-[#f4612b]
//        ${isActive ? "bg-[#f4612b]" : "text-gray-300"}`
//     }
//   >
//     {icon}
//     <span>{text}</span>
//   </NavLink>
// );

// export default Sidebar;
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Map,
  PlusSquare,
  Hotel,
  X,
  CarTaxiFront,
  MessageSquare,
  Bell
} from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
  return (
    <div
      className={`
        fixed md:sticky top-0
        z-40 h-screen w-64
        bg-gray-900 text-white
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-[#f4612b]">
          Admin Panel
        </h2>

        {/* CLOSE ICON (MOBILE ONLY) */}
        <button
          className="md:hidden"
          onClick={() => setOpen(false)}
        >
          <X className="text-white" />
        </button>
      </div>

      {/* ===== MENU ===== */}
      <nav className="flex flex-col gap-1 px-3 mt-4">
        <Menu link="/admin/dashboard" icon={<LayoutDashboard />} text="Dashboard" setOpen={setOpen} />
        <Menu link="/admin/bookings" icon={<ClipboardList />} text="Tour Booking" setOpen={setOpen} />
        <Menu link="/admin/grouptours" icon={<Map />} text="Group Tours" setOpen={setOpen} />
        <Menu link="/admin/individualtours" icon={<PlusSquare />} text="Individual Tours" setOpen={setOpen} />
        <Menu link="/admin/hotel" icon={<Hotel />} text="Hotels" setOpen={setOpen} />
        <Menu link="/admin/hotel-booking" icon={<ClipboardList />} text="Hotel Booking" setOpen={setOpen} />
        <Menu link="/admin/ContactEnquiry" icon={<MessageSquare />} text="Contact Enquiry" setOpen={setOpen} />
        <Menu link="/admin/QuickEnquiry" icon={<Bell />} text="Quick Enquiry" setOpen={setOpen} />
        <Menu link="/admin/car-bookings" icon={<CarTaxiFront />} text="Car Rental" setOpen={setOpen} />
      </nav>
    </div>
  );
};

const Menu = ({ link, icon, text, setOpen }) => (
  <NavLink
    to={link}
    onClick={() => setOpen(false)} // mobile auto-close
    className={({ isActive }) =>
      `
        flex items-center gap-3 p-3 rounded-lg
        transition-all duration-200
        hover:bg-[#f4612b]
        ${isActive ? "bg-[#f4612b] text-white" : "text-gray-300"}
      `
    }
  >
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </NavLink>
);

export default Sidebar;
