const express = require("express");
const cors = require("cors");
const app = express();
const trustee = require("./users/index");

require("dotenv").config();
app.use(express.json());
app.use(cors());
app.listen(4000, () => console.log("SERVER RUNNING ON PORT 4000"));
app.use(trustee);
  
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://172.31.96.1:3000",   
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow only specified HTTP methods
  // allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));