import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';  // Ensure errorHandler sends JSON response

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    // Send proper JSON error response
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  // Verify JWT token
  jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden, invalid token' });
    }
    
    // Set user to request object and proceed to next middleware
    req.user = user;
    next();
  });
};
