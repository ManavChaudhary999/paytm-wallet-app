const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;

function authMiddleware (req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, jwtKey);
    req.userId = decoded.userId;
    next();  
  }
  catch (err) {
    return res.status(401).json({message: 'Unauthorized'});
  }    
} 

module.exports = {
  authMiddleware,
}