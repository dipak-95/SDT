const Order = require("../model/Dashboard");

module.exports.createOrder = async (req, res) => {
  try {
    console.log("📦 ORDER BODY:", req.body);

    const order = await Order.create({
      serviceType: req.body.serviceType,
      status: "confirmed",   // ✅ FORCE CONFIRMED
      amount: Number(req.body.amount),
    });

    console.log("✅ ORDER SAVED:", order);

    res.status(201).json({
      success: true,
      message: "Order stored in MongoDB",
      data: order,
    });

  } catch (error) {
    console.error("❌ ORDER SAVE ERROR:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
