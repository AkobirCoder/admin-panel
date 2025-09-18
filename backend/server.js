const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Auth route ulash
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// MongoDB ulanishi
mongoose.connect("mongodb://127.0.0.1:27017/adminpanel")
  .then(() => console.log("MongoDB ulandi"))
  .catch(err => console.error(err));

// Serverni ishga tushirish
const PORT = 7000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti`));