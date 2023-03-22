require("dotenv").config();
const express = require('express');
const userRoutes = require('./routes/user.routes');
const upload = require("./utils/multer");
const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to the Pet Store");
});


app.use("/api", userRoutes);

//404
app.use((req,res,next) => {
    const error = new error("Not Found" );
    error.status = 404;
    next(error);
});

// Error handler
app.use((error, req, res, next) =>{
    res.json({
        error: {
            message: error.message
        }
    });
});




module.exports = app;