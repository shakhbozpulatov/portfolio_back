const express = require("express");
const cors = require("cors");
const contact = require("./routes/contact");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/Portfolio")
  .then(() => {
    console.log("MongoDB ga ulanish hosil qilindi...");
  })
  .catch((err) => {
    console.log("MongoDB da ulanishda xatolik...", err);
  });
app.use(cors());
app.use(express.json());
app.use("/api/contact", contact);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port}-portni eshitishni boshladim`);
});
