const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.jsx");
const bookingRoutes = require("./routes/bookingRoutes.jsx");
const paymentRoutes = require("./routes/paymentRoutes.jsx");
const notificationRoutes = require("./routes/notificationRoutes.jsx");
const { dbConnect } = require("./config/db.jsx");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
dbConnect();

//body parser which accepts the json data from client
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);

//using middleware for errorhandling
app.use(errorHandler);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
