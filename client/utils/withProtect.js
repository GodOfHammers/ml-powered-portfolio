import { verifyToken } from './auth';

export default function withProtect(handler) {
  return async (req, res) => {
    try {
      const token = req.cookies.token;
      
      if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Authentication error' });
    }
  };
}