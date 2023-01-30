require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/router/router")
const PORT = process.env.PORT ?? 5000

const app = express()
const dbUrl = process.env.MONGO_URI;

app.use(express.json())
app.use("/", router);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

const start = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()


