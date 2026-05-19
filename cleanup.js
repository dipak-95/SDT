const fs = require('fs');

const sidebarJsx = 'e:/SD-2/Admin-panel/src/components/Sidebar.jsx';
if(fs.existsSync(sidebarJsx)){
  let c = fs.readFileSync(sidebarJsx, 'utf8');
  c = c.replace('  Hotel,\n', '');
  c = c.replace('        <Menu link="/admin/hotel" icon={<Hotel />} text="Hotels" setOpen={setOpen} />\n', '');
  c = c.replace('        <Menu link="/admin/hotel-booking" icon={<ClipboardList />} text="Hotel Booking" setOpen={setOpen} />\n', '');
  fs.writeFileSync(sidebarJsx, c);
}

const indexJs = 'e:/SD-2/Backend/index.js';
if(fs.existsSync(indexJs)){
  let c = fs.readFileSync(indexJs, 'utf8');
  c = c.replace(/const hotelRoutes = require.*?;\n/g, '');
  c = c.replace(/const cityRoutes = require.*?;\n/g, '');
  c = c.replace(/const facilityRoutes = require.*?;\n/g, '');
  c = c.replace(/const hotelBookingRoutes = require.*?;\n/g, '');
  c = c.replace(/app\.use\('\/api\/hotels', hotelRoutes\);\n/g, '');
  c = c.replace(/app\.use\('\/api\/cities', cityRoutes\);\n/g, '');
  c = c.replace(/app\.use\('\/api\/facilities', facilityRoutes\);\n/g, '');
  c = c.replace(/app\.use\('\/api\/hotel-bookings', hotelBookingRoutes\);\n/g, '');
  fs.writeFileSync(indexJs, c);
}

const adminDashboardCtl = 'e:/SD-2/Backend/controller/AdminDashboardctl.js';
if(fs.existsSync(adminDashboardCtl)){
  let c = fs.readFileSync(adminDashboardCtl, 'utf8');
  c = c.replace(/const HotelBooking = require\('\.\.\/model\/HotelBooking'\);\n/g, '');
  c = c.replace(/const hotelRevenue = await HotelBooking\.aggregate\(\[\s*\{\s*\$match:\s*\{\s*status:\s*"confirmed"\s*\}\s*\},[\s\S]*?\]\);/g, 'const hotelRevenue = [{ total: 0 }];');
  c = c.replace(/const totalHotelRevenue = hotelRevenue\[0\]\?\.total \|\| 0;/g, 'const totalHotelRevenue = 0;');
  c = c.replace(/const pendingHotelCount = await HotelBooking\.countDocuments\(\{ status: "pending" \}\);/g, 'const pendingHotelCount = 0;');
  c = c.replace(/const hotelInquiryCount = await HotelBooking\.countDocuments\(\);/g, 'const hotelInquiryCount = 0;');
  fs.writeFileSync(adminDashboardCtl, c);
}
console.log("Cleanup script executed successfully!");
