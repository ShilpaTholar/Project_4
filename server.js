const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors())



//connect to mongoose
mongoose.connect("mongodb+srv://aditi-16:aditi2002@cluster0.nccwa.mongodb.net/ecart", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

require('./models/user')
require('./models/area')
require('./models/expense')
require('./models/order')
require('./models/product')
require('./models/review')
require('./models/wishlist')

app.use(express.json());

app.use(require('./routes/auth'))
app.use(require('./routes/cartRoute'))
app.use(require('./routes/ProductRoute'))
app.use(require('./routes/shopCreate'))
app.use(require('./routes/shopHome'))
app.use(require('./routes/userHome'))
app.use(require('./routes/wishlistRoute'))


app.listen(5000, function (req, res) {
    console.log("express server is running on 5000");
})