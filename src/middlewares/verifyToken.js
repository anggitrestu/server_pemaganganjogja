const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader && authHeader.split(' ')[1];
    if (bearerToken == null) {
      return res.sendStatus(401);
    }

    jwt.verify(bearerToken, JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          message: err.message,
        });
      }
      req.admin = decoded;
      return next();
    });
  } catch (error) {
    res.status(404);
    res.json({ errors: error.message });
  }
};
