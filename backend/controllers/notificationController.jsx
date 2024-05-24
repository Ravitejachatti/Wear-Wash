const Booking = require('../models/Booking.js');

exports.sendNotification = async (req, res) => {
  const { bookingId } = req.body;
  try {
    const booking = await Booking.findById(bookingId).populate('machine');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    // Assuming you have a function to send notifications to the machine
    const notificationResponse = await sendNotificationToMachine(booking.machine.qrCode, booking.slot);
    if (notificationResponse.success) {
      booking.status = 'confirmed';
      await booking.save();
      res.json({ message: 'Notification sent successfully', booking });
    } else {
      res.status(400).json({ message: 'Failed to send notification', notificationResponse });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification', error });
  }
};

// Dummy function to simulate notification to the machine
const sendNotificationToMachine = async (qrCode, slot) => {
  // Implement actual notification logic here
  return { success: true };
};
