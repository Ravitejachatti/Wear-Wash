const express = require("express");
const bodyParser = require("body-parser");
const { createOrder } = require("./paymentProcessor"); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/create-order", async (req, res) => {
  const orderDetails = req.body;
  const result = await createOrder(orderDetails);

  if (result.success) {
    res.json({ success: true, order: result.order });
  } else {
    res.status(500).json({ success: false, error: result.error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
