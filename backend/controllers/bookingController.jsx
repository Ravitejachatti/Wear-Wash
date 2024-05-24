// const Booking = require('../models/Booking.js');
const Machine = require('../models/Machine.jsx');
const Booking= require("../models/Booking.js")





exports.bookSlot =asycnhandler(async (req, res) => {
  const { qrCode, date, timeSlot } = req.body; // Use qrCode instead of machineId
  console.log(req.user.id, qrCode, date, timeSlot);

  try {
    // Find the machine by its QR code
    const machine = await Machine.findOne({ qrCode });
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }

    // Create the booking using the machine's ObjectId
    const newBooking = new Booking({
      user: req.user.id, // Ensure the user ID is coming from the authenticated user
      machine: machine._id, // Use the machine's ObjectId
      date: new Date(date), // Parse the date correctly
      timeSlot
    });
    await newBooking.save();
    console.log(newBooking);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});


exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('machine');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};
