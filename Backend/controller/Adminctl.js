const jwt = require("jsonwebtoken");
module.exports.adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }
   

    // 👮 HARDCODED ADMIN CREDENTIALS (for Emergency Fix)
    const expectedEmail = "saurashtradarshantour@gmail.com";
    const expectedPassword = "Naim@123";

    if (
      email.trim().toLowerCase() !== expectedEmail ||
      password !== expectedPassword
    ) {
      console.log(`❌ Login failed for: ${email}. Source: ${req.ip}`);
      return res.status(401).json({
        message: "Invalid admin credentials"
      });
    }

    // ✅ Create token (Using .env secret with a safe fallback)
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET || "SaurashtraDarshan_Secret_Fallback",
      { expiresIn: "10d" } // Increased login session to 10 days for convenience
    );

    // ✅ Success response
    res.status(200).json({
      message: "✅ Admin login successful",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


