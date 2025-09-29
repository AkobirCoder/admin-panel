const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// io ni routelarga yuborish
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/auth", authRoutes);

app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/adminpanel")
  .then(() => console.log("MongoDB ulandi"))
  .catch(err => console.error(err));

server.listen(7000, () => {
  console.log("Backend 7000-portda eshitilyapti");
});
