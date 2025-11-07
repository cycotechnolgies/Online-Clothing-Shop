require("dotenv").config();
const express = require("express"); 
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const cartRoute = require('./routes/cartRoute');
const orderRoutes = require("./routes/orderRoutes");


//express app variable
const app = express();

//use CORS middleware
app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));

//middleware to parse JSON
app.use(express.json());

app.use((req, res, next) => {
    console.log("%s %s", req.path, req.method);
    next();
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use('/api/cart', cartRoute);
app.use("/api/orders", orderRoutes);

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log("Connected to DB & Listening on port", process.env.PORT);
    });
}).catch((error) => {
    console.log(error);
});