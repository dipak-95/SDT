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
   

    // ✅ Match with FIXED admin credentials
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid admin credentials"
      });
    }

    // ✅ Create token
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
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


