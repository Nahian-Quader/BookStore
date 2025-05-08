const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// Debug: Log when the route file is loaded
console.log('Check-subscription route file loaded');

// Route to check subscription
router.post('/check-subscription', async (req, res) => {
  const { email } = req.body;

  // Debug: Log the received email
  console.log('Received email for subscription check:', email);

  try {
    const subscription = await Subscription.findOne({
      userId: { $regex: new RegExp(`^${email}$`, "i") }, // Case-insensitive match
    });

    if (!subscription) {
      console.log('No subscription found for email:', email);
      return res.status(404).json({ message: 'No active subscription found' });
    }

    // Debug: Log the found subscription
    console.log('Subscription found:', subscription);
    res.status(200).json({ message: 'Subscription is active', subscription });

  } catch (error) {
    console.error('Error checking subscription:', error);
    res.status(500).json({ message: 'Error checking subscription' });
  }
});

module.exports = router;
