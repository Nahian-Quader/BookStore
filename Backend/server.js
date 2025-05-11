require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const subscriptionRoutes = require('./routes/subscription');
const checkSubscriptionRoutes = require('./routes/check-subscription');
const bookmarkRoutes = require('./routes/bookmark');
const session = require('express-session'); // NEW: Added session support
const adminRoutes = require('./routes/admin'); // NEW: Added admin routes



const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'your-strong-secret-key', // Use 32+ character string
  resave: false,
  saveUninitialized: false, // Changed from true
  cookie: { 
    secure: false,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/subscription-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api', adminRoutes); 
app.use('/api', subscriptionRoutes);
app.use('/api', checkSubscriptionRoutes);
app.use('/api/bookmarks', bookmarkRoutes); 
// NEW: Added admin routes

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
