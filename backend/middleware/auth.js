const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace("Bearer ", "")
        || req.cookies.token
        || req.body.token;

    if (!token) {
        return res.status(403).send("Sign in required")
    }

    const user = jwt.verify(token, SECRET_KEY)
    req.user = user

    next()
}

module.exports = auth