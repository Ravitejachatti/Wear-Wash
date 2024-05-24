require("dotenv").config();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (orderDetails) => {
  try {
    const { amount, currency, receipt, notes } = orderDetails;

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);
    return { success: true, order };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { createOrder };
