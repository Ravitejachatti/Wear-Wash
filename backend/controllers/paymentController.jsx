const Booking = require('../models/Booking.js');
const { processPayment } = require('../utils/paymentGateway.jsx');

exports.makePayment = async (req, res) => {
  const { bookingId, paymentDetails } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    const paymentResponse = await processPayment(paymentDetails);
    if (paymentResponse.success) {
      booking.paymentStatus = 'paid';
      await booking.save();
      res.json({ message: 'Payment successful', booking });
    } else {
      res.status(400).json({ message: 'Payment failed', paymentResponse });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error });
  }
};
