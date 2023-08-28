const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];

    if (!authorization) return res.status(401).json({ message: 'Token not found' });
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  
    next();
  } catch (e) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;
