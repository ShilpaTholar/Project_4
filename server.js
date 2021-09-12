const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors())



//connect to mongoose
mongoose.connect("mongodb+srv://aditi-16:aditi2002@cluster0.nccwa.mongodb.net/ecart", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

//models
app.use(express.json());
//routes


app.listen(5000, function (req, res) {
    console.log("express server is running on 5000");
})