import { Menu } from "lucide-react";

const Topbar = ({ setOpen }) => {
  return (
    <div className="md:hidden flex items-center p-4 bg-white shadow">
      <button onClick={() => setOpen(true)}>
        <Menu className="text-[#f4612b]" />
      </button>

      <h1 className="ml-4 font-bold text-lg text-[#f4612b]">
        Admin Panel
      </h1>
    </div>
  );
};

export default Topbar;
