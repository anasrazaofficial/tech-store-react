const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace("Bearer ", "")
        || req.cookies.token
        || req.body.token;

    if (!token) {
        return res.status(403).send("Sign in required");
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        req.user = user;
        console.log(user);
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).send("Invalid token");
    }
};


module.exports = auth