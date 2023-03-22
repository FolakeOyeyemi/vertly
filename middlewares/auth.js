const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }


        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                error: "Please authenticate",
            });
        }

        req.user = decoded;
        next(); // Added the next() function call to proceed to the next middleware
} catch (err) { // Added catch block to handle errors
    return res.status(401).json({
        error: "Please authenticate",
    });
    }
}


module.exports = isAuthenticated;