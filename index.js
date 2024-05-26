require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectToDB = require("./config/dbConnection");

app.use(express.json());

// routing
app.get("/", (req, res) => res.send("Backend Menyala!"));
app.use("/auth", require("./routes/auth"));
app.use("/employee", require("./routes/employee"));

// start server
connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`listening for requests on port: ${port}`);
  });
});