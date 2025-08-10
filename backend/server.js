require("dotenv").config();
const express = require("express"); 
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require('./routes/auth');
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
    console.log(req.path, req.method);
    next();
});

//routes
app.use("/api/auth", authRoutes);

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