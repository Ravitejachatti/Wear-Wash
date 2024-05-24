const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Machine',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Ensure timeSlot is in the correct format
        return /^([01]?[0-9]|2[0-3]):00 - ([01]?[0-9]|2[0-3]):00$/.test(v);
      },
      message: props => `${props.value} is not a valid time slot format!`
    }
  }
}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);
