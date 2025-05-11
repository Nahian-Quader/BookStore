const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const moment = require('moment');

// Updated subscription handler
router.post('/subscribe', async (req, res) => {
  const { email, subscriptionPlan } = req.body;

  try {
    // Check for existing subscription
    const existingSub = await Subscription.findOne({ userId: email });
    
    if (existingSub) {
      // Update existing subscription
      existingSub.subscriptionPlan = subscriptionPlan;
      existingSub.startDate = new Date();
      existingSub.endDate = moment().add(2, 'minutes').toDate(); 
      existingSub.isActive = true;
      await existingSub.save();
      return res.status(200).json({ message: "Subscription updated", subscription: existingSub });
    }

    // Create new subscription
    const newSubscription = new Subscription({
      userId: email,
      subscriptionPlan,
      startDate: new Date(),
      endDate: moment().add(2, 'minutes').toDate(), // Changed here
      isActive: true
    });

    await newSubscription.save();
    res.status(201).json({ message: "Subscription successful", subscription: newSubscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Subscription error" });
  }
});

// Add subscription check endpoint
router.get('/status/:email', async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.params.email });
    
    if (!subscription) {
      return res.status(404).json({ message: "No subscription found" });
    }

    // Check if subscription is still active
    // const isActive = subscription.endDate > new Date();
    // Force refresh the isActive status
    const isCurrentlyActive = moment().isBefore(subscription.endDate);
    if (subscription.isActive !== isCurrentlyActive) {
      subscription.isActive = isCurrentlyActive;
      await subscription.save();
    }
    
    res.json({
      plan: subscription.subscriptionPlan,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      isActive: isCurrentlyActive,
      daysRemaining: Math.ceil((subscription.endDate - new Date()) / (1000 * 60 * 60 * 24))
    });
  } catch (error) {
    res.status(500).json({ message: "Error checking subscription" });
  }
});

module.exports = router;

