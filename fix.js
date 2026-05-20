const fs = require('fs');
const file = 'e:/SD-2/Frontend/src/component/Navbar.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/Tours â ?“/g, "Tours ?");
content = content.replace(/Destinations â ?“/g, "Destinations ?");
content = content.replace(/Activities â ?“/g, "Activities ?");

content = content.replace(
  /import \{ FiPhone, FiSearch, FiMenu, FiX \} from "react-icons\/fi";/,
  'import { FiPhone, FiSearch, FiMenu, FiX, FiHome, FiMap, FiTruck } from "react-icons/fi";'
);

const marker = '</AnimatePresence>';
const idx = content.lastIndexOf(marker);
if (idx !== -1) {
    const cleanTail = `\n
      {/* -- BOTTOM TAB BAR -- */}
      <div className="bg-white border-t border-gray-100 shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.10)] px-2 py-2 flex items-center justify-between safe-bottom">
        {/* Home */}
        <Link
          to="/"
          onClick={() => setDropdown(null)}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-gray-500 active:scale-95 transition-all flex-1"
        >
          <FiHome className="text-xl" />
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5 text-gray-500">Home</span>
        </Link>

        {/* Tours */}
        <button
          onClick={() => setDropdown(dropdown === "mobile-tours" ? null : "mobile-tours")}
          className={\`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all active:scale-95 flex-1 \${dropdown === "mobile-tours" ? "text-[#F4612B]" : "text-gray-500"}\`}
        >
          <FiMap className="text-xl" />
          <span className={\`text-[9px] font-black uppercase tracking-wider mt-0.5 \${dropdown === "mobile-tours" ? "text-[#F4612B]" : "text-gray-500"}`] >Tours</span>
          {dropdown === "mobile-tours" && <span className="block w-1 h-1 bg-[#F4612B] rounded-full mt-0.5" />}
        </button>

        {/* Car Rental */}
        <Link
          to="/rentalcar"
          onClick={() => setDropdown(null)}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-gray-500 active:scale-95 transition-all flex-1"
        >
          <FiTruck className="text-xl" />
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5 text-gray-500">Rental</span>
        </Link>

        {/* Contact */}
        <Link
          to="/contact"
          onClick={() => setDropdown(null)}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-gray-500 active:scale-95 transition-all flex-1"
        >
          <FiPhone className="text-xl" />
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5 text-gray-500">Contact</span>
        </Link>
      </div>
    </div>
    </>
  );
}
`;
    content = content.substring(0, idx + marker.length) + cleanTail;
}

fs.writeFileSync(file, content);
console.log("Fixed successfully!");
