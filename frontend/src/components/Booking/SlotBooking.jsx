// import React, { useState } from 'react';
// import axios from 'axios';

// const SlotBooking = () => {
//   const [machineId, setMachineId] = useState('');
//   const [slot, setSlot] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/bookings/book', { machineId, slot });
//       console.log('Booking successful', res.data);
//     } catch (error) {
//       console.error('Error booking slot', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="slot-booking-form">
//       <div>
//         <label>Machine ID</label>
//         <input
//           type="text"
//           value={machineId}
//           onChange={(e) => setMachineId(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Slot</label>
//         <input
//           type="datetime-local"
//           value={slot}
//           onChange={(e) => setSlot(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Book Slot</button>
//     </form>
//   );
// };

// export default SlotBooking;
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingSlot = () => {
  const [machineId, setMachineId] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const timeSlots = generateTimeSlots();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/bookings', {
        machineId,
        date,
        timeSlot
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.status === 201) {
        setSuccess('Booking successful');
        setError(null);
        navigate('/');
      } else {
        throw new Error('Failed to book slot');
      }
    } catch (error) {
      setError('Error booking slot. Please try again.');
      console.error('Error booking slot', error);
      setSuccess(null);
    }
  };

  return (
    <div className="booking-slot">
      <h2 className="text-2xl font-semibold">Book a Slot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="machineId">Machine ID:</label>
          <input
            type="text"
            id="machineId"
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="timeSlot">Time Slot:</label>
          <select
            id="timeSlot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    const start = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    const end = hour + 1 < 10 ? `0${hour + 1}:00` : `${hour + 1}:00`;
    slots.push(`${start} - ${end}`);
  }
  return slots;
};

export default BookingSlot;
