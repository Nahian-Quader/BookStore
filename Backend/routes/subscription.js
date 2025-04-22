const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription'); // Import Subscription model

// Handle subscription POST request
router.post('/subscribe', async (req, res) => {
  const { email, subscriptionPlan } = req.body;

  try {
    const newSubscription = new Subscription({
      userId: email,  // We'll use the email as the userId for simplicity
      subscriptionPlan,
    });

    await newSubscription.save();
    res.status(201).json({ message: "Subscription successful", subscription: newSubscription });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There was an error with the subscription." });
  }
});

module.exports = router;

