const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/api/endpoint", (req, res) => {
  res.json({ message: "Hello from API" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
