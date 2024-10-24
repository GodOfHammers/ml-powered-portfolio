// pages/api/example.js
import withProtect from '../../utils/withProtect';
import { apiLimiter } from '../../utils/rateLimiter';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    // Your API logic here
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default apiLimiter(withProtect(handler));