const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/verify/:reference", async (req, res) => {

  const reference = req.params.reference;

  try {

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const data = response.data.data;

    if (data.status === "success") {

      return res.json({
        success: true,
        amount: data.amount / 100,
        email: data.customer.email
      });

    } else {

      return res.status(400).json({
        success: false,
        message: "Payment not verified"
      });

    }

  } catch (error) {

    res.status(500).json({
      error: "Verification failed"
    });

  }

});

module.exports = router;