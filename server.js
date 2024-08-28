require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");

//express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/user", userRoutes);
app.use("/product", productRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      // Use server.listen instead of app.listen
      console.log(
        `Connected to MongoDB and Server is listening on port: ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
