const express = require('express');
const { bookSlot, getBookings } = require('../controllers/bookingController.jsx');
const validateToken = require('../middleware/validateTokenHandler.js');
const router = express.Router();



router.use(validateToken);


router.post('/', bookSlot);
router.get('/', getBookings);

module.exports = router;
