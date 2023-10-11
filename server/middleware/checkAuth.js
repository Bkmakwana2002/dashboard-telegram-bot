const jwt_decode = require('jwt-decode')

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {
            token = req.headers.authorization.split(" ")[1];

            const user = jwt_decode(token)
            if (user.email === process.env.email) { 
                req.user = user 
                next()
            }
            else { 
                res.status(403).send(new Error("Not authorized"));
             }

        } catch (error) {
            res.status(401).send(new Error("Not authorized, token failed"));
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
};

module.exports = { protect };