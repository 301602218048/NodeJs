const { v4: uuidv4 } = require("uuid");
const cashfreeService = require("../services/cashfreeService");
const Orders = require("../models/order");

const initiatePayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const email = req.user.email;
    const orderId = uuidv4();
    const amount = 100.0;

    await Orders.create({
      orderId,
      amount,
      status: "PENDING",
      userId,
    });

    const paymentSessionId = await cashfreeService.createOrder(
      orderId,
      amount,
      "INR",
      userId,
      email
    );

    res.status(201).json({ paymentSessionId, orderId });
  } catch (error) {
    console.error("Payment initiation failed:", error.message);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};

const getOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const orderStatus = await cashfreeService.getPaymentStatus(orderId);

    const order = await Orders.findOne({ where: { orderId } });
    order.status = orderStatus;
    await order.save();

    res.status(200).json({ order, orderStatus });
  } catch (error) {
    console.log("Fetching OrderStatus Failed", error.message);
    res.status(500).json({ error: "Failed to fetch order status" });
  }
};

module.exports = { initiatePayment, getOrderStatus };
