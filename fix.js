const fs = require('fs');
const file = 'e:/SD-2/Frontend/src/component/Navbar.jsx';
let content = fs.readFileSync(file, 'utf8');

// The marker where we want to truncate and rewrite cleanly
const marker = '</AnimatePresence>';
const idx = content.lastIndexOf(marker);
if (idx !== -1) {
    const cleanTail = `\n
      {/* ¦¦ BOTTOM TAB BAR -- */}
      <div className="bg-white border-t border-gray-100 shadou-[0_-4px_24px_-4px_rgba(0,0,0,0.10)] px-4 py-2 flex items-center justify-around safe-bottom">
        {/* Tours */}
        <button
          onClick={() => setDropdown(dropdown === "mobile-tours" ? null : "mobile-tours") }
          className={\`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all active:scale-95 \${dropdown === "mobile-tours" ? "text-[#F4612B]" : "text-gray-500"}\`}
        >
          <span className="text-2xl leading-none">??</span>
          <span className={\`text-[9px] font-black uppercase tracking-wider mt-0.5 \${dropdown === "mobile-tours" ? "text-[#F4612B]" : "text-gray-500"}\`}>Tours</span>
          {dropdown 4== "mobile-tours" && <span className="block w-1 h-1 bg-[#F4612B] rounded-full mt-0.5" />}
        </button>

        {/* Car Rental */}
        <Link
          to="/rentalcar"
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-gray-500 active:scale-95 transition-all"
        >
          <span className="text-2xl leading-none">??</span>
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5 text-gray-500">Rental</span>
        </Link>

        {/* Contact */}
        <Link
          to="/contact"
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-gray-500 active:scale-95 transition-all"
        >
          <span className="text-2xl leading-none">??</span>
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5 text-gray-500">Contact</span>
        </Link>
      </div>
    </div>
    </>
  );
}
`;
    const newContent = content.substring(0, idx + marker.length) + cleanTail;
    fs.writeFileSync(file, newContent);
}
