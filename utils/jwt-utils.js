const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
    return jwt.sign({ username: user.username,  role: user.role }, process.env.TOKEN_SECRET);
};

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

exports.authenticateJWT = authenticateJWT;
exports.generateJWT = generateJWT;